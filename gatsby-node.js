const path = require("path");
const workJSON = require("./content/work.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const projectTemplate = path.resolve("./src/templates/project.js");
  const categoryTemplate = path.resolve("./src/templates/category.js");

  workJSON.forEach(category => {
    const categoryName = category.name;
    const items = category.items;

    createPage({
      path: category.path,
      component: categoryTemplate,
      context: {
        name: categoryName,
        title: category.display_name,
      },
    });

    items.forEach(project => {
      const path = project.path;
      const name = project.display_name;
      const details = project.details;
      const images = project.images;
      const bgColor = project.bg_color;
      const primaryImage = project.primary_image;

      createPage({
        path,
        component: projectTemplate,
        context: {
          pagePath: path,
          name,
          details,
          categoryName,
          images,
          bgColor,
          primaryImage,
        },
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: { rules: [{ test: /node_modules\/paper/, use: loaders.null() }] },
    });
  }
};
