import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import Gallery from "../components/gallery";
import { startCase } from "lodash";

const getImagePaths = (data, name) => {
  const test = str => {
    str = str.toLowerCase();
    return str.indexOf(`/${name}/`) > -1;
  };

  return data.filter(n => test(n.node.public_id)).map(n => n.node.public_id);
};

export default ({ data }) => {
  const category = data.allSitePage.edges[0].node.context;
  const imagePaths = getImagePaths(
    data.allCloudinaryMedia.edges,
    category.name
  );
  const pageTitle = startCase(category.name);

  return (
    <Layout>
      <section className="gallery-wrapper">
        {/* <h1>{pageTitle}</h1> */}
        <Gallery imagePaths={imagePaths} projectData={category.items}></Gallery>
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
            items {
              path
              display_name
              details {
                material
              }
            }
            name
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
