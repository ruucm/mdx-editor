import fs from "fs";
import matter from "gray-matter";
import path from "path";

export { addPageContext };

type PageContext = {
  pageProps: {};
  documentProps: {
    title: string;
    description?: string;
  };
};

async function addPageContext(pageContext: any): Promise<PageContext> {
  const { content, data } = getMdxSource();
  return {
    pageProps: {
      content,
    },
    documentProps: {
      title: "Editor",
      // description: projectsData.description,
    },
  };
}

function getMdxSource() {
  const postFilePath = `${path.resolve()}/pages/mdx-pages/hello-1.page.mdx`;
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);

  return { content, data };
}
