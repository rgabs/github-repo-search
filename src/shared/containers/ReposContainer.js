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

const DropDown = ({ onChange, options }) => <select onChange={onChange}>
  {options.map((val, i) => <option key={i} value={val}>{val}</option>)}
</select>

class ReposContainer extends React.Component {
  ROWS_COUNT_OPTIONS = [5, 10, 15]
  
  HEADINGS = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Repo Title', accessor: 'name' },
    { Header: 'Owner', accessor: 'owner.login' },
    { Header: 'Stars', accessor: 'stargazers_count' },
    { Header: 'Created at', accessor: 'created_at' },
  ]

  state = {
    startIndex: 0,
    rowsCount: this.ROWS_COUNT_OPTIONS[0]
  }

  componentDidMount() {
    this.props.setCache();
  }

  isUsersRepo = (repo = {}) => this.props.repoIDs.includes(repo.id);

  onNextPress = () => this.setState({ startIndex: this.state.startIndex + this.state.rowsCount})

  onPreviousPress = () => this.setState({ startIndex: this.state.startIndex - this.state.rowsCount})
  
  changeRowsCount = (e) => this.setState({ rowsCount: Number(e.target.value), startIndex: 0});

  render() {
    const { startIndex, rowsCount} = this.state;
    const isNextActive = startIndex + rowsCount < this.props.repos.length;
    const isBackActive = startIndex >= rowsCount ;
    const slicedRows = this.props.repos.slice(startIndex, startIndex + rowsCount);
    return (
      <Wrapper>
        <DropDown options={this.ROWS_COUNT_OPTIONS} onChange={this.changeRowsCount} />
        <RepoList loading={this.props.loading} repos={slicedRows} isUsersRepo={this.isUsersRepo} columns={this.HEADINGS} />
        <Pagination onNextPress={this.onNextPress} onPreviousPress={this.onPreviousPress} 
          isBackActive={isBackActive} isNextActive={isNextActive} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ repos, user, loader }) => ({ 
  repos: repos.visible, repoIDs: user.repoIDs,
  loading: loader > 0
});

const mapDispatchToProps = (dispatch) => ({
  setCache: () => {
    dispatch(populateCacheFromLocal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposContainer)