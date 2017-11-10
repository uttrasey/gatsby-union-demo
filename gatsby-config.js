module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: `p9wvos6zyimj`,
          accessToken: process.env.CMS_API_KEY
        }
      }
  ],
}
