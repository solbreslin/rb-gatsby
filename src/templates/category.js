import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import {
  mapCloudinaryURLToCategory,
  mapImagesToProject,
  generateGalleryItems,
} from "../utils/data-mapping";
import SEO from "../components/seo";
import Gallery from "../components/gallery";

// const BASE_URL =
//   "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

export default ({ data }) => {
  const category = data.allSitePage.edges[0].node.context.name;
  const cloudinaryData = data.allCloudinaryMedia.edges;

  const imageURLs = mapCloudinaryURLToCategory(cloudinaryData, category);
  const projectImages = mapImagesToProject(imageURLs);

  const galleryItems = generateGalleryItems(projectImages, category);

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
