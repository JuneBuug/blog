import { graphql } from "gatsby"
import TagsComponent from "../components/tags"

export default TagsComponent

export const query = graphql`
  query {
    allPost(sort: { tags: { name: DESC } }) {
      group(field: { tags: { name: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
