import AsyncStorage from 'shared/utils/storage';
import throttle from 'shared/utils/throttle';

export const fetchRepos = (inputString) => fetch(`https://api.github.com/search/repositories?q=${inputString}+in:name&per_page=50`)
  .then(res => res.json());

const throttledFetchRepos = throttle(fetchRepos, 1000);

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const processRepos = ({ id, name, owner, stargazers_count, created_at }) => ({ 
  id, 
  name, 
  stargazers_count, 
  owner: owner.login, 
  created_at: formatDate(created_at)
})



export const fetchAndStoreRepos = (inputString) => {
  return (dispatch, getState) => {
    const { repos } = getState();
    dispatch({ type: 'SHOW_LOADER' });
    if (repos.cached[inputString]) {
      dispatch({ type: 'HIDE_LOADER' });
      return Promise.resolve(repos.cached[inputString]);
    }
    else if (!inputString || inputString.length < 2) {
      throttledFetchRepos.cancel();
      dispatch({ type: 'HIDE_LOADER' });
      return Promise.resolve([]);
    }
    else {
      return throttledFetchRepos(inputString)
        .then(({ items }) => {
          dispatch({ type: 'HIDE_LOADER' });
          if (!items) { return items;}
          dispatch({ type: 'ADD_CACHE', payload: { repos: items, inputString } });
          AsyncStorage.setItem('cachedRepos', JSON.stringify(getState().repos.cached));
          return items.map(processRepos);
        })
        .catch((e) => {
          dispatch({ type: 'HIDE_LOADER' });
          throw e;
        });
    }
  }
}

export const populateCacheFromLocal = () => dispatch => {
  return AsyncStorage.getItem('cachedRepos')
    .then(JSON.parse)
    .then((cachedRepos) => {
      cachedRepos && dispatch({ type: 'SET_CACHE', payload: cachedRepos });
    })
    .catch(console.log)
}

export const onLoginSuccess = (accessToken) => dispatch => {
  dispatch({type: 'LOGIN_SUCCESS', payload: accessToken});
  return fetch(`https://api.github.com/user/repos?access_token=${accessToken}&affiliation=owner&per_page=100`)
      .then(res => res.json())
      .then((res) => {
        dispatch({ type: 'REPOS_FETCHED', payload: res.map(repo => repo.id)});
      })
}