/** @jsx jsx */
import { jsx, useColorMode, Styled } from "theme-ui"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import useSiteMetadata from "../hooks/use-site-metadata"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import useNavigation from "../hooks/use-navigation"
import ColorModeToggle from "./colormode-toggle"
import Navigation from "./navigation"
import replaceSlashes from "../utils/replaceSlashes"

const Header = () => {
  const { siteTitle, externalLinks, basePath } = useSiteMetadata()
  const nav = useNavigation()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    e.preventDefault()
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <header sx={{ mb: [3, 4] }}>
      <script data-ad-client="ca-pub-6496458107332476" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
      
        
        <Link
          to={replaceSlashes(`/${basePath}`)}
          aria-label={`${siteTitle} - Back to home`}
          sx={{ color: `heading`, textDecoration: `none`}}
        >
         <Flex sx={{ alignItems: `center`}}>
          <img src="../apple-touch-icon.png" width="10%" sx={{ borderRadius: `50%`, marginRight: `5%`}}/>
          
          <h1 sx={{ my: 0, fontWeight: `extrabold`, fontSize: [3, 4], fontFamily:`Major Mono Display` }}>{siteTitle}</h1>
  </Flex>
          
        </Link>
        <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
      </Flex>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
          fontFamily:`Major Mono Display`
        }}
      >
       
        <Navigation nav={nav} />
        {externalLinks && externalLinks.length > 0 && (
          <div sx={{ "a:not(:first-of-type)": { ml: 3 }, fontSize: [1, `18px`] }}>
            {externalLinks.map(link => (
              <Styled.a key={link.url} href={link.url}>
                {link.name}
              </Styled.a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
