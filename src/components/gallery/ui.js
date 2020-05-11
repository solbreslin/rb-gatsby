import React from "react";
import Filters from "./filters";
import Gallery from "./gallery";

const GalleryUI = ({
  state,
  state: { categories, displayCategory },
  setCategory,
}) => {
  return (
    <section className="gallery-wrapper">
      <div className="filters">
        <ul>{Filters(categories, displayCategory, setCategory)}</ul>
      </div>
      <Gallery state={state}></Gallery>
    </section>
  );
};

export default GalleryUI;
