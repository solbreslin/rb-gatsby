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

    const cardImages = data.allCloudinaryMedia.edges.map(item => {
      if (item.node.public_id.includes("Boxes")) {
        return item.node.public_id;
      }
    });

    const cards = data.site.siteMetadata.menuLinks.map((link, index) => {
      let imageURL = "";

      cardImages.forEach(path => {
        if (path) {
          if (path.includes(link.name)) {
            imageURL = path;
          }
        }
      });
      return (
        <Card
          key={link.name + "-" + index}
          link={link.link}
          name={link.name}
          image={imageURL}
        ></Card>
      );
    });

    const heroTitle = data.allHomeJson.edges[0].node.hero.title;
    const heroSubtitle = data.allHomeJson.edges[0].node.hero.subtitle;
    const heroBlurb = data.allDatoCmsHero.edges[0].node.heroBlurb;

    return (
      <Layout>
        <SEO title="Home" />

        <Hero
          heroImages={heroImages}
          title={heroTitle}
          subtitle={heroSubtitle}
          blurb={heroBlurb}
        />
        <section className="cards">
          <h1>Selected Work</h1>
          {cards}
        </section>
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
    allDatoCmsHero {
      edges {
        node {
          heroBlurb
        }
      }
    }
  }
`;

export default IndexPage;
