/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "./layout"
import SEO from "./seo"

type PageProps = {
  data: {
    page: {
      title: string
      slug: string
      excerpt: string
    }
  }
  children: React.ReactNode
}

const Page = ({ data: { page }, children }: PageProps) => (
  <Layout>
    <SEO title={page.title} description={page.excerpt} />
    <div sx={{ mb: [3, 4] }}>
      <h2 sx={{ fontSize: [4, 5], fontWeight: 800, mb: 0, mt: 0, letterSpacing: `-0.02em` }}>
        {page.title}
      </h2>
    </div>
    <section
      sx={{
        fontSize: [2, 2, 3],
        "p": { lineHeight: 1.65, letterSpacing: `-0.02em`, mb: 2 },
        "h2": { mt: 5, mb: 2, fontSize: [3, 4], fontWeight: 700, letterSpacing: `-0.03em` },
        "h3": { mt: 4, mb: 2, fontSize: [2, 3], fontWeight: 700 },
        "ul, ol": { pl: 4, lineHeight: 1.65 },
        "li": { mb: 1, letterSpacing: `-0.02em` },
      }}
    >
      {children}
    </section>
  </Layout>
)

export default Page
