import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import { Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_300/";

const breakpointColumnsObj = {
  default: 3,
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

const mapImagesToProjects = (imagePaths, projects) => {
  let allowedPaths = projects.map(n => n.path);

  const collections = [];
  let current = "";

  imagePaths.forEach(str => {
    const project = str.split("/")[3];

    if (allowedPaths.includes(project)) {
      if (current !== project) {
        const projectIndex = projects.findIndex(n => n.path === project);
        const displayName = projects[projectIndex].display_name;
        const details = projects[projectIndex].details;

        collections.push({
          path: project,
          display_name: displayName,
          details,
          items: [str],
        });

        current = project;
      } else {
        const index = collections.findIndex(n => n.path === project);
        collections[index].items.push(str);
      }
    }
  });

  return collections;
};

function Gallery({ imagePaths, projectData }) {
  const projects = mapImagesToProjects(imagePaths, projectData);

  const items = projects.map((n, i) => (
    <Link to={n.path} key={n + "-" + i}>
      <GalleryFigure>
        <GalleryImage
          alt={n.project}
          src={BASE_URL + n.items[0]}
        ></GalleryImage>
        <GalleryFigcaption>{n.display_name}</GalleryFigcaption>
      </GalleryFigure>
    </Link>
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
