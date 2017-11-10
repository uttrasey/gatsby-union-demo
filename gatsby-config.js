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
          accessToken: `7f1a358e5546a3760c910aeb5acb8dbf29f359561d6f4d06a6c02374e700a292`
        }
      }
  ],
}
