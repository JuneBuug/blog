const newsletterFeed = require(`./src/utils/newsletterFeed`)
const withDefaults = require(`./src/utils/default-options`)

module.exports =  {
  //const options = withDefaults()
  // const { feed = true, feedTitle = `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog` } = options
  //const { mdx = true } = themeOptions

  siteMetadata: {
    siteHeadline: `juneyr`,
    siteDescription: `준이어데브`,
    siteUrl: `https://juneyr.dev`,
    showLineNumbers: false,
    siteTitle: `juneyr.dev`,
    siteTitleAlt: `juneyr.dev Blog`,
    author: `juneyr`,
    siteLanguage: `KR`,
    siteImage: `/banner.jpg`,
    tagsPath: `/tags`,
    basePath: `/`,
    blogPath: `/blog`,
    externalLinks: [
      {
        name: `Twitter`,
        url: `https://twitter.com/juneyr_`,
      },
      {
        name: `Instagram`,
        url: `https://instagram.com/juneyr_dev`,
      }
    ],
    navigation: [
      {
        title: `Blog`,
        slug: `/`,
      },
      {
        title: `About`,
        slug: `/about`,
      },
    ],
  },
  siteMetadata: {
    siteHeadline: `juneyr`,
    siteDescription: `준이어데브`,
    siteUrl: `https://juneyr.dev`,
    showLineNumbers: false,
    siteTitle: `juneyr.dev`,
    siteTitleAlt: `juneyr.dev Blog`,
    author: `juneyr`,
    siteLanguage: `KR`,
    siteImage: `/banner.jpg`,
    tagsPath: `/tags`,
    basePath: `/`,
    blogPath: `/blog`,
    externalLinks: [
      {
        name: `Twitter`,
        url: `https://twitter.com/juneyr_`,
      },
      {
        name: `Instagram`,
        url: `https://instagram.com/juneyr_dev`,
      }
    ],
    navigation: [
      {
        title: `Blog`,
        slug: `/blog`,
      },
      {
        title: `About`,
        slug: `/about`,
      },
    ],
  },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content/wiki`,
          path: `content/wiki`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content/pages`,
          path: `content/pages`,
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false,
              },
            },
          ],
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false,
              },
            },
          ],
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-typescript`,
      {
        resolve: `gatsby-plugin-feed`,
        options: newsletterFeed("juneyr"),
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-theme-ui`,
      // {
      //   resolve: `gatsby-plugin-google-analytics`,
      //   options: {
      //     trackingId: `UA-106956887-1`,
      //   },
      // },
      // `gatsby-plugin-sitemap`,
      // {
      //   resolve: `gatsby-plugin-manifest`,
      //   options: {
      //     name: `juneyr_dev tech blog`,
      //     short_name: `juneyr-dev`,
      //     description: `준이어데브 테크 블로그`,
      //     start_url: `/`,
      //     background_color: `#fff`,
      //     theme_color: `#6B46C1`,
      //     display: `standalone`,
      //     icons: [
      //       {
      //         src: `/apple-touch-icon.png`,
      //         sizes: `192x192`,
      //         type: `image/png`,
      //       },
      //     ],
      //   },
      // },
      // `gatsby-plugin-offline`,
      // `gatsby-plugin-netlify`,
    ],
}
