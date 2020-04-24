import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto,w_600/";

const mapImagesToProject = (imagePaths, pagePath) => {
  const projectImages = [];

  imagePaths.forEach(path => {
    const project = path.node.public_id.split("/")[3];

    if (project === pagePath) {
      projectImages.push(path.node.public_id);
    }
  });

  return projectImages;
};

export default ({ data }) => {
  const imagePaths = data.allCloudinaryMedia.edges;
  const path = data.allSitePage.edges[0].node.context.pagePath;

  const projectImages = mapImagesToProject(imagePaths, path);
  const pageTitle = data.allSitePage.edges[0].node.context.name;

  const images = projectImages.map((n, i) => <img alt={path} src={BASE_URL + n} />);

  return (
    <Layout>
      <h1>{pageTitle}</h1>
      {images}
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
          public_id
        }
      }
    }
  }
`;
