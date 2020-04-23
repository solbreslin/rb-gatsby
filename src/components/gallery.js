import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_300,c_thumb,g_face/";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  700: 2,
  500: 1,
};

const GalleryLink = styled.a`
  display: block;
`;

const GalleryFigure = styled.figure`
  margin: 0;
  overflow: hidden;
  padding: 0;
`;

const GalleryFigcaption = styled.figcaption`
  background-color: white;
  bottom: 0;
  padding: .675rem 0 2rem;
  width: 100%;
`;

const GalleryImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const getCollections = data => {
  const collections = [];
  let current = "";

  data.forEach(str => {
    const project = str.split("/")[3];

    if (current !== project) {
      collections.push({
        project,
        items: [str],
      });
      current = project;
    } else {
      const index = collections.findIndex(n => (n.project = project));
      collections[index].items.push(str);
    }
  });

  return collections;
};

function Gallery({ imagePaths }) {
  const collections = getCollections(imagePaths);

  const items = collections.map((n, i) => (
    <GalleryLink key={n + "-" + i}>
      <GalleryFigure>
        <GalleryImage
          alt={n.project}
          src={BASE_URL + n.items[0]}
        ></GalleryImage>
        <GalleryFigcaption>{n.project}</GalleryFigcaption>
      </GalleryFigure>
    </GalleryLink>
  ));

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="gallery"
      columnClassName="gallery-col"
    >
      {items}
    </Masonry>
  );
}

Gallery.propTypes = {
  imagePaths: PropTypes.array,
};

Gallery.defaultProps = {
  imagePaths: [],
};

export default Gallery;
