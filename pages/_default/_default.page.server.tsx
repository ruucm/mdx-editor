import ReactDOMServer from "react-dom/server"
import React from "react"
import { html } from "vite-plugin-ssr"
import { PageLayout } from "./PageLayout"
import { PageContext } from "./types"
import { getPageTitle } from "./getPageTitle"
import { Provider as StyletronProvider } from "styletron-react"
// @ts-ignore
import { Server as Styletron } from "styletron-engine-monolithic"

export { render }
export { passToClient }

const passToClient = ["pageProps", "documentProps"]

const engine = new Styletron()
function render(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  const pageContent = ReactDOMServer.renderToString(
    <StyletronProvider value={engine}>
      <PageLayout>
        <Page {...pageProps} />
      </PageLayout>
    </StyletronProvider>
  )

  const title = getPageTitle(pageContext)

  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${html.dangerouslySkipEscape(pageContent)}</div>
      </body>
    </html>`
}
