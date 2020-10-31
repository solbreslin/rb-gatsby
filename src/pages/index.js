import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Carousel from "../components/home-carousel";
import SEO from "../components/seo";
import WorkPreview from "../components/work-preview";
import styled, { css } from "styled-components";
class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.carouselData = this.getCarouselData(props.data.allWorkJson.edges);
    this.workPreviewData = this.getWorkPreviewData(
      props.data.allWorkJson.edges
    );
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

  getWorkPreviewData = data => {
    return data.map(d => {
      const { path, display_name, items } = d.node;

      const images = [];
      items.forEach((item, index) => {
        const { path, display_name, primary_image, display_on_home } = item;

        if (display_on_home) {
          images.push({
            path,
            display_name,
            primary_image,
          });
        }
      });

      return {
        path,
        display_name,
        images,
      };
    });
  };

  render = () => {
    return (
      <Layout className="index">
        <SEO title="Home" />
        <Carousel data={this.carouselData} />
        <WorkPreview data={this.workPreviewData} />
        <AboutPreview
          dangerouslySetInnerHTML={{
            __html: this.props.data.allAboutJson.edges[0].node.content,
          }}
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
          items {
            path
            display_name
            primary_image
            display_on_home
          }
        }
      }
    }
    allAboutJson {
      edges {
        node {
          content
        }
      }
    }
  }
`;

export default IndexPage;

const AboutPreview = styled.section`
  p {
    font-size: 1.333rem;
    max-width: 70ch;
  }
`;
