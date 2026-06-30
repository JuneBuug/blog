/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Layout from "./layout"
import ListingForWiki from "./listing-for-wiki"
import useSiteMetadata from "../hooks/use-site-metadata"
import replaceSlashes from "../utils/replaceSlashes"
import useHomepage from "../hooks/use-homepage"

type PostsProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
}

const Homepage = ({ posts }: PostsProps) => {
  const { basePath, blogPath } = useSiteMetadata()
  const p = useHomepage()
  return (
    <Layout sx={{mt: 0}}>
      <div sx={{ mb: [4, 5], display: `flex`, alignItems: `flex-end`, justifyContent: `space-between`, flexWrap: `wrap`, gap: 2 }}>
        <div>
          <h2 sx={{ fontSize: [4, 5], fontWeight: 800, mb: 1, mt: 0, letterSpacing: `-0.02em` }}>
            Wiki
          </h2>
          <p sx={{ color: `secondary`, fontSize: [1, 2], mt: 0, mb: 0 }}>
            공부하며 쌓아가는 조각 지식들
          </p>
        </div>
        <Link
          to={replaceSlashes(`/${basePath}/${blogPath}`)}
          sx={{ fontSize: 1, color: `secondary`, textDecoration: `none`, pb: 1, "&:hover": { color: `primary` } }}
        >
          블로그 보기 →
        </Link>
      </div>
      <ListingForWiki posts={p} showTags={true} />
    </Layout>
  )
}

export default Homepage
