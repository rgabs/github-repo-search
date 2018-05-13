import AsyncStorage from '../utils/storage';
import {getCachedReposForInput, processRepos, updateCachedRepos} from '../utils/repos';
import {isEmpty} from 'lodash';

const fetchRepos = (inputString) => fetch(`https://api.github.com/search/repositories?q=${inputString}+in:name&per_page=50`).
  then((res) => res.json());

const addCache = (repos, inputString) => (dispatch, getState) => {
  const cachedRepos = getState().repos.cached;
  if (isEmpty(repos) || cachedRepos.searchStringsMap[inputString]) return;
  const newCachedRepos = updateCachedRepos(cachedRepos, repos, inputString);
  dispatch({type: 'ADD_CACHE', payload: newCachedRepos});
  AsyncStorage.setItem('cachedRepos', JSON.stringify(newCachedRepos));
};

export const fetchAndStoreRepos = (inputString) => (dispatch, getState) => {
  const {repos} = getState();
  if (repos.cached.searchStringsMap[inputString.toLowerCase()]) {
    return Promise.resolve(getCachedReposForInput(repos.cached, inputString));
  } else if (!inputString || inputString.length < 2) {
    return Promise.resolve([]);
  } else {
    dispatch({type: 'SHOW_LOADER'});
    return fetchRepos(inputString).then(({items}) => {
      dispatch({type: 'HIDE_LOADER'});
      const processedRepos = items.map(processRepos);
      dispatch(addCache(processedRepos, inputString));
      return processedRepos;
    }).
      catch((e) => {
        dispatch({type: 'HIDE_LOADER'});
        throw e;
      });
  }
};

export const populateCacheFromLocal = () => (dispatch) => {
  AsyncStorage.getItem('cachedRepos').
    then(JSON.parse).
    then((cachedRepos) => {
      cachedRepos && dispatch({type: 'SET_CACHE', payload: cachedRepos});
    }).
    catch(console.log); // log because no error handler
};

export const onLoginSuccess = (accessToken) => (dispatch) => {
  dispatch({type: 'LOGIN_SUCCESS', payload: accessToken});
  return fetch(`https://api.github.com/user/repos?access_token=${accessToken}&affiliation=owner&per_page=100`).
    then((res) => res.json()).
    then((res) => {
      dispatch({type: 'REPOS_FETCHED', payload: res.map((repo) => repo.id)});
    }).
    catch(console.log); // log because no error handler
};