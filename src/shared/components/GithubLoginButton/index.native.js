import {TouchableOpacity } from 'react-native';
import React from 'react';
import { SocialIcon } from 'react-native-elements';

const GithubLoginButton = ({ triggerLogin }) => (
  <SocialIcon component={TouchableOpacity} style={{ backgroundColor: '#2F3237' }}
    icon={{ name: 'github' }} title='Login with Github'
    button raised onPress={triggerLogin} type='github'
  />
);

export default GithubLoginButton