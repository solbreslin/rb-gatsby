import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

// import Lightbox from "../components/lightbox";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

const mapImagesToProject = (imageData, pagePath) => {
  const projectImages = [];

  imageData.forEach(obj => {
    const project = obj.node.public_id.split("/")[3];

    if (project === pagePath) {
      projectImages.push(BASE_URL + obj.node.public_id);
    }
  });

  return projectImages;
};

export default ({ data }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageData = data.allCloudinaryMedia.edges;
  const path = data.allSitePage.edges[0].node.context.pagePath;

  const images = mapImagesToProject(imageData, path);
  const title = data.allSitePage.edges[0].node.context.name;
  const details = data.allSitePage.edges[0].node.context.details;

  // Annoying issue with createPages not updating context data
  // Temporary workaround to grab the project category and pass to back button
  const strArray = images[0].split("/");
  const workIndex = strArray.indexOf("WORK");
  const category = strArray[workIndex + 1].toLowerCase();

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

    console.log(diffY);

    console.log(el.getBoundingClientRect());
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
        <h1>{title}</h1>
        <h3>{details.material}</h3>
        {images.map(url => (
          <figure
            key={url}
            onClick={e => {
              toggleFullscreen(e, url);
            }}
          >
            <img src={url} alt="" />
          </figure>
        ))}
        <footer>Next:</footer>
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
          }
        }
      }
    }
    allCloudinaryMedia {
      edges {
        node {
          height
          public_id
          width
        }
      }
    }
  }
`;
