import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/";

export default ({ data }) => {
  console.log(data);

  return <Layout className="category">Hi there</Layout>;
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
