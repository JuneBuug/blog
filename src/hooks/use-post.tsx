import { graphql, useStaticQuery } from "gatsby"

type Props = {
  posts: {
    nodes: {
      slug: string
      title: string
      date: string
      excerpt: string
      description: string
      timeToRead: number
      tags?: {
        name: string
        slug: string
      }[]
    }[]
  }
}

const usePosts = () => {
  const data = useStaticQuery<Props>(graphql`
  query {
    posts: allPost(sort: { date: DESC }, filter: {layout: {ne: "wiki"}}) {
      nodes {
        slug
        title
        date(formatString: "YYYY.MM.DD")
        updated(formatString: "YYYY-MM-DD HH시 mm분")
        excerpt
        description
        timeToRead
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

export default usePosts
