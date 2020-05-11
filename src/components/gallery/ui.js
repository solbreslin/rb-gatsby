import React from "react";
import Filters from "./filters";
import Gallery from "./gallery";

const GalleryUI = ({ state, state: { categories }, setCategory }) => {
  return (
    <section className="gallery-wrapper">
      <div className="filters">
        <ul>{Filters(categories, setCategory)}</ul>
      </div>
      <Gallery state={state}></Gallery>
    </section>
  );
};

export default GalleryUI;
