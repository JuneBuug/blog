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

  <Box mb={0}>
 
      {post.tags && showTags && (
        <p sx={{ mb: 0, a: { color: `#AA9` }, fontSize: 1, fontWeight: 400 }}>
        <React.Fragment>
          <ItemTags tags={post.tags} />
        </React.Fragment>
      </p>
      )}
   

    

    <Styled.a as={Link} to={post.slug} sx={{ fontSize: [2, 3, 3], color: `text`, fontWeight: 700 }}>
      {post.title} 
    </Styled.a>
     
    <time sx={{ color: `#fd254c`, fontSize: 1, fontWeight: 400 }} > updated @ {post.updated} </time>

    <p sx={{ fontSize: [1, 1, 1], mt: 0, color: `#666666cc`, }}>
      {post.description ? post.description : post.excerpt}
    </p>
   
    
    <br />
  </Box>
)

export default WikiListItem
