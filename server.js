import http from "node:http";
import { serverStatic } from "./utils/serverStatic.js";
import { routeHandle } from "./handlers/routeHandler.js";
const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api") {
    if (req.method === "GET") {
      await routeHandle(res, __dirname);
    }
  } else if (!req.url.startsWith("/api")) {
    await serverStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
