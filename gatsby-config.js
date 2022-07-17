// const newsletterFeed = require(`./src/utils/newsletterFeed`)
// const withDefaults = require(`./src/utils/default-options`)

module.exports =  {

  siteMetadata: {
    siteHeadline: `juneyr`,
    siteDescription: `준이어데브`,
    siteUrl: `https://juneyr.dev`,
    showLineNumbers: true,
    siteTitle: `juneyr.dev`,
    siteTitleAlt: `juneyr.dev Blog`,
    author: `juneyr`,
    siteLanguage: `KR`,
    siteImage: `/banner.png`,
    tagsPath: `/tags`,
    basePath: `/`,
    blogPath: `/blog`,
    externalLinks: [],
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
    siteTitleAlt: `juneyr.dev, 테크 블로그`,
    author: `juneyr`,
    siteLanguage: `KR`,
    siteImage: `/banner.png`,
    tagsPath: `/tags`,
    basePath: `/`,
    blogPath: `/blog`,
    externalLinks: [],
    navigation: [
      {
        title: `wiki`,
        slug: '/',
      },
      {
        title: `blog`,
        slug: `/blog`,
      },
      {
        title: `about`,
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
        resolve: "gatsby-transformer-remark",
        options: {
          plugins: [
            {
              resolve: "gatsby-remark-autolink-headers",
              options: {
                offsetY: `100`,
                icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
                className: `anchor`,
                maintainCase: true,
                removeAccents: true,
                isIconAfterHeader: true,
                elements: [`h1`, `h2`, `h3`, `h4`],
              },
            },
          ],
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
            "gatsby-remark-autolink-headers"
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
            {
              resolve: `gatsby-remark-autolink-headers`,
              // options: {
              //   offsetY: `100`,
              //   icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              //   className: `custom-class`,
              //   maintainCase: true,
              //   removeAccents: true,
              //   isIconAfterHeader: true,
              //   elements: [`h1`, `h2`, `h3`,`h4`],
              // },
            }
          ],
        },
      },
      `gatsby-plugin-twitter`,
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
