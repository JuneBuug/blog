import { graphql, useStaticQuery } from "gatsby"

type Props = {
  minimalBlogConfig: {
    basePath: string
    blogPath: string
    postsPath: string
    pagesPath: string
    tagsPath: string
    navigation: {
      title: string
      slug: string
    }[]
    showLineNumbers: boolean
  }
}

const useMinimalBlogConfig = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      minimalBlogConfig {
        basePath
        blogPath
        postsPath
        pagesPath
        tagsPath
        navigation {
          title
          slug
        }
        showLineNumbers
      }
    }
  `)

  return data.minimalBlogConfig
}

export default useMinimalBlogConfig
