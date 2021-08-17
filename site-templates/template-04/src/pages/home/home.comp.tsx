import * as System from "@harborschool/lighthouse"
import * as React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const HomePage = () => {
  return <System.Block font="ParagraphMedium">Home</System.Block>
}

export default () => (
  <Layout>
    <SEO home title="Web / Framer tutorials for beginners · Harbor School" />
    <HomePage />
  </Layout>
)
