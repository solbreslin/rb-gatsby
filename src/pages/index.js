import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import Hero from "../components/hero";
import Card from "../components/card";
import SEO from "../components/seo";

class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const heroImages = data.allCloudinaryMedia.edges;
    const cards = data.site.siteMetadata.menuLinks.map(link => {
      return <Card link={link.link} name={link.name}></Card>;
    });

    return (
      <Layout>
        <SEO title="Home" />
        <Hero heroImages={heroImages} />
        {cards}
        {/* <Link to="/page-2/">Go to page 2</Link> */}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    allCloudinaryMedia(filter: { public_id: { regex: "/HERO/" } }) {
      edges {
        node {
          public_id
        }
      }
    }
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
  }
`;

export default IndexPage;
