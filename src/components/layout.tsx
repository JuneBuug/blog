/** @jsx jsx */
import React from "react"
import { Global } from "@emotion/react"
import { jsx, Container, css } from "theme-ui"
import { Box } from "@theme-ui/components"
import { Themed } from "@theme-ui/mdx"
import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"
import CodeStyles from "../styles/code"
import SkipNavLink from "./skip-nav"

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className }: LayoutProps) => (
  <Themed.root data-testid="theme-root">
    <Global
      styles={css({
        "*": {
          boxSizing: `inherit`,
        },
        body: {
          margin: 0,
          padding: 0,
          boxSizing: `border-box`,
          textRendering: `optimizeLegibility`,
        },
        "::selection": {
          backgroundColor: `primary`,
          color: `white`,
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: `text`,
        },
      })}
    />
    <SEO />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box as="main" id="skip-nav" css={css({ ...CodeStyles })} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </Themed.root>
)

export default Layout
