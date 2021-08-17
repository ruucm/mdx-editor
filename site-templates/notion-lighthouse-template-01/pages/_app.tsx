import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider as StyletronProvider } from "styletron-react"
import { styletron, debug } from "../styletron"
import { LighthouseProvider, LightTheme } from "@harborschool/lighthouse"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
      <LighthouseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </LighthouseProvider>
    </StyletronProvider>
  )
}
export default MyApp
