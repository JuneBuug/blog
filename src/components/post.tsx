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

    {post.tags && (
      <div sx={{ mb: 3 }}>
        <ItemTags tags={post.tags} />
      </div>
    )}

    <Themed.h1
      sx={{
        fontSize: [4, 5, 6],
        fontWeight: 800,
        lineHeight: 1.2,
        letterSpacing: `-0.03em`,
        wordBreak: `keep-all`,
        overflowWrap: `break-word`,
        mt: 0,
        mb: 2,
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
        pb: 3,
        borderBottom: `1px solid`,
        borderBottomColor: `divide`,
        display: `flex`,
        alignItems: `center`,
        gap: `8px`,
        flexWrap: `wrap`,
      }}
    >
      <img
        src="/apple-touch-icon.png"
        alt="juneyr"
        sx={{ width: 22, height: 22, borderRadius: `50%`, display: `block`, flexShrink: 0 }}
      />
      <span>juneyr</span>
      <span sx={{ opacity: 0.4 }}>·</span>
      <time>{post.date}</time>
      {post.updated && post.updated !== post.date && (
        <React.Fragment>
          <span sx={{ opacity: 0.4 }}>·</span>
          <time>updated {post.updated}</time>
        </React.Fragment>
      )}
    </p>

    <section
      sx={{
        mt: 3,
        mb: 5,
        fontSize: [2, 2, 3],
        "p": {
          lineHeight: 1.65,
          letterSpacing: `-0.02em`,
          mt: 0,
          mb: 3,
        },
        "& > h1:first-child, & > h2:first-child, & > h3:first-child": {
          mt: 2,
        },
        "h2": {
          mt: 6,
          mb: 2,
          fontSize: [3, 4],
          fontWeight: 700,
          letterSpacing: `-0.03em`,
          borderBottom: `2px solid`,
          borderBottomColor: `primary`,
          pb: 2,
        },
        "h3": {
          mt: 5,
          mb: 2,
          fontSize: [2, 3],
          fontWeight: 700,
          letterSpacing: `-0.02em`,
        },
        "h4": {
          mt: 4,
          mb: 1,
          fontSize: [2, 2],
          fontWeight: 600,
          color: `secondary`,
          letterSpacing: `-0.02em`,
        },
        "a": {
          color: `primary`,
          textDecoration: `underline`,
          textDecorationColor: `rgba(46,196,13,0.4)`,
          textUnderlineOffset: `3px`,
          "&:hover": { textDecorationColor: `primary` },
        },
        "ul, ol": { pl: 4, lineHeight: 1.65, mb: 3 },
        "li": { mb: 2, letterSpacing: `-0.02em` },
        ".gatsby-resp-image-wrapper": {
          display: `block`,
          my: 4,
        },
        ".gatsby-resp-image-wrapper img, p > img": {
          borderRadius: `4px`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)`,
          display: `block`,
          maxWidth: `100%`,
        },
        "img ~ em, p > em:only-child, .gatsby-resp-image-wrapper + p > em, figcaption, sub": {
          display: `block`,
          textAlign: `center`,
          fontSize: 1,
          color: `#9ca3af`,
          mt: `-12px`,
          mb: 3,
          fontStyle: `normal`,
          verticalAlign: `baseline`,
        },
      }}
    >
      {children}
    </section>

    <BlogGiscus />
  </Layout>
)

export default Post
