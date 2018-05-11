import OAuthManager from 'react-native-oauth';
import {Platform} from 'react-native';

const manager = new OAuthManager('githubsearch')

manager.configure({
  github: {
    client_id: Platform.select({ ios: '8d07750095c0b3e4a7a1', android: '551957e1a0313ce3ab27'}),
    client_secret: Platform.select({ ios: 'ff8b0392def34bad9bc9bad8fb2fe6b464463db1', android: 'ad39cade04054dc7b1e465055f7a34bf92e2398f' })
  }
});

// ...
manager.authorize('github', { scopes: 'profile email' })
  .then(resp => console.log('Your users ID', resp))
  .catch(err => console.log('There was an error'));

