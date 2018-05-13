import SearchScene from 'shared/scenes/SearchScene';
import withStore from 'shared/hocs/withStore';
import {AppRegistry} from 'react-native';

AppRegistry.registerComponent('githubsearch', () => withStore(SearchScene));
