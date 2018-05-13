import React from 'react';
import loader from 'shared/reducers/loader';
import repos from 'shared/reducers/repos';
import thunk from 'redux-thunk';
import user from 'shared/reducers/user';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({repos, loader, user});
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

export default (Component) => (props) => (
  <Provider store={store}>
    <Component {...props}/>
  </Provider>
);