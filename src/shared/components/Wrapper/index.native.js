import React from 'react';
import * as Animatable from 'react-native-animatable';
import StatusBar from 'shared/components/StatusBar'

const wrapperStyle = {
  justifyContent: 'space-between', flex: 1
}

export default ({children}) => (
  <Animatable.View useNativeDriver style={wrapperStyle} animation='fadeIn'>
      <StatusBar />
      {children}
  </Animatable.View>
)