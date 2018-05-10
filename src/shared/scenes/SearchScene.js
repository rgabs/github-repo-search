import React from 'react';
import styled from 'styled-primitives';
import {connect} from 'react-redux';
import { fetchAndStoreRepos, populateCacheFromLocal} from 'shared/actions/thunks'

const Header = styled.Text`
  font-size: 20px;
  text-align: center;
`;
const Input = styled.TextInput``;
const View = styled.View``;

const mapStateToProps = ({ repos, spinner }) => ({ repos: repos.visibleRepos, spinner})

const mapDispatchToProps = (dispatch) => ({
  onInputChange: (text) => {
    dispatch(fetchAndStoreRepos(text))
      .then((payload) => dispatch({ type: 'SET_VISIBLE_REPOS', payload }));
  },
  setCache: () => {
    dispatch(populateCacheFromLocal());
  }
})

const Repos = ({ repos }) => repos && repos.length ? repos.map(({ full_name }) => <Header>{full_name}</Header>) : ''

class Search extends React.Component {
  componentDidMount() {
    this.props.setCache();
  }
  render() {
    const { repos, onInputChange, searchString, spinner } = this.props;
    return <View><Header>hello</Header>
      <Input onChangeText={onInputChange} value={searchString} />
      {spinner ? 'Loading...' : <Repos repos={repos} />}
    
    </View>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);