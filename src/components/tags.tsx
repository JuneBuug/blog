/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Box, Flex } from "@theme-ui/components"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"
import Layout from "./layout"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import SEO from "./seo"
import replaceSlashes from "../utils/replaceSlashes"
import useTags from "../hooks/use-tags"

type PostsProps = {
  list: {
    fieldValue: string
    totalCount: number
  }[]
}

const Tags = ({ list }: PostsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()
  const l = useTags()
  console.log(l)
  return (
    <Layout>
      <SEO title="Tags" />
      <Styled.h2>Tags</Styled.h2>
      <Box mt={[2, 2]}>
        {l.map(listItem => (
          <Flex key={listItem.fieldValue} mb={[1, 1, 2]} sx={{ alignItems: `center` }}>
            <Styled.a
              as={Link}
              sx={{ variant: `links.listItem`, mr: 2 }}
              to={replaceSlashes(`/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`)}
            >
              {listItem.fieldValue} <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </Styled.a>
          </Flex>
        ))}
      </Box>
    </Layout>
  )
}

export default Tags