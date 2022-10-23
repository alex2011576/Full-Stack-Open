import React from "react";

const Filter = ({ newFilter, onFilterChange }) => {
  return (
    <div>
      find countries <input value={newFilter} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
