import React from "react"
import ReactDOM from "react-dom"
import { useClientRouter } from "vite-plugin-ssr/client/router"
import type { PageContextBuiltInClient } from "vite-plugin-ssr/types"
import { PageContext } from "./types"
import { PageLayout } from "./PageLayout"
import { getPageTitle } from "./getPageTitle"
// @ts-ignore
import { Client as Styletron } from "styletron-engine-monolithic"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, LighthouseProvider } from "@harborschool/lighthouse"

const engine = new Styletron()
const { hydrationPromise } = useClientRouter({
  render(pageContext: PageContext & PageContextBuiltInClient) {
    const { Page, pageProps } = pageContext
    const page = (
      <StyletronProvider value={engine}>
        <LighthouseProvider theme={LightTheme}>
          <PageLayout>
            <Page {...pageProps} />
          </PageLayout>
        </LighthouseProvider>
      </StyletronProvider>
    )
    const container = document.getElementById("page-view")
    if (pageContext.isHydration) {
      ReactDOM.hydrate(page, container)
    } else {
      ReactDOM.render(page, container)
    }
    document.title = getPageTitle(pageContext)
  },
  onTransitionStart,
  onTransitionEnd,
})

hydrationPromise.then(() => {
  console.log("Hydration finished; page is now interactive.")
})

function onTransitionStart() {
  console.log("Page transition start")
  document.querySelector("#page-content")!.classList.add("page-transition")
}
function onTransitionEnd() {
  console.log("Page transition end")
  document.querySelector("#page-content")!.classList.remove("page-transition")
}
