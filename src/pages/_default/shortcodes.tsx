import * as React from "react"
import * as System from "@harborschool/lighthouse"

export const shortcodes = () => ({
  video: (props: any) => (
    <video autoPlay loop muted style={{ display: "block" }} {...props} />
  ),
  // Iframe: props => <iframe {...props} />,
  ...System,
  Spacing: (props: any) => (
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
