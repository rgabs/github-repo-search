import React from 'react';
import RepoList from 'shared/components/RepoList'
import Footer from 'shared/components/Footer'
import {connect} from 'react-redux';
import { populateCacheFromLocal } from 'shared/actions/thunks';
import styled from 'styled-primitives';

const Wrapper = styled.View`
  flex: 1
`;

class ReposContainer extends React.Component {
  ROWS_COUNT_OPTIONS = [5, 10, 15]
  
  HEADINGS = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Repo Title', accessor: 'name' },
    { Header: 'Owner', accessor: 'owner' },
    { Header: 'Stars', accessor: 'stargazers_count' },
    { Header: 'Created', accessor: 'created_at' },
  ]

  state = {
    startIndex: 0,
    rowsCount: this.ROWS_COUNT_OPTIONS[0]
  }
  componentWillReceiveProps(newProps) {
    if (newProps.repos !== this.props.repos) {
      this.setState({ startIndex: 0}) // Reset pagination if the rows have been changed
    }
  }

  componentDidMount() {
    this.props.setCache();
  }

  isUsersRepo = (repo = {}) => this.props.repoIDs.includes(repo.id);

  onNextPress = () => this.setState({ startIndex: this.state.startIndex + this.state.rowsCount})

  onPreviousPress = () => this.setState({ startIndex: this.state.startIndex - this.state.rowsCount})
  
  changeRowsCount = (rowsCount) => this.setState({ rowsCount: Number(rowsCount), startIndex: 0});

  render() {
    const { startIndex, rowsCount} = this.state;
    const isNextActive = startIndex + rowsCount < this.props.repos.length;
    const isBackActive = startIndex >= rowsCount ;
    const slicedRows = this.props.repos.slice(startIndex, startIndex + rowsCount);
    return (
      <Wrapper>
        <RepoList dropdownPlaceholder='Rows to Display' loading={this.props.loading} repos={slicedRows} isUsersRepo={this.isUsersRepo} columns={this.HEADINGS} />
        <Footer searchPlaceHolder='Rows to Display' onNextPress={this.onNextPress} onPreviousPress={this.onPreviousPress} options={this.ROWS_COUNT_OPTIONS} 
          isBackActive={isBackActive} isNextActive={isNextActive} onChange={this.changeRowsCount} ></Footer>
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