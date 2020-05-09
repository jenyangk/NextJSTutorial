const next = require("next");
const url = require("url");
const path = require("path");
const http = require("http");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      /* Parse request URL to get its pathname */
      const parsedURL = url.parse(req.url, true);
      const { pathname } = parsedURL;

      /* If a service worker requested, we serve it as static file */
      if (pathname === "/service-worker.js") {
        const filePath = path.join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);

        /* Otherwise, let Next.JS handle */
      } else {
        handle(req, res, parsedURL);
      }
    })
    .listen(port, () => {
      console.log(`listening on PORT ${port}`);
    });
});
