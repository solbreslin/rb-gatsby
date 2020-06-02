import React from "react";
import Masonry from "react-masonry-css";
import GalleryItem from "./gallery-item";
import { Link } from "gatsby";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  700: 2,
  500: 1,
};

const Gallery = ({ state: { galleryItems, displayCategory, layout } }) => (
  <div className="gallery-wrapper-inner">
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={layout === "grid" ? "gallery active" : "gallery inactive"}
      columnClassName="gallery-col"
    >
      {galleryItems
        .filter(
          ({ category }) =>
            displayCategory === category || displayCategory === "all"
        )
        .map(item => (
          <GalleryItem
            key={`GalleryTileItem-${item.imageURLs[0]}`}
            item={item}
          ></GalleryItem>
        ))}
    </Masonry>
    <ul
      className={
        layout === "list" ? "gallery-list active" : "gallery-list inactive"
      }
    >
      {galleryItems
        .filter(
          ({ category }) =>
            displayCategory === category || displayCategory === "all"
        )
        .sort((a, b) => (a.name > b.name ? 1 : 0))
        .map(item => (
          <li key={`GalleryListItem-${item.imageURLs[0]}`}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Gallery;
