module.exports = {
  siteMetadata: {
    title: `EntGamers`,
    description: `Una comunidad social para gamers`,
    author: `@SrJugger`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `EntGamers`,
        short_name: `EntGamers`,
        start_url: `/`,
        background_color: `#010206`,
        theme_color: `#39B94A`,
        display: `minimal-ui`
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google:[
            {
              family: "Trade Winds",
              variants: ["400"],
            },
            {
              family: "Permanent Marker",
              variants: ["400"],
            },
            {
              family: "Open Sans",
              variants: ["400", "700"],
            }
          ]
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
