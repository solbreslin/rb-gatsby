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
