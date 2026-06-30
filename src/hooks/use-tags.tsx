import { graphql, useStaticQuery } from "gatsby"

type PostsProps = {
  list: {
    fieldValue: string
    totalCount: number
  }[]
}

const useTags = () => {
  const data = useStaticQuery<PostsProps>(graphql`
  query {
    list: allPost(sort: { tags: { name: DESC } }) {
      group(field: { tags: { name: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`)

  return data.list.group
}

export default useTags