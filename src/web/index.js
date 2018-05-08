import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import withStore from 'shared/hocs/withStore';
import SearchScene from 'shared/scenes/SearchScene';

const App = withStore(SearchScene);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
