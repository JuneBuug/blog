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
      {tags.map((tag, i) => (
        <React.Fragment key={tag.slug}>
          {!!i && `, `}
          <Link to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)} sx={{ variant: `styles.a` }}>
            {tag.name}
          </Link>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ItemTags
