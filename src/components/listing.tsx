/** @jsx jsx */
import { jsx } from "theme-ui"
import BlogListItem from "./blog-list-item"

type Post = {
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

type ListingProps = {
  posts: { nodes: Post[] }
  className?: string
  showTags?: boolean
}

const Listing = ({ posts, className, showTags = true }: ListingProps) => {
  const byYear = posts.nodes.reduce<Record<string, Post[]>>((acc, post) => {
    const year = post.date.substring(0, 4)
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <section className={className}>
      {years.map(year => (
        <div key={year} sx={{ mb: 5 }}>
          <div
            sx={{
              display: `flex`,
              alignItems: `center`,
              gap: 3,
              mb: 3,
            }}
          >
            <span sx={{ fontSize: [2, 3], fontWeight: 700, color: `heading`, flexShrink: 0 }}>
              {year}
            </span>
            <div sx={{ flex: 1, height: `1px`, backgroundColor: `divide` }} />
          </div>
          {byYear[year].map(post => (
            <BlogListItem key={post.slug} post={post} showTags={showTags} />
          ))}
        </div>
      ))}
    </section>
  )
}

export default Listing
