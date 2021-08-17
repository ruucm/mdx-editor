import glob from "fast-glob"
import { promises as fs } from "fs"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"
import { shortcodes } from "./shortcodes"

// import Code from '@components/Code';

const components = {
  //  code: Code
  ...shortcodes(),
}

export default function Data({ source, frontMatter }: any) {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} components={components} />
    </div>
  )
}

// This glob is what will be used to generate static routes
const contentPath = "nested-notion-pages"
export const contentGlob = `${contentPath}/**/*.mdx`
export const getFileSlug = (filePath: any) => {
  const filename = filePath.replace(`${contentPath}/`, "")
  const slug = filename.replace(new RegExp(path.extname(filePath) + "$"), "")
  return slug
}

export async function getStaticPaths() {
  const files = glob.sync(contentGlob)

  const paths = files.map((file) => {
    const slug = getFileSlug(file).split("/")
    return {
      params: {
        slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const files = glob.sync(contentGlob)

  const pathRegex = new RegExp(`^${contentPath}/${path.join(...slug)}.mdx$`)
  const fullPath: any = files.find((file) => pathRegex.test(file))

  if (!fullPath) {
    console.warn("No MDX file found for slug")
  }

  const source = await fs.readFile(fullPath)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}
