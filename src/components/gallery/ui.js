import React from "react";
import Filters from "./filters";
import Gallery from "./gallery";

const GalleryUI = ({
  state,
  state: { categories, displayCategory },
  setCategory,
  setLayout,
}) => {
  return (
    <section className="gallery-wrapper">
      <header>
        <div className="gallery-filters">
          <ul>{Filters(categories, displayCategory, setCategory)}</ul>
        </div>
        <div className="gallery-options">
          <button onClick={() => setLayout("grid")}>Grid</button>
          <button onClick={() => setLayout("list")}>List</button>
        </div>
      </header>
      <Gallery state={state}></Gallery>
    </section>
  );
};

export default GalleryUI;
