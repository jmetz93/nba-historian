import React from 'react';
import { Button } from '../Button';
import './Pagination.css';

const Pagination = (props) => {
  const {
    currentPage, 
    pageRange, 
    pageChangeHandler,
    previousAvailable,
    nextAvailable 
  } = props;

  return (
    <div className="nav-link-container">
      <p className="page-text">Page: {currentPage} of {pageRange}</p>
      {previousAvailable && <button 
        className=".nav-link"
        onClick={() => pageChangeHandler(currentPage - 1)}
      >
        Previous
      </button>}
      {nextAvailable && <button 
        className=".nav-link"
        onClick={() => pageChangeHandler(currentPage + 1)}
      >
        Next
      </button>}
    </div>
  )
};

export default Pagination;