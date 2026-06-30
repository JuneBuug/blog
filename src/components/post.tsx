/** @jsx jsx */
import { jsx } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import React from "react"
import Layout from "./layout"
import ItemTags from "./item-tags"
import SEO from "./seo"
import BlogGiscus from "./blog-giscus"
import ReadingProgress from "./reading-progress"

type PostProps = {
  data: {
    post: {
      slug: string
      title: string
      date: string
      updated: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      excerpt: string
      timeToRead: number
      banner?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
  children: React.ReactNode
}

const Post = ({ data: { post }, children }: PostProps) => (
  <Layout>
    <ReadingProgress />
    <SEO
      title={post.title}
      pathname={post.slug}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
    />

    {/* accent bar */}
    <div
      sx={{
        height: `4px`,
        width: `48px`,
        borderRadius: `2px`,
        background: `linear-gradient(90deg, #ffaf12, #ff7c12)`,
        mb: 3,
      }}
    />

    {post.tags && (
      <div sx={{ mb: 3 }}>
        <ItemTags tags={post.tags} />
      </div>
    )}

    <Themed.h1
      sx={{
        fontSize: [4, 5, 5],
        fontWeight: 800,
        lineHeight: 1.25,
        letterSpacing: `-0.025em`,
        mt: 0,
        mb: 3,
      }}
    >
      {post.title}
    </Themed.h1>

    <p
      sx={{
        color: `secondary`,
        fontSize: [1, 1],
        mt: 0,
        mb: 0,
        pb: 4,
        borderBottom: `1px solid`,
        borderBottomColor: `divide`,
        display: `flex`,
        alignItems: `center`,
        gap: `8px`,
        flexWrap: `wrap`,
      }}
    >
      <span>juneyr</span>
      <span sx={{ opacity: 0.4 }}>·</span>
      <time>{post.date} 작성</time>
      {post.updated && post.updated !== post.date && (
        <React.Fragment>
          <span sx={{ opacity: 0.4 }}>·</span>
          <time>{post.updated} 업데이트</time>
        </React.Fragment>
      )}
      <span sx={{ opacity: 0.4 }}>·</span>
      <span>⏱ {post.timeToRead}분</span>
    </p>

    <section sx={{ my: 5, lineHeight: 1.8 }}>{children}</section>

    <BlogGiscus />
  </Layout>
)

export default Post
