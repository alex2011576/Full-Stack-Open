import React from "react";

const Filter = ({ newFilter, onFilterChange }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
