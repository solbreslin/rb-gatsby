import React from "react";
import Layout from "../components/layout";

export default ({ data }) => {
  const item = data.allSitePage.edges[0].node.context;
  return (
    <Layout>
      <h1>{item.name}</h1>
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
  }
`;
