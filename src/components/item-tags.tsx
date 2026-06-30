/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
}

const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {tags.map(tag => (
        <Link
          key={tag.slug}
          to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
          sx={{
            display: `inline-block`,
            mr: 1,
            mb: 1,
            px: `10px`,
            py: `3px`,
            fontSize: `0.72rem`,
            fontWeight: 600,
            borderRadius: `99px`,
            backgroundColor: `rgba(255, 175, 18, 0.12)`,
            color: `primary`,
            textDecoration: `none`,
            letterSpacing: `0.02em`,
            transition: `all 0.15s ease`,
            "&:hover": {
              backgroundColor: `primary`,
              color: `white`,
            },
          }}
        >
          {tag.name}
        </Link>
      ))}
    </React.Fragment>
  )
}

export default ItemTags
