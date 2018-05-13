import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchScene from 'shared/scenes/SearchScene';
import registerServiceWorker from './registerServiceWorker';
import withStore from 'shared/hocs/withStore';

const App = withStore(SearchScene);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
