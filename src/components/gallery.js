import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import { Link } from "gatsby";
import Filters from "./filters";
import { shuffle } from "lodash";

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
  const galleryItems = shuffle(
    items.map((n, i) => (
      <Link data-filter={n.filter} to={n.path + "/"} key={n + "-" + i}>
        <GalleryFigure>
          <GalleryImage alt={n.project} src={n.imageURLs[0]}></GalleryImage>
          <GalleryFigcaption>{n.name}</GalleryFigcaption>
        </GalleryFigure>
      </Link>
    ))
  );

  const [activeItems, setActiveItems] = useState(galleryItems);

  const filterItems = filter => {
    const filteredItems = filter
      ? galleryItems.filter(item => item.props["data-filter"] === filter)
      : galleryItems;

    setActiveItems(filteredItems);
  };

  return (
    <section className="gallery-wrapper">
      <Filters filters={filters} onFilterUpdate={filterItems} />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="gallery"
        columnClassName="gallery-col"
      >
        {activeItems}
      </Masonry>
    </section>
  );
}

Gallery.propTypes = {
  items: PropTypes.array,
};

Gallery.defaultProps = {
  items: [],
};

export default Gallery;
