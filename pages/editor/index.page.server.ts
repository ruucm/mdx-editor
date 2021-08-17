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
    },
    documentProps: {
      title: "Editor",
      // description: projectsData.description,
    },
  }
}

function getMdxSource() {
  const POSTS_PATH = path.join(process.cwd(), testMdxFileBase)
  const postFilePath = path.join(POSTS_PATH, testMdxFileName)
  const source = fs.readFileSync(postFilePath)
  const { content, data } = matter(source)

  const arr = content.split(/\n/).filter((line) => line !== "")
  const list = mdxArrToList(arr)

  return { content, data, list }
}
