import { graphql, useStaticQuery } from "gatsby"

type Props = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    tags?: {
      name: string
      slug: string
    }[]
  }[]
}

const useHomePage = () => {
  const data = useStaticQuery<Props>(graphql`
  query {
    posts: allPost(sort: { updated: DESC }, limit: 40, filter: {layout: {eq: "wiki"}}) {
      nodes {
        slug
        title
        date(formatString: "YYYY.MM.DD")
        updated(formatString: "YYYY.MM.DD")
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`)

  return data.posts
}

export default useHomePage