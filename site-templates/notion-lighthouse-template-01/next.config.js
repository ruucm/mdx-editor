/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: function (config) {
    config.externals = config.externals || {}
    config.externals["styletron-server"] = "styletron-server"
    return config
  },
}
