import { shuffle } from "lodash";

const workJSON = require("../../content/work.json");

export const getWorkCategories = data => {
  if (!data) {
    console.error("Data not found");
    return;
  }

  const categories = [];

  for (const entry of data) {
    if (entry.name) {
      categories.push(entry.name);
    }
  }

  return categories;
};

export const mapCloudinaryURLToWorkCategory = (cloudinaryData, categories) => {
  if (!cloudinaryData) return;

  const mappings = {};

  cloudinaryData.forEach(obj => {
    const url = obj.node && obj.node.public_id ? obj.node.public_id : null;

    if (url) {
      let category = url.split("/")[2];

      if (category) {
        category = category.toLowerCase();

        if (categories.includes(category)) {
          if (!mappings[category]) {
            mappings[category] = [];
          }

          mappings[category].push(url);
        }
      }
    }
  });

  return mappings;
};

export const mapCloudinaryURLToCategory = (cloudinaryData, category) => {
  return cloudinaryData
    .filter(entry => {
      const urlPart = entry.node.public_id.split("/")[2].toLowerCase();
      return urlPart === category;
    })
    .map(entry => entry.node.public_id);
};

export const mapImagesToProject = imagePaths => {
  const projectImages = {};

  imagePaths.forEach(path => {
    const project = path.split("/")[3];

    if (projectImages[project]) {
      projectImages[project].push(path);
    } else {
      projectImages[project] = [path];
    }
  });

  return projectImages;
};

export const generateGalleryItems = (projectImages, category) => {
  let items = [];

  const [categoryData] = workJSON.filter(entry => entry.path === category);

  categoryData.items.forEach(project => {
    const { path, details, display_name } = project;
    const imageURLs = projectImages[path];

    items.push({
      title: display_name,
      path,
      details,
      imageURLs,
    });
  });

  items.forEach((item, index) => {
    item.next = items[index + 1] || null;
  });

  return shuffle(items);
};
