require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Rory Breslin`,
    description: `Rory Breslin is a leading designer and producer of bronze figurative and portrait sculpture in Ireland`,
    author: `Sol Breslin`,
    menuLinks: [
      {
        name: "exhibition",
        link: "/exhibition",
        image: "r-breslin-cloudinary/HOMEPAGE/Boxes/exhibition_tnz3lz"
      },
      {
        name: "masks",
        link: "/masks",
        image: "r-breslin-cloudinary/HOMEPAGE/Boxes/masks_xo0ojk"
      },
      {
        name: "portrait",
        link: "/portrait",
        image: "r-breslin-cloudinary/HOMEPAGE/Boxes/portrait_zlgiad"
      },
      {
        name: "public",
        link: "/public",
        image: "r-breslin-cloudinary/HOMEPAGE/Boxes/public_k6unkl"
      }
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        maxResults: 500,
        tags: true,
        prefix: `r-breslin-cloudinary/`,
        context: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
