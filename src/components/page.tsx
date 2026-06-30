/** @jsx jsx */
import { jsx } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
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
    <Themed.h2>{page.title}</Themed.h2>
    <section sx={{ my: 5 }}>
      {children}
    </section>
  </Layout>
)

export default Page
