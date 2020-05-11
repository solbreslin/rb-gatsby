import React from "react";

const Filters = (categories, setCategory) =>
  categories.map(category => (
    <li key={category}>
      <button
        className={`btn-${category}`}
        onClick={() => setCategory(category)}
      >
        {category}
      </button>
    </li>
  ));

export default Filters;
