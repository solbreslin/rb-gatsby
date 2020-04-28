const path = require("path");
const workJSON = require("./content/work.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const categoryTemplate = path.resolve("./src/templates/category.js");
  const projectTemplate = path.resolve("./src/templates/project.js");

  workJSON.forEach(category => {
    const path = category.path;
    const name = category.name;
    const items = category.items;

    createPage({
      path,
      component: categoryTemplate,
      context: {
        name,
        items,
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
        },
      });
    });
  });
};
