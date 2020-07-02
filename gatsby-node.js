const path = require("path");
const workJSON = require("./content/work.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const projectTemplate = path.resolve("./src/templates/project.js");

  workJSON.forEach(category => {
    const categoryName = category.name;
    const items = category.items;

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
