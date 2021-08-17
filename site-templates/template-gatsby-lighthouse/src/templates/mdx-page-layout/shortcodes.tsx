import * as React from "react"
import * as System from "@harborschool/lighthouse"
import ReactPlayer from "react-player"

export const shortcodes = () => ({
  video: props => (
    <video autoPlay loop muted style={{ display: "block" }} {...props} />
  ),
  // Iframe: props => <iframe {...props} />,
  ...System,
  Spacing: props => (
    <System.Spacing
      width="100%"
      height="100%"
      background="var(--lh-guide-spacing)"
      guide
      {...props}
    />
  ),
  h1: System.HeadingXXLarge,
  h2: System.HeadingXLarge,
  p: System.ParagraphMedium,
  button: System.Button,
})
