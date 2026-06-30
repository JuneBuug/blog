import { graphql } from "gatsby"
import TagComponent from "../components/tag"

export default TagComponent

export const query = graphql`
  query($slug: String!) {
    posts: allPost(
      sort: { updated: DESC }
      filter: { tags: { elemMatch: { name: { eq: $slug } } } }
    ) {
      nodes {
        slug
        title
        date(formatString: "YYYY-MM-DD")
        excerpt
        updated
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`
