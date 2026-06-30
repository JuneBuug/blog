/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import useSiteMetadata from "../hooks/use-site-metadata"
import useNavigation from "../hooks/use-navigation"
import Navigation from "./navigation"
import replaceSlashes from "../utils/replaceSlashes"

const Header = () => {
  const { siteTitle, basePath } = useSiteMetadata()
  const nav = useNavigation()

  return (
    <header
      sx={{
        mb: [4, 5],
        pb: 3,
        borderBottom: `1px solid`,
        borderBottomColor: `divide`,
      }}
    >
      <script
        defer
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6496458107332476"
        crossorigin="anonymous"
      />

      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <Link
          to={replaceSlashes(`/${basePath}`)}
          aria-label={`${siteTitle} - Back to home`}
          sx={{ color: `heading`, textDecoration: `none` }}
        >
          <span
            sx={{
              fontSize: [2, 3],
              fontFamily: `display`,
              letterSpacing: `0.01em`,
              fontWeight: 300,
            }}
          >
            {siteTitle}
          </span>
        </Link>

        <Navigation nav={nav} />
      </Flex>
    </header>
  )
}

export default Header
