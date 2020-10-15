// const newsletterFeed = require(`./src/utils/newsletterFeed`)
// const withDefaults = require(`./src/utils/default-options`)

module.exports =  {

  siteMetadata: {
    siteHeadline: `juneyr`,
    siteDescription: `준이어데브`,
    siteUrl: `https://juneyr.dev`,
    showLineNumbers: false,
    siteTitle: `juneyr.dev`,
    siteTitleAlt: `juneyr.dev Blog`,
    author: `juneyr`,
    siteLanguage: `KR`,
    siteImage: `/banner.png`,
    tagsPath: `/tags`,
    basePath: `/`,
    blogPath: `/blog`,
    externalLinks: [
      {
        name: `Twitter`,
        url: `https://twitter.com/juneyr_`,
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
    siteImage: `/banner.png`,
    tagsPath: `/tags`,
    basePath: `/`,
    blogPath: `/blog`,
    externalLinks: [
      {
        name: `Twitter`,
        url: `https://twitter.com/juneyr_`,
      },
    ],
    navigation: [
      {
        title: `Wiki`,
        slug: '/',
      },
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
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-typescript`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-theme-ui`,
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: `UA-106956887-1`,
        },
      },
      `gatsby-plugin-sitemap`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `juneyr_dev tech blog`,
          short_name: `juneyr-dev`,
          description: `준이어데브 테크 블로그`,
          start_url: `/`,
          background_color: `#fff`,
          theme_color: `#6B46C1`,
          display: `standalone`,
          icons: [
            {
              src: `/apple-touch-icon.png`,
              sizes: `192x192`,
              type: `image/png`,
            },
          ],
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
          {
            site {
              siteMetadata {
                siteTitle
                siteDescription
                siteUrl
              }
            }
          }
        `,
          feeds: [
            {
              serialize: ({ query: { site, allPost } }) => {
                return allPost.nodes.map(node => {
                  return Object.assign({}, node.frontmatter, {
                    title: node.title,
                    description: node.excerpt,
                    date: node.date,
                    url: site.siteMetadata.siteUrl + node.slug,
                    guid: site.siteMetadata.siteUrl + node.slug,
                    custom_elements: [{ "content:encoded": node.html }],
                  })
                })
              },
              query: `
              {
              allPost(sort: { fields: date, order: DESC }, filter: {layout: {ne: "wiki"}}) {
                nodes {
                  slug
                  title
                  layout
                  date(formatString: "YYYY.MM.DD")
                  excerpt
                  description
                  tags {
                    name
                    slug
                  }
                }
              }
            }
            `,
              output: "/feed.xml",
              title: "Juneyr.dev RSS Feed",
              // optional configuration to insert feed reference in pages:
              // if `string` is used, it will be used to create RegExp and then test if pathname of
              // current page satisfied this regular expression;
              // if not provided or `undefined`, all pages will have feed reference inserted
              match: "^/",
              // optional configuration to specify external rss feed, such as feedburner
              link: "https://feeds.feedburner.com/gatsby/blog",
            },
          ],
        }
      }
      // `gatsby-plugin-offline`,
      // `gatsby-plugin-netlify`,
    ],
}
