/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import ItemTags from "./item-tags"

type WikiListItemProps = {
  post: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead: number
    tags?: { name: string; slug: string }[]
  }
  showTags?: boolean
}

const WikiListItem = ({ post, showTags = true }: WikiListItemProps) => (
  <div
    sx={{
      py: 3,
      borderBottom: `1px solid`,
      borderBottomColor: `divide`,
      "&:last-of-type": { borderBottom: `none` },
    }}
  >
    <div sx={{ display: `flex`, alignItems: `center`, justifyContent: `space-between`, gap: 2, mb: 1 }}>
      <Link
        to={post.slug}
        sx={{
          fontSize: [2, 2, 3],
          fontWeight: 600,
          color: `heading`,
          textDecoration: `none`,
          lineHeight: 1.4,
          letterSpacing: `-0.02em`,
          "&:hover": { color: `primary` },
          transition: `color 0.15s`,
        }}
      >
        {post.title}
      </Link>
      <span sx={{ fontSize: `0.75rem`, color: `secondary`, whiteSpace: `nowrap`, flexShrink: 0 }}>
        {post.date.substring(5).replace(".", "/")}
      </span>
    </div>
    <p sx={{ fontSize: 1, color: `secondary`, mt: 0, mb: 1, lineHeight: 1.6, letterSpacing: `-0.01em` }}>
      {post.description ? post.description : post.excerpt}
    </p>
    {post.tags && showTags && <ItemTags tags={post.tags} />}
  </div>
)

export default WikiListItem
