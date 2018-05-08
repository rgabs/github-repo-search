import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import todo from 'shared/reducers/todo';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({ todo });
const store = createStore(reducers, composeWithDevTools({})());

export default (Component) => (props) => (
  <Provider store={store}>
    <Component {...props}/>
  </Provider>
)
