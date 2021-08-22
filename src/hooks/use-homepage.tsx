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
    posts: allPost(sort: { fields: updated, order: DESC }, limit: 40, filter: {layout: {eq: "wiki"}}) {
      nodes {
        slug
        title
        date(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY년, MM월 DD일")
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