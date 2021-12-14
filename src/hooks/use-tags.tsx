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
    list: allPost(sort: { fields: tags___name, order: DESC }) {
      group(field: tags___name) {
        fieldValue
        totalCount
      }
    }
  }
`)

  return data.list.group
}

export default useTags