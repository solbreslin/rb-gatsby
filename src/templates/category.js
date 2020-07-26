import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import Gallery from "../components/gallery";

const workJSON = require("../../content/work.json");

// const BASE_URL =
//   "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

export default ({ data }) => {
  const category = data.allSitePage.edges[0].node.context.name;
  const [ categoryJSON ] = workJSON.filter(cat => cat.name === category);

  let galleryItems = [];

  categoryJSON.items.forEach(project => {
    const { path, details, display_name, images } = project;

    galleryItems.push({
      title: display_name,
      path,
      details,
      images,
    });
  });

  return (
    <Layout className="category">
      <SEO title={category} />
      <section>
        <h1>{category} Work</h1>
        <Gallery items={galleryItems}></Gallery>
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
            name
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
