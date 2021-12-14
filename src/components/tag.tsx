/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Flex } from "@theme-ui/components"
import { Link } from "gatsby"
import Layout from "./layout"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import ListingForTags from "./listing-for-tags"
import replaceSlashes from "../utils/replaceSlashes"
import SEO from "./seo"
import { graphql } from "gatsby"

type TagProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead: number
    tags: {
      name: string
      slug: string
    }[]
  }[]
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
}

export const query = graphql`
  query($slug: String!) {
    posts: allPost(sort: { fields: updated, order: DESC }, filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
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
      totalCount
    }
    
  }
`

const Tag = ({data, pageContext}) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()
  console.log("안되냥")
  console.log(data.posts)
  console.log(pageContext)
  
  return (
    <Layout>
      <SEO title={`Tag: ${pageContext.name}`} />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Styled.h3>{pageContext.name} ({data.posts.totalCount}) </Styled.h3>
        <Styled.a as={Link} sx={{ variant: `links.secondary` }} to={replaceSlashes(`/${basePath}/${tagsPath}`)}>
          View all tags
        </Styled.a>
      </Flex>
      <ListingForTags sx={{ mt: [1, 2] }} posts={data.posts.nodes}  />
    </Layout>
  )
}


export default Tag
