import React from 'react';
import styled from 'styled-primitives';
import StatusBar from 'shared/components/StatusBar'

const StyledWrapper = styled.View`
  justify-content: space-between;
  flex: 1;
`

export default ({children}) => (
  <StyledWrapper>
    <StatusBar/>
    {children}
  </StyledWrapper>
)