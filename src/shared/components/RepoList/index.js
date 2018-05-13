import 'react-table/react-table.css';
import React from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';

const StyledTable = styled(ReactTable)`
  max-height: 450px;
`;

const Repos = ({repos = [], isUsersRepo, ...extraProps}) => {
  const getActiveRowStyle = (state, rowInfo, column) => ({style: rowInfo && isUsersRepo(rowInfo.original) ? {border: '1px solid blue'} : {}});
  return (
    <StyledTable data={repos} {...extraProps} getTrProps={getActiveRowStyle} showPagination={false} minRows={5} />
  );
};

export default Repos;