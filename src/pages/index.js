import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import Hero from "../components/hero";
import SEO from "../components/seo";

class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const heroImages = data.allCloudinaryMedia.edges;

    return (
      <Layout>
        <SEO title="Home" />
        <Hero heroImages={heroImages} />
        {/* <Link to="/page-2/">Go to page 2</Link> */}
      </Layout>
    );
  }
}
export default IndexPage;

export const pageQuery = graphql`
  query {
    allCloudinaryMedia(filter: { public_id: { regex: "/HERO/" } }) {
      edges {
        node {
          public_id
        }
      }
    }
  }
`;
