/** @jsx jsx */
import { jsx } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"

const Footer = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <footer
      sx={{
        mt: [6],
        pt: 3,
        borderTop: `1px solid`,
        borderTopColor: `divide`,
        color: `secondary`,
        fontSize: 1,
      }}
    >
      &copy; {new Date().getFullYear()} {siteTitle}
    </footer>
  )
}

export default Footer
