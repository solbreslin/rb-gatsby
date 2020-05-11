import React from "react";
import Masonry from "react-masonry-css";
import GalleryItem from "./gallery-item";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  700: 2,
  500: 1,
};

const Gallery = ({ state: { galleryItems, displayCategory } }) => (
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="gallery"
    columnClassName="gallery-col"
  >
    {galleryItems
      .filter(
        ({ category }) =>
          displayCategory === category || displayCategory === "all"
      )
      .map(item => (
        <GalleryItem key={`GalleryItem-${item.name}`} item={item}></GalleryItem>
      ))}
  </Masonry>
);

export default Gallery;
