import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Card from "../components/card";
import SEO from "../components/seo";

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

    const heroTitle = data.allHomeJson.edges[0].node.hero.title;
    const heroSubtitle = data.allHomeJson.edges[0].node.hero.subtitle;

    return (
      <Layout>
        <SEO title="Home" />

        <Hero
          heroImages={heroImages}
          title={heroTitle}
          subtitle={heroSubtitle}
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
    allHomeJson {
      edges {
        node {
          hero {
            title
            subtitle
          }
        }
      }
    }
  }
`;

export default IndexPage;
