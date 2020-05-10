import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Gallery from "../components/gallery";

const workJSON = require("./../../content/work.json");

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_300/";

class WorkPage extends React.Component {
  constructor(props) {
    super(props);

    this.filtersSet = false;
    this.itemsSet = false;
    this.galleryItems = [];
    this.filters = [];
  }

  getFilters() {
    if (this.filtersSet) return;

    workJSON.forEach(cat => {
      this.filters.push(cat.name);
    });

    this.filtersSet = true;
  }

  createGalleryItems() {
    if (this.itemsSet) return;

    workJSON.forEach(cat => {
      cat.items.forEach(project => {
        const filter = cat.name;
        const name = project.display_name;
        const path = project.path;
        const details = project.details;

        const imageURLs = this.getProjectImages(path);

        this.galleryItems.push({
          filter,
          name,
          path,
          details,
          imageURLs,
        });
      });
    });

    this.itemsSet = true;
  }

  getProjectImages(path) {
    const { data } = this.props;
    const edges = data.allCloudinaryMedia.edges;

    const urls = [];

    edges.forEach(obj => {
      const url = obj.node.public_id;

      const hasFilter = this.imageHasFilter(url);

      if (hasFilter) {
        const s = url.split("/")[3];

        if (path === s) {
          urls.push(BASE_URL + url);
        }
      }
    });

    return urls;
  }

  imageHasFilter(url) {
    const filter = url.split("/")[2].toLowerCase();

    return this.filters.includes(filter) ? true : false;
  }

  render = () => {
    this.getFilters();
    this.createGalleryItems();
    return (
      <Layout>
        <SEO title="Work" />
        <h1>Selected Work</h1>
        <Gallery items={this.galleryItems} filters={this.filters}></Gallery>
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
