import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('firestackexample')
manager.configure({
  github: {
    client_id: '1edaa48ff8fc280178a0',
    client_secret: 'bcdf8828f80c9ba4457184ff4bbbb5b0a7079612'
  }
});

// ...
manager.authorize('github', { scopes: 'profile email' })
  .then(resp => console.log('Your users ID'))
  .catch(err => console.log('There was an error'));

