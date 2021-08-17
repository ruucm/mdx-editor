import { MDXProvider } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { shortcodes } from "./shortcodes"

export default function MDXPageLayout({ data: { mdx } }) {
  return (
    <>
      <article className="mdx-page-layout">
        <MDXProvider components={shortcodes}>
          <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query MdxPageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
