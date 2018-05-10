import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import repos from 'shared/reducers/repos';
import spinner from 'shared/reducers/spinner';
import thunk from 'redux-thunk'
import { debounce, noop } from 'lodash';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({ repos, spinner });
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

export default (Component) => (props) => (
  <Provider store={store}>
    <Component {...props}/>
  </Provider>
)

export const withDebounce = (Component, propsToDebounce = [], timer) =>  {
  return class extends React.Component {
    debouncifyFn = (fn) => (e) => {
      e.persist();
      fn(e);
    }

    debouncedProps = propsToDebounce.reduce((acc, curr) => {
      return { ...acc, [curr]: this.debouncifyFn(debounce(this.props[curr], timer)) }
    }, {})

    render() {
      return <Component {...this.props} {...this.debouncedProps} />
    }
  }
}