// Import Thigns
const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const _ = require("lodash")

// Create pathname!
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === "Mdx") {
    const filePath = createFilePath({ node, getNode })
    const pathname = `${stringKnife(filePath, -3, true)}`
    const parent = getNode(_.get(node, "parent")) // using loadash, cause node.parent only returns id

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
        },
      })
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
