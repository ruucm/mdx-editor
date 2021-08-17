const path = require("path")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Website Template 04",
    titleTemplate: "%s · Website Template 04",
    description: "description",
    // siteUrl: "",
    // image: "",
    // twitterUsername: "",
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-171020297-1",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [`**/*.(comp).(js|ts)?(x)`, `**/styled-components.(js|ts)?(x)`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdx-pages`,
        path: `${__dirname}/mdx-pages`,
      },
    },
    {
      // gatsby-transformer-remark plugin for mdx
      resolve: `gatsby-plugin-mdx`,
      options: {
        // Apply gatsby-mdx to both .mdx and .md files
        extensions: [".mdx", ".md"],
        options: {
          // https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/#configuring-the-tableofcontents
          tableOfContents: {
            // heading: "Section", // not working
            maxDepth: 6,
          },
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              quality: 80,
              maxWidth: 1200,
              linkImagesToOriginal: false,
              withAvif: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg aria-hidden="true" width="100" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              elements: [`h1`],
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0
            },
          },
        ],
      },
    },
    `gatsby-remark-reading-time`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `website-template-04`,
        short_name: `website-template-04`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          react: path.resolve("./node_modules/react"),
          "styletron-react": path.resolve("./node_modules/styletron-react"),
        },
        extensions: [],
      },
    },
    {
      // it replace the StyletronProvider
      resolve: `gatsby-plugin-styletron`,
      options: {
        // You can pass options to Styletron.
        prefix: "_",
        debug: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-intl-with-root`,
    //   options: {
    //     // language JSON resource path
    //     path: `${__dirname}/src/assets/intl`,
    //     // supported language
    //     languages: [`en`, `ko`],
    //     // language file path
    //     defaultLanguage: `en`,
    //     // automatic redirection based on the user's preferred language in browser provided by browser-lang.
    //     redirect: true,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
