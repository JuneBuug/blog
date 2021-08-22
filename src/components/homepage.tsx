/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Layout from "./layout"
import Title from "./title"
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
  console.log(p)
  return (
    <Layout sx={{mt: 0}}>
      <Title text="wiki 위키" sx={{ fontFamily:`Major Mono Display`}}>
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>블로그 보기</Link>
      </Title>
      <ListingForWiki posts={p} showTags={true} />
    </Layout>
  )
}

export default Homepage
