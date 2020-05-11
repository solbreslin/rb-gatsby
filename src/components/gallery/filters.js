import React from "react";

const Filters = (categories, displayCategory, setCategory) =>
  categories.map(category => (
    <li key={category} className={category === displayCategory ? "active" : ""}>
      <button
        className={`btn-${category}`}
        onClick={() => setCategory(category)}
      >
        {category}
      </button>
    </li>
  ));

export default Filters;
