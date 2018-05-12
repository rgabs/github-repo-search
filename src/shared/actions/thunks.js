import AsyncStorage from 'shared/utils/storage';
import {debounce} from 'shared/utils/async';
import {isEmpty} from 'lodash';
import { getCachedReposForInput, processRepos } from 'shared/utils/repos'

export const fetchRepos = (inputString) => fetch(`https://api.github.com/search/repositories?q=${inputString}+in:name&per_page=50`)
  .then(res => res.json());

const debouncedFetchRepos = debounce(fetchRepos, 1000);


const addCache = (repos, inputString) => (dispatch, getState) => {
  const cachedRepos = getState().repos.cached;
  if (isEmpty(repos) || cachedRepos.searchStringsMap[inputString]) return;
  dispatch({ type: 'ADD_CACHE', payload: { repos: repos, inputString } });
  AsyncStorage.setItem('cachedRepos', JSON.stringify(cachedRepos));
}

export const fetchAndStoreRepos = (inputString) => {
  return (dispatch, getState) => {
    const { repos } = getState();
    if (repos.cached.searchStringsMap[inputString.toLowerCase()]) {
      return Promise.resolve(getCachedReposForInput(repos.cached, inputString));
    }
    else if (!inputString || inputString.length < 2) {
      return Promise.resolve([]);
    }
    else {
      dispatch({ type: 'SHOW_LOADER' });
      return debouncedFetchRepos(inputString).then(({ items, searchQuery }) => {
          dispatch({ type: 'HIDE_LOADER' });
          const processedRepos = items.map(processRepos);
          dispatch(addCache(processedRepos, searchQuery ))
          return processedRepos
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
    .catch(console.log) // log because no error handler
}

export const onLoginSuccess = (accessToken) => dispatch => {
  dispatch({type: 'LOGIN_SUCCESS', payload: accessToken});
  return fetch(`https://api.github.com/user/repos?access_token=${accessToken}&affiliation=owner&per_page=100`)
      .then(res => res.json())
      .then((res) => {
        dispatch({ type: 'REPOS_FETCHED', payload: res.map(repo => repo.id)});
      })
      .catch(console.log) // log because no error handler
}