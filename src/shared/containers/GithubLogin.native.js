import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('githubsearch')
manager.configure({
  github: {
    client_id: '551957e1a0313ce3ab27',
    client_secret: 'ad39cade04054dc7b1e465055f7a34bf92e2398f'
  }
});

// ...
manager.authorize('github', { scopes: 'profile email' })
  .then(resp => console.log('Your users ID', resp))
  .catch(err => console.log('There was an error'));

