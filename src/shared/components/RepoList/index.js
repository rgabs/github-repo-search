import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const Repos = ({ repos = [], isUsersRepo, ...extraProps}) => {
  const getActiveRowStyle = (state, rowInfo, column) => {
    return { style: rowInfo && isUsersRepo(rowInfo.original) ? { border: '1px solid blue' } : {} };
  }
  return (
    <ReactTable data={repos} {...extraProps} getTrProps={getActiveRowStyle} showPagination={false} minRows={5} />
)}

export default Repos;