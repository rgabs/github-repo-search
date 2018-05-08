import { AppRegistry } from 'react-native';
import withStore from 'shared/hocs/withStore';
import SearchScene from 'shared/scenes/SearchScene';

AppRegistry.registerComponent('UniversalReactApp', () => withStore(SearchScene));
