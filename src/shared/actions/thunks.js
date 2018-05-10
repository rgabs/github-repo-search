import { isEmpty } from 'lodash';
import AsyncStorage from 'shared/utils/storage';
import throttle from 'shared/utils/throttle';

export const fetchRepos = (inputString) => fetch(`https://api.github.com/search/repositories?q=${inputString}+in:name`)
  .then(res => res.json());

const throttledFetchRepos = throttle(fetchRepos, 1000);

export const fetchAndStoreRepos = (inputString) => {
  return (dispatch, getState) => {
    const { repos } = getState();
    if (repos.cached[inputString]) {
      return Promise.resolve(repos.cached[inputString]);
    }
    else if (!inputString || inputString.length < 2) {
      throttledFetchRepos.cancel();
      return Promise.resolve([]);
    }
    else {
      return throttledFetchRepos(inputString)
        .then(({ items }) => {
          if (isEmpty(items)) {
            return [];
          }
          dispatch({ type: 'ADD_CACHE', payload: { repos: items, inputString } });
          AsyncStorage.setItem('cachedRepos', JSON.stringify(getState().repos.cached));
          return items;
        });
    }
  }
}

export const populateCacheFromLocal = () => dispatch => {
  AsyncStorage.getItem('cachedRepos')
    .then(JSON.parse)
    .then((cachedRepos) => {
      console.log('cachedRepos', cachedRepos);
      cachedRepos && dispatch({ type: 'SET_CACHE', payload: cachedRepos });
    })
}
