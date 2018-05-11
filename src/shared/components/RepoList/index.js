import React from 'react';

class Repos extends React.Component {
  render() {
    const {repos} = this.props;
    return repos && repos.length ? repos.map(({ full_name, id }) => <p key={id}>{full_name}</p>) : null
  }
}

export default Repos;