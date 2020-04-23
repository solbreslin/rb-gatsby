import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import Gallery from "../components/gallery";

const getImagePaths = (data, name) => {
  const test = str => {
    str = str.toLowerCase();
    return str.indexOf(`/${name}/`) > -1;
  };

  return data.filter(n => test(n.node.public_id)).map(n => n.node.public_id);
};

export default ({ data }) => {
  const item = data.allSitePage.edges[0].node.context;
  const imagePaths = getImagePaths(data.allCloudinaryMedia.edges, item.name);

  return (
    <Layout>
      <h1>{item.name}</h1>
      <Gallery imagePaths={imagePaths}></Gallery>
    </Layout>
  );
};

export const query = graphql`
  query($path: String!) {
    allSitePage(filter: { path: { eq: $path } }) {
      edges {
        node {
          context {
            name
            items
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
