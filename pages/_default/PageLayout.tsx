import React from "react";
import "./PageLayout.css";
import { MDXProvider } from "@mdx-js/react";
import { shortcodes } from "./shortcodes";

export { PageLayout };

type Children = React.ReactNode;

function PageLayout({ children }: { children: Children }) {
  return (
    <React.StrictMode>
      <MDXProvider components={shortcodes}>
        <Layout>
          <Sidebar>
            <a href="/">Home</a>
            <a href="/editor">Editor</a>
            <a href="/mdx-pages/hello-1">hello-1</a>
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </MDXProvider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: Children }) {
  return <div>{children}</div>;
}

function Sidebar({ children }: { children: Children }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        lineHeight: "1.8em",
        borderRight: "2px solid #eee",
      }}
    >
      {children}
    </div>
  );
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
  );
}
