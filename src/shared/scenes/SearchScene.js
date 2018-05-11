import React from 'react';
import styled from 'styled-primitives';
import Repos from 'shared/containers/ReposContainer'
import GithubLogin from 'shared/containers/GithubLogin';
import SearchInput from 'shared/containers/SearchInputContainer';

const Header = styled.Text`
  font-size: 20px;
  text-align: center;
`;
const View = styled.View``;

class SearchScene extends React.Component {
  render() {
    return (
      <View>
        <Header>Search Github Repos</Header>
        <SearchInput/>
        <Repos />
        <GithubLogin />
      </View>
      )
  }
}


export default SearchScene;