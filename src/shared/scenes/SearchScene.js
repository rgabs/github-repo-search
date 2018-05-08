import React from 'react';
import styled from 'styled-primitives';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const Header = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export default () => <Header>hello</Header>