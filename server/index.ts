import express from "express";
import { createPageRender } from "vite-plugin-ssr";
import * as vite from "vite";
import { serverSocket } from "./server-socket";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

startServer();
const opts = {
  dirname: `${__dirname}/../pages/mdx-pages`,
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
