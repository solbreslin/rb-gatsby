import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import Lightbox from "../components/lightbox";

const mapImagesToProject = (imageData, pagePath) => {
  const projectImages = [];

  imageData.forEach(obj => {
    const project = obj.node.public_id.split("/")[3];

    if (project === pagePath) {
      projectImages.push({
        height: obj.node.height,
        url: obj.node.public_id,
        width: obj.node.width 
      });
    }
  });

  return projectImages;
};

export default ({ data }) => {
  const imageData = data.allCloudinaryMedia.edges;
  const path = data.allSitePage.edges[0].node.context.pagePath;

  const projectImages = mapImagesToProject(imageData, path);
  const pageTitle = data.allSitePage.edges[0].node.context.name;

  return (
    <Layout>
      <Lightbox title={pageTitle} images={projectImages}></Lightbox>
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
