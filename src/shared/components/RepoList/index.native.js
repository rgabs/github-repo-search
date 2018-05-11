import React from 'react';
import styled from 'styled-primitives';

const Header = styled.Text`
  font-size: 20px;
  text-align: center;
`;

class Repos extends React.Component {
  render() {
    const { repos } = this.props;
    return repos && repos.length ? repos.map(({ full_name, id }) => <Header key={id}>{full_name}</Header>) : null
  }
}

export default Repos;