/** @jsx jsx */
import { jsx } from "theme-ui"
import WikiListItem from "./wiki-list-item"


type ListingProps = {
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
  className?: string
  showTags?: boolean
}

const ListingForWiki = ({ posts, className, showTags = true }: ListingProps) => {
  return (
  
    <section className={className}>
      {posts.nodes.map(post => (
        <WikiListItem key={post.slug} post={post} showTags={showTags} />
      ))}
    </section>
  )
}

export default ListingForWiki
