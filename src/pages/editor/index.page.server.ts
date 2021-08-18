import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { mdxArrToList } from "../../utils"
import { testMdxFileBase, testMdxFileName } from "./../../consts"

export { addPageContext }

type PageContext = {
  pageProps: {}
  documentProps: {
    title: string
    description?: string
  }
}

async function addPageContext(pageContext: any): Promise<PageContext> {
  const { content, data, list } = getMdxSource()
  return {
    pageProps: {
      content,
      list,
      frontMatter: data,
    },
    documentProps: {
      title: "Editor",
      // description: projectsData.description,
    },
  }
}

function getMdxSource() {
  const POST_BASE_PATH = path.join(process.cwd(), testMdxFileBase)
  const POST_FILE_PATH = path.join(POST_BASE_PATH, testMdxFileName)
  const source = fs.readFileSync(POST_FILE_PATH)
  const { content, data } = matter(source)

  const arr = content.split(/\n/).filter((line) => line !== "")
  const list = mdxArrToList(arr)

  return { content, data, list }
}
