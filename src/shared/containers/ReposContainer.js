import React from 'react';
import RepoList from 'shared/components/RepoList'
import Footer from 'shared/components/Footer'
import {connect} from 'react-redux';
import { populateCacheFromLocal } from 'shared/actions/thunks';
import styled from 'styled-primitives';
import { sortBy } from 'lodash';

const Wrapper = styled.View`
  flex: 1
`;

class ReposContainer extends React.Component {
  ROWS_COUNT_OPTIONS = [5, 10, 15, 20]
  
  HEADINGS = [
    { Header: 'ID', accessor: 'id', sortBy: 'id' },
    { Header: 'Repo Title', accessor: 'name', sortBy: 'name' },
    { Header: 'Owner', accessor: 'owner', sortBy: 'owner' },
    { Header: 'Stars', accessor: 'stargazers_count', sortBy: 'stargazers_count' },
    { Header: 'Created', accessor: 'created_at', sortBy: 'createdTimeStamp' },
  ]

  state = {
    startIndex: 0,
    rowsCount: this.ROWS_COUNT_OPTIONS[0],
    selectedHeader: {},
    headerValue: false,
    repos: this.props.repos
  }

  componentWillReceiveProps({repos}) {
    if (repos !== this.props.repos) {
      this.setState({ startIndex: 0, repos, selectedHeader: {}, headerValue: false,}) 
      // Reset pagination and headerfilter if the rows have been changed
    }
  }
  toggleHeader = (selectedHeader) => () => {
    const headerValue = this.state.selectedHeader.accessor === selectedHeader.accessor && !this.state.headerValue;
    const sortedRepos = sortBy(this.props.repos, selectedHeader.sortBy);
    this.setState({
      selectedHeader: selectedHeader,
      headerValue,
      repos: headerValue ? sortedRepos.reverse() : sortedRepos
    });
  }

  componentDidMount() {
    this.props.setCache();
  }

  isUsersRepo = (repo = {}) => this.props.repoIDs.includes(repo.id);

  onNextPress = () => this.setState({ startIndex: this.state.startIndex + this.state.rowsCount})

  onPreviousPress = () => this.setState({ startIndex: this.state.startIndex - this.state.rowsCount})
  
  changeRowsCount = (rowsCount) => this.setState({ rowsCount: Number(rowsCount), startIndex: 0});

  render() {
    const { startIndex, rowsCount, selectedHeader, headerValue} = this.state;
    const isNextActive = startIndex + rowsCount < this.props.repos.length;
    const isBackActive = startIndex >= rowsCount;
    const slicedRepos = this.state.repos.slice(startIndex, startIndex + rowsCount);
    return (
      <Wrapper>
        <RepoList selectedHeader={selectedHeader} dropdownPlaceholder='Rows to Display' repos={slicedRepos} 
          headerValue={headerValue} loading={this.props.loading} toggleHeader={this.toggleHeader} 
          isUsersRepo={this.isUsersRepo} columns={this.HEADINGS} />
        <Footer searchPlaceHolder='Rows to Display' onNextPress={this.onNextPress} 
          onPreviousPress={this.onPreviousPress} options={this.ROWS_COUNT_OPTIONS} 
          isBackActive={isBackActive} isNextActive={isNextActive} onChange={this.changeRowsCount} ></Footer>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ repos, user, loader }) => ({ 
  repos: repos.visible.map(id => repos.cached.allRepos[id]), 
  repoIDs: user.repoIDs,
  loading: loader > 0
});

const mapDispatchToProps = (dispatch) => ({
  setCache: () => {
    dispatch(populateCacheFromLocal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposContainer)