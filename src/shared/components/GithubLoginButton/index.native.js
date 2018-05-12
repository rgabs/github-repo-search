import {TouchableOpacity } from 'react-native';
import React from 'react';
import { SocialIcon } from 'react-native-elements';

const GithubLoginButton = ({ triggerLogin, isLoggedIn }) => (
  <SocialIcon component={TouchableOpacity} style={{ backgroundColor: '#2F3237' }}
    icon={{ name: 'github' }} title={isLoggedIn ? 'Logged In' : 'Login with Github'}
    button raised onPress={triggerLogin} type='github' disabled={isLoggedIn}
  />
);

export default GithubLoginButton