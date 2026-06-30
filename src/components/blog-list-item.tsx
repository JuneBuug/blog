/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Box } from "@theme-ui/components"
import { Link } from "gatsby"
import ItemTags from "./item-tags"

type BlogListItemProps = {
  post: {
    slug: string
    title: string
    date: string
    updated: string
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
  <Box
    mb={4}
    sx={{
      p: [3, 4],
      borderRadius: `12px`,
      border: `1px solid`,
      borderColor: `divide`,
      position: `relative`,
      transition: `transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease`,
      "&:hover": {
        transform: `translateY(-4px)`,
        boxShadow: `0 16px 40px rgba(0, 0, 0, 0.1)`,
        borderColor: `primary`,
      },
    }}
  >
    {post.tags && showTags && (
      <div sx={{ mb: 2 }}>
        <ItemTags tags={post.tags} />
      </div>
    )}

    <Link
      to={post.slug}
      sx={{
        display: `block`,
        fontSize: [3, 4],
        fontWeight: 700,
        color: `heading`,
        textDecoration: `none`,
        lineHeight: 1.3,
        mb: 2,
        mt: 0,
        transition: `color 0.15s ease`,
        "&:hover": { color: `primary` },
      }}
    >
      {post.title}
    </Link>

    <p
      sx={{
        fontSize: [1, 2],
        color: `secondary`,
        lineHeight: 1.7,
        mt: 0,
        mb: 3,
        display: `-webkit-box`,
        WebkitLineClamp: 2,
        WebkitBoxOrient: `vertical`,
        overflow: `hidden`,
      }}
    >
      {post.description ? post.description : post.excerpt}
    </p>

    <p sx={{ fontSize: `0.75rem`, color: `secondary`, mt: 0, mb: 0, textAlign: `right` }}>
      {post.date} &middot; {post.timeToRead}분 읽기
    </p>
  </Box>
)

export default BlogListItem
