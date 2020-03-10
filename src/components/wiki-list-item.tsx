/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
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


const WikiListItem = ({ post, showTags = true }: BlogListItemProps) => (

  <Box mb={1}>
 
    <p sx={{ mb: 0, a: { color: `#AA9` }, fontSize: 1, fontWeight: 400 }}>
      <time sx={{ color: `secondary`}} >{post.updated}</time> 
      <br/>
      {post.tags && showTags && (
        <React.Fragment>
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    </p>

    <Styled.a as={Link} to={post.slug} sx={{ fontSize: [3, 4, 4], color: `text`, fontWeight: 700 }}>
      {post.title}
    </Styled.a>

    <p sx={{ fontSize: [1, 2, 2], mt: 0, color: `#666666cc`, }}>
      {post.description ? post.description : post.excerpt}
    </p>
   
    
    <br />
  </Box>
)

export default WikiListItem
