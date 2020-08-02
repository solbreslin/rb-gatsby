import React, { useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { graphql, Link } from "gatsby";
// import ColorThief from "./../../node_modules/colorthief/dist/color-thief";
// import { RGBToHSL } from "../utils/rgb2hsl";
const workJSON = require("../../content/work.json");
const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

export default ({ data }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: false });

  const {
    name,
    details,
    images,
    pagePath,
    bg_color,
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
      }
    },
    [embla]
  );

  // const setBackgroundColor = color => {
  //   if (color && color.length) {
  //     color = RGBToHSL(color[0], color[1], color[2]);

  //     document.documentElement.style.setProperty("--project-bg-color", color);
  //   }
  // };

  // const colorThief = new ColorThief();

  // const img = document.querySelector(".is-selected > img");

  // if (img) {
  //   if (img.complete) {
  //     const color = colorThief.getColor(img);
  //     setBackgroundColor(color);
  //   } else {
  //     img.addEventListener("load", function() {
  //       const color = colorThief.getColor(img);
  //       setBackgroundColor(color);
  //     });
  //   }
  // }

  const getHSL = () => {
    const [h, s] = bg_color;
    const l = 20;

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return (
    <section className="project" style={{ "--project-bg-color": getHSL() }}>
      <Link to={"/" + projectCategory}>Back</Link>
      <h1 className="visually-hidden">{name}</h1>
      <EmblaCarouselReact>
        <div className="rb-carousel">
          {images.map((url, i) => (
            <figure key={url} onClick={onSlideClick(i)}>
              <img crossOrigin="anonymous" src={BASE_URL + url} alt="" />
            </figure>
          ))}
        </div>
      </EmblaCarouselReact>

      <footer>
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
            bg_color
          }
        }
      }
    }
  }
`;
