import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import { shuffle } from "lodash";
// import GalleryUI from "./../components/gallery/ui";
import Gallery from "../components/gallery";
const workJSON = require("../../content/work.json");

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_300/";

class WorkPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCategory: "all",
      galleryItems: [],
      categories: [],
      layout: "grid",
      loading: true,
    };

    this.setCategory = this.setCategory.bind(this);
    this.setLayout = this.setLayout.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.mapURLtoCategory();
    this.generateGalleryItems();
  }

  getCategories() {
    const categories = [];
    categories.push("all");

    workJSON.forEach(cat => {
      categories.push(cat.name);
    });

    this.quickCategories = categories;

    this.setState({
      categories: categories,
    });
  }

  mapURLtoCategory() {
    const { data } = this.props;
    const edges = data.allCloudinaryMedia.edges;

    this.mappings = {};

    edges.forEach(obj => {
      const url = obj.node.public_id;

      let category = url.split("/")[2].toLowerCase();

      if (this.quickCategories.includes(category)) {
        if (!this.mappings[category]) {
          this.mappings[category] = [];
        }
        this.mappings[category].push(url);
      }
    });
  }

  generateGalleryItems() {
    let items = [];

    workJSON.forEach(cat => {
      cat.items.forEach(project => {
        const category = cat.name;
        const name = project.display_name;
        const path = project.path;
        const details = project.details;

        const imageURLs = this.getProjectImages(category, path);

        items.push({
          category,
          name,
          path,
          details,
          imageURLs,
        });
      });
    });

    items = shuffle(items);
    console.log("update");
    this.setState({
      galleryItems: items,
    });
  }

  getProjectImages(category, path) {
    const urls = [];

    this.mappings[category].forEach(url => {
      const projectString = url.split("/")[3];

      if (path === projectString) {
        urls.push(BASE_URL + url);
      }
    });

    return urls;
  }

  setCategory(category) {
    this.setState({
      displayCategory: category,
    });
  }

  setLayout(layout) {
    this.setState({
      layout: layout,
    });
  }

  render = () => {
    return (
      <Layout>
        <SEO title="Work" />
        {/* <h1>Selected Work</h1> */}
        <div>
          <Gallery></Gallery>
          {/* <GalleryUI
            setCategory={this.setCategory}
            setLayout={this.setLayout}
            state={this.state}
          ></GalleryUI> */}
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
