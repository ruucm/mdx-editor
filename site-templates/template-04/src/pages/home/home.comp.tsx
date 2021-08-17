import * as System from "@harborschool/lighthouse"
import { useTheme } from "@harborschool/lighthouse"
import * as React from "react"
// import Layout from "../../components/layout"
// import SEO from "../../components/seo"

const HomePage = () => {
  const theme = useTheme()

  return <System.Block>Home</System.Block>
}

export default () => (
  <>
    {/* <SEO home title="Web & Framer tutorials for beginners · Harbor School" /> */}
    <HomePage />
  </>
)
