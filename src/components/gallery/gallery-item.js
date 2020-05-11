import React from "react";
import { Link } from "gatsby";

const GalleryItem = ({ item }) => (
  <Link to={item.path} key={`GalleryItem-${item.name}`}>
    <figure>
      <img alt={item.project} src={item.imageURLs[0]}></img>
      <figcaption>{item.name}</figcaption>
    </figure>
  </Link>
);

export default GalleryItem;
