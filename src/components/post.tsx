/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Layout from "./layout"
import ItemTags from "./item-tags"
import SEO from "./seo"
import Utterances from "./utterance"
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
      body: string
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
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Post = ({ data: { post } }: PostProps) => (
  <Layout>
    <SEO
      title={post.title}
      pathname={post.slug}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
    />
    <Styled.h2>{post.title}</Styled.h2>
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
    <section sx={{ my: 5, textAlign: `justify`}}>
      <MDXRenderer>{post.body}</MDXRenderer>
    </section>
    {/* <Utterances repo="JuneBuug/blog" /> */}
    <BlogGiscus />

    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6496458107332476"
      crossorigin="anonymous"></script>
    
    <ins class="adsbygoogle"
      sx={{display: `block`}}
      data-ad-client="ca-pub-6496458107332476"
      data-ad-slot="8272473233"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({ });
    </script> */}
  </Layout>
)

export default Post
