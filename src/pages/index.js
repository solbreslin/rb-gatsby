import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Carousel from "../components/home-carousel";
import SEO from "../components/seo";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.carouselData = this.getCarouselData(props.data.allWorkJson.edges);
  }

  getCarouselData = data => {
    return data.map(d => {
      const { carousel_image, display_name, path } = d.node;

      return {
        carousel_image,
        display_name,
        path,
      };
    });
  };

  render = () => {
    return (
      <Layout className="index">
        <SEO title="Home" />
        <Carousel data={this.carouselData} />
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
          display_name
          path
        }
      }
    }
  }
`;

export default IndexPage;
