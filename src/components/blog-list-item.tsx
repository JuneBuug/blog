/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import ItemTags from "./item-tags"

type BlogListItemProps = {
  post: {
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
  }
  showTags?: boolean
}

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  <div
    sx={{
      display: `flex`,
      alignItems: [`flex-start`, `center`],
      flexDirection: [`column`, `row`],
      gap: [1, 3],
      py: 3,
      borderBottom: `1px solid`,
      borderBottomColor: `divide`,
      transition: `opacity 0.15s`,
      "&:hover": { opacity: 0.7 },
      "&:last-of-type": { borderBottom: `none` },
    }}
  >
    <Link
      to={post.slug}
      sx={{
        fontSize: [2, 2, 3],
        fontWeight: 600,
        color: `heading`,
        textDecoration: `none`,
        flex: 1,
        lineHeight: 1.4,
        letterSpacing: `-0.02em`,
      }}
    >
      {post.title}
    </Link>

    <div
      sx={{
        display: `flex`,
        alignItems: `center`,
        gap: 2,
        flexShrink: 0,
        flexWrap: `wrap`,
      }}
    >
      {post.tags && showTags && <ItemTags tags={post.tags} />}
      <span sx={{ fontSize: `0.75rem`, color: `secondary`, whiteSpace: `nowrap` }}>
        {post.date.substring(5).replace(".", "/")}
      </span>
    </div>
  </div>
)

export default BlogListItem
