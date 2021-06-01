import React from "react";

const Pagination = ({ newsPerPage, totalNews, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <span
              onClick={() => paginate(number)}
              style={{ cursor: "pointer" }}
              className="page-link"
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
