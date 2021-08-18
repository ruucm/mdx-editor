import React from "react"
import "./PageLayout.css"
import { MDXProvider } from "@mdx-js/react"
import { shortcodes } from "./shortcodes"

export { PageLayout }

type Children = React.ReactNode

function PageLayout({ children }: { children: Children }) {
  return (
    <React.StrictMode>
      <MDXProvider components={shortcodes}>
        <Layout>
          <Sidebar>
            <a href="/">Home</a>
            <div style={{ display: "flex" }}>
              <a href="/editor">Editor</a>
              <div style={{ width: 20 }} />
              <a href="/mdx-pages/hello-1">hello-1</a>
            </div>
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </MDXProvider>
    </React.StrictMode>
  )
}

function Layout({ children }: { children: Children }) {
  return <div>{children}</div>
}

function Sidebar({ children }: { children: Children }) {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: Children }) {
  return (
    <div
      id="page-content"
      style={{
        padding: 20,
        paddingBottom: 50,
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  )
}
