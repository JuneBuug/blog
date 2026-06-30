/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import useSiteMetadata from "../hooks/use-site-metadata"
import replaceSlashes from "../utils/replaceSlashes"

type NavigationProps = {
  nav: {
    title: string
    slug: string
  }[]
}

const Navigation = ({ nav }: NavigationProps) => {
  const { basePath } = useSiteMetadata()

  return (
    <nav sx={{ "a:not(:last-of-type)": { mr: 3 }, fontSize: [1, `18px`], ".active": { color: `heading` } }}>
      {nav.map(item => (
        <Link key={item.slug} activeClassName="active" to={replaceSlashes(`/${basePath}/${item.slug}`)} sx={{ color: `inherit`, textDecoration: `none` }}>
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
