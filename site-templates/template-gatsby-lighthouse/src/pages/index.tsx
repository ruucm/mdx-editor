import * as System from "@harborschool/lighthouse"
import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const HomePage = ({ data }) => {
  console.log("data", data)

  const mdxpages = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="template-gatsby-lighthouse" />
      <System.Block font="ParagraphMedium">Home</System.Block>

      <ul>
        {mdxpages.map((page, id) => (
          <li key={id}>
            <a href={page.fields.pathname} target="_blank">
              {page.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allMdx {
      nodes {
        fields {
          pathname
        }
        frontmatter {
          title
        }
      }
    }
  }
`
