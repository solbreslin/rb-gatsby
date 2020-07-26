import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
const workJSON = require("../../content/work.json");
const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

export default ({ data }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    name,
    details,
    images,
    pagePath,
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

  const translateImage = (el, reset = false) => {
    if (reset) {
      el.style.setProperty("--translate-x", "0px");
      el.style.setProperty("--translate-y", "0px");

      return;
    }

    const x = 100;
    const y = 100;

    const targetTop = 63; // padding
    const currentTop = el.getBoundingClientRect().top;

    let diffY = 0;

    if (currentTop >= targetTop) {
      diffY = (currentTop - targetTop) * -1;
    } else {
      diffY = targetTop - currentTop;
    }

    // el.style.setProperty('--translate-x', `${x}px`);
    el.style.setProperty("--translate-y", `${diffY}px`);
  };

  const toggleFullscreen = (e, url) => {
    if (isFullscreen) {
      leaveFullscreen();
    } else {
      goFullscreen(e);
    }
  };

  const goFullscreen = (e, url) => {
    const target = e.target.tagName.toLowerCase();

    if (target === "img") {
      setIsFullscreen(true);

      const figure = e.target.parentNode;
      figure.classList.add("is-fullscreen");

      translateImage(e.target);

      document.body.classList.add("has-fullscreen-image");
    }
  };

  const leaveFullscreen = () => {
    setIsFullscreen(false);

    const el = document.querySelector(".is-fullscreen");
    el.classList.remove("is-fullscreen");

    const image = el.querySelector("img");

    translateImage(image, true);

    document.body.classList.remove("has-fullscreen-image");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isFullscreen) {
        leaveFullscreen();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFullscreen]);

  return (
    <Layout className="project">
      {/* <Link to={"/work"} state={{ category }}>
        &larr; Back to {category}
      </Link> */}
      <section>
        <h1>{name}</h1>
        <h3>{details.material}</h3>
        {images.map(url => (
          <figure
            key={url}
            onClick={e => {
              toggleFullscreen(e, url);
            }}
          >
            <img src={BASE_URL + url} alt="" />
          </figure>
        ))}
        <footer>
          {previousProject ? (
            <Link to={previousProject.path}>
              Previous: {previousProject.display_name}
            </Link>
          ) : (
            ""
          )}
          {nextProject ? (
            <Link to={nextProject.path}>Next: {nextProject.display_name}</Link>
          ) : (
            ""
          )}
        </footer>
      </section>
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
          }
        }
      }
    }
  }
`;
