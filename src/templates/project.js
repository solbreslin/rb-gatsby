import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled, { css } from "styled-components";
import Carousel from "../components/carousel";
import Arrow from "../components/arrow";
import simpleParallax from "simple-parallax-js";

const workJSON = require("../../content/work.json");
const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/r-breslin-cloudinary/";

export default ({ data }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const imageEls = document.querySelectorAll("img");
    console.log("test", imageEls);
    new simpleParallax(imageEls, {
      scale: 1.1,
    });
  }, []);

  const {
    name,
    details,
    images,
    pagePath,
    primaryImage,
  } = data.allSitePage.edges[0].node.context;

  let projectCategory = "";
  let projectIndex = 0;

  let abort = false;
  for (const category of workJSON) {
    if (abort) break;

    for (const [index, project] of category.items.entries()) {
      if (abort) break;
      if (project.path === pagePath) {
        projectCategory = category.name;
        projectIndex = index;

        abort = true;
      }
    }
  }

  let previousProject = null;
  let nextProject = null;

  abort = false;
  for (const category of workJSON) {
    if (abort) break;
    if (category.name === projectCategory) {
      if (category.items[projectIndex - 1]) {
        previousProject = category.items[projectIndex - 1];
      }

      if (category.items[projectIndex + 1]) {
        nextProject = category.items[projectIndex + 1];
      }

      abort = true;
    }
  }

  // Make the first image be the primary image
  const sortedImages = [];
  images.forEach(image => {
    if (image === primaryImage) {
      sortedImages.unshift(image);
    } else {
      sortedImages.push(image);
    }
  });

  const isDesktop = () => {
    if (typeof window !== "undefined") {
      const { matches } = window.matchMedia("(max-width: 1200px)");
      return matches;
    }
  };

  const openCarousel = index => {
    setGalleryOpen(true);
    setGalleryIndex(index);

    document.body.style.overflow = "hidden";
  };

  const closeCarousel = () => {
    setGalleryOpen(false);
    setGalleryIndex(0);

    document.body.style.overflow = "initial";
  };

  return (
    <Layout className="project">
      <SEO title={"test"} />
      <section>
        <ProjectHeader>
          <Crumb>
            <Link to={"/" + projectCategory}>
              <Arrow orientation="left"></Arrow>
              <span>{projectCategory}</span>
            </Link>
          </Crumb>
          <Details>
            <h1>{name}</h1>
            <p>{details.material}</p>
          </Details>
        </ProjectHeader>
        <ProjectBody data->
          {sortedImages.map((image, index) => {
            return (
              <figure key={image + index} onClick={() => openCarousel(index)}>
                <img src={BASE_URL + image} />
              </figure>
            );
          })}
        </ProjectBody>
        <ProjectFooter>
          {previousProject ? (
            <Link to={"/" + previousProject.path}>
              Previous: {previousProject.display_name}
            </Link>
          ) : (
            ""
          )}
          {nextProject ? (
            <Link to={"/" + nextProject.path}>
              Next: {nextProject.display_name}
            </Link>
          ) : (
            ""
          )}
        </ProjectFooter>
      </section>
      {galleryOpen && (
        <CloseGalleryButton onClick={closeCarousel}>
          <span className="sr-only">Close</span>
        </CloseGalleryButton>
      )}
      {galleryOpen && <Carousel images={sortedImages} index={galleryIndex} />}
    </Layout>
  );
};

export const query = graphql`
  query($path: String!) {
    allSitePage(filter: { path: { eq: $path } }) {
      edges {
        node {
          context {
            details {
              material
            }
            name
            pagePath
            images
            bgColor
            primaryImage
          }
        }
      }
    }
  }
`;

const ProjectHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const Crumb = styled.div`
  a {
    color: black;
    display: inline-flex;
    letter-spacing: 0.075em;
    position: relative; // ??
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const Details = styled.div`
  grid-column: 2;
`;

const ProjectBody = styled.div`
  display: grid;
  /* grid-auto-rows: 90vh; */
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;

  figure {
    cursor: pointer;

    &:nth-of-type(3n + 1),
    &:nth-of-type(3n + 1):last-child {
      grid-column: 1 / -1;
    }
  }

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
const ProjectFooter = styled.footer``;

const CloseGalleryButton = styled.button`
  height: 30px;
  position: fixed;
  right: 1rem;
  top: 1rem;
  width: 30px;
  z-index: 5;

  &:before,
  &:after {
    background-color: hsl(0, 0%, 100%);
    content: "";
    height: 5px;
    left: 0;
    position: absolute;
    top: 0;
    transform-origin: center;
    width: 30px;
  }

  &:before {
    transform: translateY(12.5px) rotate(45deg);
  }

  &:after {
    transform: translateY(12.5px) rotate(-45deg);
  }
`;
