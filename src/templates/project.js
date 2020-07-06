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
  const [active, setActive] = useState(false);  

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

  const goFullscreen = (e, url) => {
    e.target.parentNode.classList.add('is-fullscreen');

    document.body.classList.add("has-fullscreen-image");
    setActive(true);
  };

  const leaveFullscreen = () => {
    const image = document.querySelector('.is-fullscreen')
    image.classList.remove('is-fullscreen');
    document.body.classList.remove("has-fullscreen-image");
    setActive(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (active) {
        leaveFullscreen();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  return (
    <Layout className="project">
      <Link to={"/work"} state={{ category }}>
        &larr; Back to {category}
      </Link>
      <h1>{title}</h1>
      <h3>{details.material}</h3>
      {images.map(url => (
        <figure
          key={url}
          onClick={(e) => {
            goFullscreen(e, url);
          }}
        >
          <img src={url} alt="" />
        </figure>
      ))}
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
