import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Gallery from "../components/gallery";
import {
  getWorkCategories,
  mapCloudinaryURLToWorkCategory,
} from "./../utils/data-mapping";
import { shuffle } from "lodash";
import { get } from "lodash";

const workJSON = require("../../content/work.json");

class WorkPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleGalleryImages();
  }

  handleGalleryImages() {
    this.categories = getWorkCategories(workJSON);
    this.mappings = mapCloudinaryURLToWorkCategory(
      this.props.data.allCloudinaryMedia.edges,
      this.categories
    );

    this.galleryItems = this.generateGalleryItems();
  }

  generateGalleryItems() {
    let items = [];

    workJSON.forEach(entry => {
      entry.items.forEach(project => {
        const imageURLs = this.getProjectImages(entry.name, project.path);

        items.push({
          filter: entry.name,
          name: project.display_name,
          path: project.path,
          details: project.details,
          imageURLs,
        });
      });
    });

    return shuffle(items);
  }

  getProjectImages(category, path) {
    const urls = [];

    this.mappings[category].forEach(url => {
      const projectString = url.split("/")[3];

      if (path === projectString) {
        urls.push(url);
      }

      if (category === "masks") {
        if (path === "brian-boru-mask" && projectString === "brian-boru") {
          urls.push(url);
        }
      }

      if (category === "public") {
        if (path === "brian-boru-public" && projectString === "brian-boru") {
          urls.push(url);
        }
      }
    });

    return urls;
  }

  render = () => {
    const prefilter = get(this.props, "location.state.category", null);

    return (
      <Layout>
        <SEO title="Work" />
        <div>
          <Gallery
            items={this.galleryItems}
            categories={this.categories}
            prefilter={prefilter}
          ></Gallery>
        </div>
      </Layout>
    );
  };
}

export const query = graphql`
  query {
    allCloudinaryMedia {
      edges {
        node {
          public_id
        }
      }
    }
  }
`;

export default WorkPage;
