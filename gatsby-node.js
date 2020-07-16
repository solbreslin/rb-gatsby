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
      },
    });

    items.forEach(project => {
      const path = project.path;
      const name = project.display_name;
      const details = project.details;

      createPage({
        path,
        component: projectTemplate,
        context: {
          pagePath: path,
          name,
          details,
          categoryName,
        },
      });
    });
  });
};
