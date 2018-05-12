import { AppRegistry } from 'react-native';
import withStore from 'shared/hocs/withStore';
import SearchScene from 'shared/scenes/SearchScene';

if(__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
  global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;
}


AppRegistry.registerComponent('githubsearch', () => withStore(SearchScene));
