import { testMdxFileBase } from './../consts';
import express from "express";
import { createPageRender } from "vite-plugin-ssr";
import * as vite from "vite";
import { serverSocket } from "./server-socket";
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

startServer();
const opts = {
  dirname: `${__dirname}/../${testMdxFileBase}`,
  port: 3100,
  title: "mdx-editor",
  open: true,
  o: true,
  vim: false,
};
console.log("opts", opts);
serverSocket(opts);

async function startServer() {
  const app = express();

  let viteDevServer;
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`, { index: false }));
  } else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
    });
    app.use(viteDevServer.middlewares);
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root });
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    const pageContext = { url };
    const result = await renderPage(pageContext);
    if (result.nothingRendered) return next();
    res.status(result.statusCode).send(result.renderResult);
  });

  const port = 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

const DIRNAME = opts.dirname;
const hasStaticDir = fs.existsSync(DIRNAME);

console.log("hasStaticDir", hasStaticDir);

// const DIRNAME = opts.dirname;
// const req = require.context(DIRNAME, true, /\.(md|mdx|jsx)$/);
// const codeContext = require.context(
//   "!!raw-loader!" + DIRNAME,
//   true,
//   /\.(md|mdx|jsx)$/
// );
// const routes = req
//   .keys()
//   .filter((key: any) => !/node_modules/.test(key))
//   .map((key: any) => {
//     const extname = path.extname(key);
//     const name = path.basename(key, extname);
//     const exact = name === "index";
//     const dirname = path.dirname(key).replace(/^\./, "");
//     const pathname = dirname + "/" + (exact ? "" : name);
//     let mod, Component;
//     try {
//       mod = req(key);
//       Component = mod.default;
//     } catch (err) {
//       console.error(err);
//     }
//     const code = codeContext(key);
//     if (typeof Component !== "function") return null;
//     return {
//       key,
//       name,
//       extname,
//       dirname,
//       exact,
//       path: pathname,
//       Component,
//       code,
//     };
//   })
//   .filter(Boolean);

// console.log("routes", routes);
