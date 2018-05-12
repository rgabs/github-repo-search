import React from 'react'
import OAuthManager from 'react-native-oauth';
import {Platform} from 'react-native';
import GithubLoginButton from 'shared/components/GithubLoginButton'

export default class GithubLogin extends React.Component {
  static manager = new OAuthManager('githubsearch')

  githubConfig = {
    client_id: Platform.select({ ios: '8d07750095c0b3e4a7a1', android: '551957e1a0313ce3ab27' }),
    client_secret: Platform.select({ ios: 'ff8b0392def34bad9bc9bad8fb2fe6b464463db1', android: 'ad39cade04054dc7b1e465055f7a34bf92e2398f' })
  }

  componentDidMount() {
    GithubLogin.manager.configure({
      github: this.githubConfig
    });
  }

  logMeIn() {
    GithubLogin.manager.authorize('github', { scopes: 'profile email' })
      .then(resp => console.log('Your users ID', resp))
      .catch(err => console.log('There was an error, ', err));
  }

  render() {
    this.logMeIn();
    return <GithubLoginButton triggerLogin={this.logMeIn}></GithubLoginButton>
  }
}
