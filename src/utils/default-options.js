module.exports = () => {
  const basePath = `/`
  const blogPath = `/blog`
  const postsPath = `content/wiki`
  const pagesPath = `content/pages`
  const tagsPath = `/tags`
  const externalLinks = []
  const navigation = []
  const showLineNumbers = true
  const formatString = `DD.MM.YYYY`

  return {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    navigation,
    showLineNumbers,
    formatString,
  }
}
