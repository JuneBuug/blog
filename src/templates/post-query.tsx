import { graphql } from "gatsby"
import PostComponent from "../components/post"

export default PostComponent

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }) {
      slug
      title
      date(formatString: "YYYY-MM-DD")
      updated(formatString: "YYYY-MM-DD HH:mm:ss")
      tags {
        name
        slug
      }
      description
      body
      excerpt
      timeToRead
      banner {
        childImageSharp {
          resize(width: 1200, quality: 90) {
            src
          }
        }
      }
    }
  }
`
