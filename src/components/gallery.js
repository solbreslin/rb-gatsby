import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import { Link } from "gatsby";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  700: 2,
  500: 1,
};

const GalleryFigure = styled.figure`
  margin: 0;
  overflow: hidden;
  padding: 0;
`;

const GalleryFigcaption = styled.figcaption`
  background-color: white;
  bottom: 0;
  padding: 0.5rem 0 2rem;
  width: 100%;
`;

const GalleryImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

function Gallery({ items, filters }) {
  const galleryItems = items.map((n, i) => (
    <Link to={n.path + "/"} key={n + "-" + i}>
      <GalleryFigure>
        <GalleryImage alt={n.project} src={n.imageURLs[0]}></GalleryImage>
        <GalleryFigcaption>{n.name}</GalleryFigcaption>
      </GalleryFigure>
    </Link>
  ));

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="gallery"
      columnClassName="gallery-col"
    >
      {galleryItems}
    </Masonry>
  );
}

Gallery.propTypes = {
  items: PropTypes.array,
};

Gallery.defaultProps = {
  items: [],
};

export default Gallery;
