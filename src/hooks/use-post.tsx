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

const usePosts = () => {
  const data = useStaticQuery<Props>(graphql`
  query {
    posts: allPost(sort: { fields: date, order: DESC }, filter: {layout: {ne: "wiki"}}) {
      nodes {
        slug
        title
        date(formatString: "YYYY년, MM월 DD일")
        updated(formatString: "YYYY-MM-DD HH시 mm분")
        excerpt
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

export default usePosts