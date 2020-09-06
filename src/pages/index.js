import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Carousel from "../components/home-carousel";
import SEO from "../components/seo";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.carouselImages = props.data.allHomeJson.edges[0].node.carousel.images;
    console.log('images', this.carouselImages)
  }

  componentDidMount() {
    document.body.classList.add("index");
  }

  componentWillUnmount() {
    document.body.classList.remove("index");
  }

  render = () => {
    return (
      <Layout className="index">
        <SEO title="Home" />

        <Carousel
          images={this.carouselImages}
        />
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
          image
        }
      }
    }
    allHomeJson {
      edges {
        node {
          hero {
            title
            subtitle
            image
          }
          carousel {
            images
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
