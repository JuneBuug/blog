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


const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (

  <Box mb={4}>

   
    <p sx={{ color: `secondary`, mb: 0, a: { color: `#AA9` }, fontSize: 1, fontWeight: 400 }}>
      <time>{post.date}</time> 
    </p>

    


    <p sx={{ mt: 0, mb: 0 }}>
      {post.tags && showTags && (
        <React.Fragment>
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    </p>

    <Styled.a as={Link} to={post.slug} sx={{ fontSize: [4, 5, 5], color: `text`, fontWeight: 700 }}>
      {post.title}
    </Styled.a>

    <p sx={{ fontSize: [1, 2, 2], mt: 1, color: `#666666cc`, }}>
      {post.description ? post.description : post.excerpt}
     
    </p>

    
    <br />
  </Box>
)

export default BlogListItem
