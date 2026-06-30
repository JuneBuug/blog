/** @jsx jsx */
import { jsx } from "theme-ui"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"
import Layout from "./layout"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import SEO from "./seo"
import replaceSlashes from "../utils/replaceSlashes"
import useTags from "../hooks/use-tags"

const Tags = () => {
  const { tagsPath, basePath } = useMinimalBlogConfig()
  const l = useTags()

  return (
    <Layout>
      <SEO title="Tags" />
      <div sx={{ mb: [4, 5] }}>
        <h2 sx={{ fontSize: [4, 5], fontWeight: 800, mb: 1, mt: 0, letterSpacing: `-0.02em` }}>
          Tags
        </h2>
        <p sx={{ color: `secondary`, fontSize: [1, 2], mt: 0, mb: 0 }}>
          {l.length}개의 태그
        </p>
      </div>
      <div sx={{ display: `flex`, flexWrap: `wrap`, gap: 2 }}>
        {l.map(item => (
          <Link
            key={item.fieldValue}
            to={replaceSlashes(`/${basePath}/${tagsPath}/${kebabCase(item.fieldValue)}`)}
            sx={{
              px: `14px`,
              py: `6px`,
              borderRadius: `99px`,
              border: `1px solid`,
              borderColor: `divide`,
              fontSize: 1,
              fontWeight: 500,
              color: `text`,
              textDecoration: `none`,
              transition: `all 0.15s`,
              "&:hover": {
                borderColor: `primary`,
                color: `primary`,
              },
            }}
          >
            {item.fieldValue}
            <span sx={{ ml: 1, color: `secondary`, fontSize: 0 }}>
              {item.totalCount}
            </span>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Tags
