import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Card from "../components/card";
import SEO from "../components/seo";

import homeJSON from "../../content/home.json";

class IndexPage extends React.Component {
  render = () => {
    const { data } = this.props;
    const heroImages = data.allCloudinaryMedia.edges;
    const cards = data.site.siteMetadata.menuLinks.map((link, index) => {
      return (
        <Card
          key={link.name + "-" + index}
          link={link.link}
          name={link.name}
        ></Card>
      );
    });

    return (
      <Layout>
        <SEO title="Home" />
        <Hero
          heroImages={heroImages}
          title={homeJSON.hero.title}
          subtitle={homeJSON.hero.subtitle}
        />
        {cards}
        {/* <Link to="/page-2/">Go to page 2</Link> */}
      </Layout>
    );
  };
}

export const pageQuery = graphql`
  query {
    allCloudinaryMedia(filter: { public_id: { regex: "/HOMEPAGE/" } }) {
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
