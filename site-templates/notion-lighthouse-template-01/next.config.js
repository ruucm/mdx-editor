/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  reactStrictMode: true,
  webpack: function (config) {
    config.externals = config.externals || {}
    config.externals["styletron-server"] = "styletron-server"
    return config
  },
})
