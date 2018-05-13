import React from 'react';
import styled from 'styled-primitives';

const StyledButton = styled.View`
  display: inline-flex;
  justify-content: center;
`;

const LoginButton = ({triggerLogin, isLoggedIn}) => (
  <StyledButton>
    <button className='waves-effect waves-light btn' disabled={isLoggedIn}
      onClick={triggerLogin}>
      {isLoggedIn ? 'Logged In' : 'Login with Github'}
    </button>
  </StyledButton>
  
);

export default LoginButton;