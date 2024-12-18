import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import path from "path";

const app = new Hono();

const appDirectory = path.join(__dirname, "./");
const assetsDirectory = path.join(__dirname, "./app");

app.use(
  "/app/*",
  serveStatic({
    root: appDirectory,
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);

app.use(
  "assets/*",
  serveStatic({
    root: assetsDirectory,
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);

app.get("/", (c) => c.text("Hello Bun!"));

export default {
  port: 3000,
  fetch: app.fetch,
};
