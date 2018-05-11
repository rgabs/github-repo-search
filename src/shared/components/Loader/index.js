import React from 'react';
import styled from 'styled-primitives';

const Header = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export default ({ loader}) => loader ? <Header>Loading...</Header>: null