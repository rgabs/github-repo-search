import React from 'react';
import RepoList from 'shared/components/RepoList'
// import Pagination from 'shared/components/Pagination'
import {connect} from 'react-redux';
import { populateCacheFromLocal } from 'shared/actions/thunks';
import styled from 'styled-primitives';

const Wrapper = styled.View``;

const Pagination = ({ onNextPress, onPreviousPress, isBackActive, isNextActive}) => (
  <div>
    <button onClick={onPreviousPress} disabled={!isBackActive}>previous {!isBackActive}</button>
    <button onClick={onNextPress} disabled={!isNextActive}>next {String(!isNextActive)}</button>
  </div>
)

class ReposContainer extends React.Component {
  componentDidMount() {
    this.props.setCache();
  }
  
  isUsersRepo = (repo) => this.props.userRepos.includes(repo.id);

  state = { 
    reposToShow: this.props.repos.slice(0, 5), 
    startIndex: 0, 
    isBackActive: true, 
    isNextActive: this.props.repos.length > 0 
  }

  componentWillReceiveProps(props) {
    this.setState({
      reposToShow: props.repos.slice(0, 5),
      isNextActive: props.repos.length > 0
    })
  }

  onNextPress = () => { 
    const newStartIndex = this.state.startIndex + 5;
    this.setState({ 
      reposToShow: this.props.repos.slice(newStartIndex, newStartIndex + 5),
      startIndex: newStartIndex,
      isNextActive: newStartIndex + 5 < this.props.repos.length
    })
  }

  onPreviousPress = () => {
    const newStartIndex = this.state.startIndex - 5;
    
    this.setState({
      reposToShow: this.props.repos.slice(newStartIndex, this.state.startIndex),
      startIndex: newStartIndex,
      // isBackActive: newStartIndex > 0
    })
  }

  render() {
    const { isBackActive, isNextActive, reposToShow} = this.state;
    return (
      <Wrapper>
        <RepoList repos={reposToShow} isUsersRepo={this.isUsersRepo} />
        <Pagination onNextPress={this.onNextPress} onPreviousPress={this.onPreviousPress} 
          isBackActive={isBackActive} isNextActive={isNextActive} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ repos, user }) => ({ repos: repos.visible, userRepos: repos.userRepos});

const mapDispatchToProps = (dispatch) => ({
  setCache: () => {
    dispatch(populateCacheFromLocal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposContainer)