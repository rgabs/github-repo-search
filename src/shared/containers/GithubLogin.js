import React from 'react';
import SocialLogin from 'react-social-login';

const GithubLogin = SocialLogin(({ triggerLogin }) => <div onClick={triggerLogin}>login</div>);

export default () => <GithubLogin gatekeeper='http://repo-search.herokuapp.com' redirect={window.location.href} onLoginSuccess={console.log}
  provider='github' appId={'1edaa48ff8fc280178a0'} onLoginFailure={console.log} />