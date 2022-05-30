import { graphql, useStaticQuery } from "gatsby"

type Props = {
  site: {
    siteMetadata: {
      siteTitle: string
      siteTitleAlt: string
      siteHeadline: string
      siteUrl: string
      siteDescription: string
      siteLanguage: string
      siteImage: string
      author: string
      tagsPath: string
      basePath: string
      blogPath: string
      showLineNumbers: boolean
    }
  }
}

const useSiteMetadata = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteLanguage
          siteImage
          author
          tagsPath
          basePath
          blogPath
          showLineNumbers
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
