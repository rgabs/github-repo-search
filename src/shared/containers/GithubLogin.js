import React from 'react';
import SocialLogin from 'react-social-login';
import {connect} from 'react-redux';
import GithubLoginButton from 'shared/components/GithubLoginButton/index';
import {onLoginSuccess} from 'shared/actions/thunks';

const GithubLogin = SocialLogin(GithubLoginButton);

const GithubLoginContainer = ({user, ...extraProps}) => (
  <GithubLogin isLoggedIn={user.isLoggedIn} gatekeeper='http://repo-search.herokuapp.com' 
    redirect={window.location.href} provider='github' appId={'1edaa48ff8fc280178a0'} {...extraProps}/> 
)

const mapDispatchToProps = (dispatch) => ({
  onLoginSuccess: (response) => {
    window.history.replaceState({}, document.title, '/');
    dispatch(onLoginSuccess(response._token.accessToken));
  },
  onLoginFailure: console.log
})

const mapStateToProps = ({user}) => ({
  user
})


export default connect(mapStateToProps, mapDispatchToProps)(GithubLoginContainer)