/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Layout from "./layout"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import ListingForTags from "./listing-for-tags"
import replaceSlashes from "../utils/replaceSlashes"
import SEO from "./seo"
import { graphql } from "gatsby"

type TagProps = {
  data: {
    posts: {
      nodes: {
        slug: string
        title: string
        date: string
        excerpt: string
        description: string
        timeToRead: number
        tags: { name: string; slug: string }[]
      }[]
      totalCount: number
    }
  }
  pageContext: {
    slug: string
    name: string
    [key: string]: any
  }
}

export const query = graphql`
  query($slug: String!) {
    posts: allPost(sort: { updated: DESC }, filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      nodes {
        slug
        title
        date(formatString: "YYYY.MM.DD")
        excerpt
        updated
        timeToRead
        description
        tags {
          name
          slug
        }
      }
      totalCount
    }
  }
`

const Tag = ({ data, pageContext }) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()

  return (
    <Layout>
      <SEO title={`#${pageContext.name}`} />
      <div sx={{ mb: [4, 5] }}>
        <div sx={{ mb: 2 }}>
          <Link
            to={replaceSlashes(`/${basePath}/${tagsPath}`)}
            sx={{ fontSize: 1, color: `secondary`, textDecoration: `none`, "&:hover": { color: `primary` } }}
          >
            ← 모든 태그
          </Link>
        </div>
        <h2 sx={{ fontSize: [4, 5], fontWeight: 800, mb: 1, mt: 0, letterSpacing: `-0.02em` }}>
          #{pageContext.name}
        </h2>
        <p sx={{ color: `secondary`, fontSize: [1, 2], mt: 0, mb: 0 }}>
          {data.posts.totalCount}개의 글
        </p>
      </div>
      <ListingForTags sx={{ mt: [1, 2] }} posts={data.posts.nodes} />
    </Layout>
  )
}

export default Tag
