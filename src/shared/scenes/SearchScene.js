import GithubLogin from 'shared/containers/GithubLogin';
import React from 'react';
import Repos from 'shared/containers/ReposContainer';
import SearchInput from 'shared/containers/SearchInputContainer';
import Wrapper from 'shared/components/Wrapper';

class SearchScene extends React.Component {
  render () {
    return (
      <Wrapper>
        <SearchInput/>
        <Repos />
        <GithubLogin  />
      </Wrapper>
    );
  }
}

export default SearchScene;