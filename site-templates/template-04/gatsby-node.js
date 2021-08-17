// Import Thigns
const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const _ = require("lodash")

// Create pathname!
exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === "Mdx") {
    const filePath = createFilePath({ node, getNode })
    const language = getFileNamefromPath(filePath) // use file name as language
    const pathname = `/${language}${stringKnife(filePath, -3, true)}`
    const parent = getNode(_.get(node, "parent")) // using loadash, cause node.parent only returns id

    createNodeField({
      node,
      name: "language",
      value: language,
    })
    createNodeField({
      node,
      name: "sourceInstanceName",
      value: parent.sourceInstanceName,
    })
    createNodeField({
      node,
      name: "pathname",
      value: pathname,
    })
    createNodeField({
      node,
      name: "originalPath",
      value: pathname.substr(3),
    })
  }
}

// Programmatically create the pages for browsing blog posts (Create Page!)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              language
              sourceInstanceName
              pathname
              originalPath
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // you'll call `createPage` for each result
  result.data.allMdx.edges.forEach(({ node }, index) => {
    const language = node.fields.language // use file name as language
    const sourceInstanceName = node.fields.sourceInstanceName
    const pathname = node.fields.pathname

    if (sourceInstanceName === "mdx-pages")
      // Create MDX Pages
      createPage({
        path: pathname, // pathname has /en or /ko string
        component: path.resolve(
          `./src/templates/mdx-page-layout/mdx-page-layout.tsx`
        ),
        context: {
          id: node.id,
          // current: order,
          language,
        },
      })
  })

  /**
   * Intermediage Contents
   */
}

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions

  return new Promise(resolve => {
    // if the page component is the index page component
    if (page.componentPath === `${__dirname}/src/pages/home/Styles.js`) {
      console.log("delete!", page)
      deletePage(page)
    }

    // remove pages without language slug
    const source = page.path.replace("/en", "").replace("/ko", "")
    // remove pages on beta
    const pathsToIgnoreOnBeta = []
    // remove pages on dev
    // if (pathsToIgnoreOnBeta.includes(source)) deletePage(page)

    // remove test pages on prod
    const pathsToIgnore = [
      "/test-page/",
      "/mail-preview/",
      ...pathsToIgnoreOnBeta,
    ]
    if (
      process.env.NODE_ENV === "production" &&
      pathsToIgnore.includes(source)
    ) {
      deletePage(page)
    }
    resolve()
  })
}

// for import comp in mdx
exports.onCreateWebpackConfig = ({ stage, loaders, actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "content"), "node_modules"],
      alias: {
        react: path.resolve("./node_modules/react"),
      },
    },
  })
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /cld-video-player/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

/**
 * Utils
 */

function stringKnife(str, range, remove = false) {
  if (typeof range === "number") range = [range, undefined]
  const [start, end] = range
  const sliced = str.slice(start, end)
  if ((!remove && !end && start > 0) || (remove && start < 0))
    return str.replace(sliced, "")
  return sliced
}

function flattenMessages(nestedMessages, prefix = "") {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

function getFileNamefromPath(path) {
  const splited = path.split("/")
  return splited[splited.length - 2]
}
