/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "./layout"
import Listing from "./listing"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import useSiteMetadata from "../hooks/use-site-metadata"
import replaceSlashes from "../utils/replaceSlashes"
import SEO from "./seo"
import usePosts from "../hooks/use-post"

type PostsProps = {
  posts: {
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

const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useSiteMetadata()
  const p = usePosts()
  return (
    <Layout>
      <SEO title="Blog" />
      <img src="bg.png" width="100%" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <h2>블로그</h2>
        {/* <Styled.a as={Link} sx={{ variant: `links.secondary` }} to={replaceSlashes(`/${basePath}/${tagsPath}`)}>
          View all tags
        </Styled.a> */}
      </Flex>
      <Listing posts={p} sx={{ mt: [3, 4] }} />
    </Layout>
  )
}

export default Blog
