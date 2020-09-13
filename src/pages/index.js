import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Carousel from "../components/home-carousel";
import SEO from "../components/seo";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.getCarouselImages(props.data.allWorkJson.edges);
  }

  getCarouselImages = data => {
    this.carouselImages = data.map(d => {
      return d.node.carousel_image;
    });
  };

  render = () => {
    return (
      <Layout className="index">
        <SEO title="Home" />
        <Carousel images={this.carouselImages} />
      </Layout>
    );
  };
}

export const pageQuery = graphql`
  query {
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
          title
          subtitle
        }
      }
    }
    allWorkJson {
      edges {
        node {
          carousel_image
        }
      }
    }
  }
`;

export default IndexPage;
