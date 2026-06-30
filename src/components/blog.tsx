/** @jsx jsx */
import { jsx } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
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
      <div sx={{ mb: [4, 5] }}>
        <h2
          sx={{
            fontSize: [4, 5],
            fontWeight: 800,
            mb: 1,
            mt: 0,
            letterSpacing: `-0.02em`,
          }}
        >
          Blog
        </h2>
        <p sx={{ color: `secondary`, fontSize: [1, 2], mt: 0, mb: 0 }}>
          개발하며 배운 것들을 기록합니다.
        </p>
      </div>
      <Listing posts={p} sx={{ mt: [3, 4] }} />
    </Layout>
  )
}

export default Blog
