import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import repos from 'shared/reducers/repos';
import user from 'shared/reducers/user';
import loader from 'shared/reducers/loader';
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({ repos, loader, user });
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

export default (Component) => (props) => (
  <Provider store={store}>
    <Component {...props}/>
  </Provider>
)