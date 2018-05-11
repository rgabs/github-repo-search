import React from 'react';
import styled from 'styled-primitives';
import Repos from 'shared/containers/ReposContainer'
import GithubLogin from 'shared/containers/GithubLogin';
import SearchInput from 'shared/containers/SearchInputContainer';
import Loader from 'shared/containers/LoaderContainer';


const Header = styled.Text`
  font-size: 20px;
  text-align: center;
`;
const View = styled.View``;


class SearchScene extends React.Component {
  render() {
    const { spinner } = this.props;
    return <View><Header>hello</Header>
      <SearchInput/>
      {spinner ? <Header>Loading...</Header> : <Repos/>}
      <GithubLogin />
      <Loader />
    </View>
  }
}


export default SearchScene;