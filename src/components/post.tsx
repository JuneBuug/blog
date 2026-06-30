/** @jsx jsx */
import { jsx } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import React from "react"
import Layout from "./layout"
import ItemTags from "./item-tags"
import SEO from "./seo"
import BlogGiscus from "./blog-giscus"

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

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Post = ({ data: { post }, children }: PostProps) => (
  <Layout>
    <SEO
      title={post.title}
      pathname={post.slug}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
    />
    <Themed.h2>{post.title}</Themed.h2>
    <p sx={{ color: `secondary`, mt: 2, a: { color: `secondary` }, fontSize: [1, 1, 1] }}>
      <time>{post.date} 에 작성하고, {post.updated} 에 업데이트한 문서입니다. ✅</time>
      {post.tags && (
        <React.Fragment>
          {` — `}
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
      {` — `}
      <span>{post.timeToRead} min read</span>
    </p>
    <section sx={{ my: 5, textAlign: `justify` }}>
      {children}
    </section>
    <BlogGiscus />
  </Layout>
)

export default Post
