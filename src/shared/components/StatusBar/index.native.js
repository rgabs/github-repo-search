import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-primitives';

const height = Platform.select({
  ios: 20,
  android: StatusBar.currentHeight
});

const StatusBarWrapper = styled.View`
  background-color: black;
  height: ${height};
  width: 100%;
`;


const CustomStatusBar = () => (
  <StatusBarWrapper>
    <StatusBar backgroundColor='black' barStyle='light-content' translucent/>
  </StatusBarWrapper>
);

export default CustomStatusBar;
