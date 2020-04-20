const path = require("path");
const data = require("./content/work.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const template = path.resolve("./src/templates/page.js");

  data.forEach(page => {
    const path = page.path;

    const name = page.name;
    const items = page.items;

    createPage({
      path,
      component: template,
      context: {
        name,
        items,
      },
    });
  });
};
