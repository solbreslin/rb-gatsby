import React, { useEffect, useCallback, useState } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { graphql, Link } from "gatsby";

// Uncomment both import statements to process color
// import ColorThief from "./../../node_modules/colorthief/dist/color-thief";
// import { RGBToHSL } from "../utils/rgb2hsl";
// const PROCESS_COLOR = true;

const workJSON = require("../../content/work.json");
const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

export default ({ location, data }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: false });
  const [uiShow, toggleUiShow] = useState(true);
  console.log(location);
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

  useEffect(() => {
    if (embla) {
      // Embla API is ready
    }
  }, [embla]);

  const onSlideClick = useCallback(
    slideIndex => () => {
      if (embla && embla.clickAllowed()) {
        console.log(slideIndex);
        toggleUiShow(uiShow => !uiShow);
      }
    },
    [embla]
  );

  // if (PROCESS_COLOR) {
  //   const colorThief = new ColorThief();

  //   const img = document.querySelector(".is-selected > img");
  //   if (img) {
  //     if (img.complete) {
  //       const color = colorThief.getColor(img);
  //       RGBToHSL(color[0], color[1], color[2]);
  //     } else {
  //       img.addEventListener("load", function() {
  //         const color = colorThief.getColor(img);
  //         RGBToHSL(color[0], color[1], color[2]);
  //       });
  //     }
  //   }
  // }

  const getHSL = () => {
    const [h, s] = bgColor;
    const l = 20;

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

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

  return (
    <section className="project" style={{ "--project-bg-color": getHSL() }}>
      <header className={uiShow ? "is-active" : ""}>
        <Link to={"/" + projectCategory}>
          {arrow("left")} <span>{projectCategory}</span>
        </Link>
        <h1 className="visually-hidden">{name}</h1>
      </header>
      <EmblaCarouselReact>
        <div className="rb-carousel">
          {sortedImages.map((url, i) => (
            <figure key={url} onClick={onSlideClick(i)}>
              <img crossOrigin="anonymous" src={BASE_URL + url} alt="" />
            </figure>
          ))}
          {nextProject ? (
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
      <footer className={uiShow ? "is-active" : ""}>
        <h3>{name}</h3>
        <p>{details.material}</p>
        {previousProject ? (
          <Link hidden to={"/" + previousProject.path}>
            Previous: {previousProject.display_name}
          </Link>
        ) : (
          ""
        )}
        {nextProject ? (
          <Link hidden to={"/" + nextProject.path}>
            Next: {nextProject.display_name}
          </Link>
        ) : (
          ""
        )}
      </footer>
    </section>
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
