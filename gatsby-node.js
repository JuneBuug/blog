const fs = require(`fs`)
const kebabCase = require(`lodash.kebabcase`)
const path = require(`path`)
const withDefaults = require(`./src/utils/default-options`)

const stripMdx = str => str
  .replace(/---[\s\S]*?---/, ``)
  .replace(/import\s.*?from\s.*?\n/g, ``)
  .replace(/export\s.*?\n/g, ``)
  .replace(/[#*`>[\]!]/g, ``)
  .replace(/\(.*?\)/g, ``)
  .replace(/\s+/g, ` `)
  .trim()

exports.onPreBootstrap = ({ reporter, store }, themeOptions) => {
  const { program } = store.getState()
  const { postsPath, pagesPath } = withDefaults(themeOptions)
  const dirs = [path.join(program.directory, postsPath), path.join(program.directory, pagesPath)]
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`Initializing "${dir}" directory`)
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    interface Post implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      updated: Date @dateformat
      layout: String
      excerpt: String!
      contentFilePath: String!
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }
    type PostTag {
      name: String
      slug: String
    }
    interface Page implements Node {
      id: ID!
      slug: String!
      title: String!
      excerpt: String!
      contentFilePath: String!
    }
    type MdxPost implements Node & Post {
      slug: String!
      title: String!
      date: Date! @dateformat
      updated: Date @dateformat
      layout: String
      excerpt: String!
      contentFilePath: String!
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }
    type MdxPage implements Node & Page {
      slug: String!
      title: String!
      excerpt: String!
      contentFilePath: String!
    }
    type MinimalBlogConfig implements Node {
      basePath: String
      blogPath: String
      postsPath: String
      pagesPath: String
      tagsPath: String
      externalLinks: [ExternalLink]
      navigation: [NavigationEntry]
      showLineNumbers: Boolean
      showCopyButton: Boolean
    }
    type ExternalLink {
      name: String!
      url: String!
    }
    type NavigationEntry {
      title: String!
      slug: String!
    }
  `)
}

exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions
  const {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    navigation,
    showLineNumbers,
  } = withDefaults(themeOptions)

  const minimalBlogConfig = {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    navigation,
    showLineNumbers,
  }

  createNode({
    ...minimalBlogConfig,
    id: `@lekoarts/gatsby-theme-minimal-blog-core-config`,
    parent: null,
    children: [],
    internal: {
      type: `MinimalBlogConfig`,
      contentDigest: createContentDigest(minimalBlogConfig),
      content: JSON.stringify(minimalBlogConfig),
      description: `Options for @lekoarts/gatsby-theme-minimal-blog-core`,
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createParentChildLink } = actions
  const { postsPath, pagesPath, basePath } = withDefaults(themeOptions)

  if (node.internal.type !== `Mdx`) {
    return
  }

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (source === postsPath) {
    let modifiedTags
    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map(tag => ({
        name: tag,
        slug: kebabCase(tag),
      }))
    } else {
      modifiedTags = null
    }

    const rawSlug = node.frontmatter.slug ? node.frontmatter.slug : kebabCase(node.frontmatter.title)
    const slug = `/${basePath}/${rawSlug}`.replace(/\/\/+/g, `/`)

    const rawText = stripMdx(node.body || node.internal.content || ``)
    const excerpt = node.frontmatter.description || rawText.slice(0, 200) || ``

    const fieldData = {
      slug,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      updated: node.frontmatter.updated,
      layout: node.frontmatter.layout,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      canonicalUrl: node.frontmatter.canonicalUrl,
      contentFilePath: fileNode.absolutePath,
      excerpt,
    }

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`)
    createNode({
      ...fieldData,
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxPostId) })
  }

  if (source === pagesPath) {
    const rawText = stripMdx(node.body || node.internal.content || ``)
    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
      excerpt: rawText.slice(0, 200) || ``,
      contentFilePath: fileNode.absolutePath,
    }

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`)
    createNode({
      ...fieldData,
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxPageId) })
  }
}

const homepageTemplate = require.resolve(`./src/templates/homepage-query.tsx`)
const blogTemplate = require.resolve(`./src/templates/blog-query.tsx`)
const postTemplate = require.resolve(`./src/templates/post-query.tsx`)
const pageTemplate = require.resolve(`./src/templates/page-query.tsx`)
const tagTemplate = require.resolve(`./src/components/tag.tsx`)
const tagsTemplate = require.resolve(`./src/templates/tags-query.tsx`)

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath, blogPath, tagsPath, formatString } = withDefaults(themeOptions)

  createPage({
    path: basePath,
    component: homepageTemplate,
    context: { formatString },
  })

  createPage({
    path: `/${basePath}/${blogPath}`.replace(/\/\/+/g, `/`),
    component: blogTemplate,
    context: { formatString },
  })

  createPage({
    path: `/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`),
    component: tagsTemplate,
  })

  const result = await graphql(`
    query {
      allPost(sort: { date: DESC }) {
        nodes {
          slug
          contentFilePath
        }
      }
      allPage {
        nodes {
          slug
          contentFilePath
        }
      }
      tags: allPost(sort: { tags: { name: DESC } }) {
        group(field: { tags: { name: SELECT } }) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
    return
  }

  const posts = result.data.allPost.nodes
  posts.forEach(post => {
    createPage({
      path: post.slug,
      component: `${postTemplate}?__contentFilePath=${post.contentFilePath}`,
      context: { slug: post.slug, formatString },
    })
  })

  const pages = result.data.allPage.nodes
  if (pages.length > 0) {
    pages.forEach(page => {
      createPage({
        path: `/${basePath}/${page.slug}`.replace(/\/\/+/g, `/`),
        component: `${pageTemplate}?__contentFilePath=${page.contentFilePath}`,
        context: { slug: page.slug },
      })
    })
  }

  const tags = result.data.tags.group
  if (tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(/\/\/+/g, `/`),
        component: tagTemplate,
        context: {
          slug: kebabCase(tag.fieldValue),
          name: tag.fieldValue,
          formatString,
        },
      })
    })
  }
}
