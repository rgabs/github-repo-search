import React from 'react';
import styled from 'styled-primitives';

const StyledButton = styled.View`
  display: inline-flex;
  justify-content: center;
`;

const LoginButton = ({triggerLogin, isLoggedIn, name = ''}) => (
  <StyledButton>
    <button className='waves-effect waves-light btn' disabled={isLoggedIn}
      onClick={triggerLogin}>
      {isLoggedIn ? `Logged In as ${name}` : 'Login with Github'}
    </button>
  </StyledButton>
  
);

export default LoginButton;