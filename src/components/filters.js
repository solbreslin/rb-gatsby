import PropTypes from "prop-types";
import React, { useState } from "react";

function Filters({ filters, onFilterUpdate }) {
  const [filter, setFilter] = useState("");

  const galleryFilters = filters.map((f, i) => {
    return (
      <li className={filter === f ? "selected" : ""} key={f + i}>
        <button onClick={() => handleClick(f)}>{f}</button>
      </li>
    );
  });

  const handleClick = filter => {
    setFilter(filter);
    onFilterUpdate(filter);
  };

  return (
    <div className="filters">
      <ul>
        <li className={filter === "" ? "selected" : ""}>
          <button onClick={() => handleClick("")}>All</button>
        </li>
        {galleryFilters}
      </ul>
    </div>
  );
}

Filters.propTypes = {
  filters: PropTypes.array,
};

Filters.defaultProps = {
  filters: [],
};

export default Filters;
