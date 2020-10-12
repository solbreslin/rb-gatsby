import React, { useEffect, useCallback, useState } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Lightbox from "../components/lightbox";

// Uncomment both import statements to process color
// import ColorThief from "./../../node_modules/colorthief/dist/color-thief";
// import { RGBToHSL } from "../utils/rgb2hsl";
// const PROCESS_COLOR = true;

const workJSON = require("../../content/work.json");
const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/r-breslin-cloudinary/";

const useKeyPress = (targetKeyCode, callback) => {
  function downHandler(e) {
    // Prevent carousel navigation while focus is in the sidebar
    if (document.activeElement.closest("aside")) return;

    if (e.which === targetKeyCode) {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKeyCode, downHandler]);
};

const PrevButton = ({ enabled, onClick }) => (
  <button
    className="rb-carousel-button prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <span>
      <svg
        aria-hidden="true"
        role="presentation"
        focusable="false"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
        </g>
      </svg>
    </span>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="rb-carousel-button next"
    onClick={onClick}
    disabled={!enabled}
  >
    <span>
      <svg
        aria-hidden="true"
        role="presentation"
        focusable="false"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
        </g>
      </svg>
    </span>
  </button>
);

export default ({ data }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [lightboxSrc, setLightboxSrc] = useState("");

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(index => embla && embla.scrollTo(index), [
    embla,
  ]);

  const {
    name,
    details,
    images,
    pagePath,
    bgColor,
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

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  // Make the first image in the carousel be the primary image
  const sortedImages = [];
  images.forEach(image => {
    if (image === primaryImage) {
      sortedImages.unshift(image);
    } else {
      sortedImages.push(image);
    }
  });

  const arrow = orientation => (
    <span className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 14.5 8.18"
        style={orientation === "left" ? { transform: "rotate(-180deg)" } : {}}
      >
        <line
          stroke="#2B2B2B"
          strokeMiterlimit="10"
          x1="0"
          y1="4.09"
          x2="13.42"
          y2="4.09"
        ></line>
        <polygon
          fill="#2B2B2B"
          points="10.1,8.18 9.42,7.45 13.03,4.09 9.42,0.73 10.1,0 14.5,4.09"
        ></polygon>
      </svg>
    </span>
  );

  const isDesktop = () => {
    if (typeof window !== "undefined") {
      const { matches } = window.matchMedia("(max-width: 1200px)");
      return matches;
    }
  };

  const onImageClick = (url, i) => {
    if (url) {
      setLightboxSrc(url);

      console.log(url, i);
    }
  };

  useKeyPress(37, scrollPrev);
  useKeyPress(39, scrollNext);

  return (
    <Layout className="project">
      <SEO title={"test"} />
      <section>
        <div className={"project-header"}>
          <Link to={"/" + projectCategory}>
            {arrow("left")}
            <span>{projectCategory}</span>
          </Link>
          <h1>{name}</h1>
        </div>
        <EmblaCarouselReact>
          <div className="rb-carousel" tabIndex="0">
            {sortedImages.map((url, i) => (
              <figure key={url}>
                <img
                  crossOrigin="anonymous"
                  src={BASE_URL + url}
                  alt=""
                  onClick={() => onImageClick(url, i)}
                />
              </figure>
            ))}
            {nextProject && isDesktop() ? (
              <div className="rb-carousel-next">
                <Link to={"/" + nextProject.path}>
                  <span>Next</span>
                  <span>{nextProject.display_name}</span>
                  {arrow()}
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </EmblaCarouselReact>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        <div className={"project-footer"}>
          <h3>{name}</h3>
          <p>{details.material}</p>
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
        </div>
      </section>
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          onLightboxClick={() => setLightboxSrc(null)}
        />
      )}
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
