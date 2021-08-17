/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import log from "loglevel"

console.log("process.env.PRODUCTION", process.env.PRODUCTION)

if (process.env.PRODUCTION !== "true") {
  localStorage.setItem("debug", "website-template-04:*")
  // show trace / debug / warn / error on DEV env
  log.setLevel("trace")
}
