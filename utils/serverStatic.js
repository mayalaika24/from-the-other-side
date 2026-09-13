import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { setContentType } from "./setContentType.js";

export async function serverStatic(req, res, dir) {
  const publicDir = path.join(dir, "public");
  try {
    const pathname = path.join(
      publicDir,
      req.url === "/" ? "index.html" : req.url,
    );
    const content = await fs.readFile(pathname);
    const contentType = setContentType(path.extname(req.url));
    sendResponse(res, 200, contentType, content);
  } catch (error) {
    let payload = `<html><h1>Server Error: ${error.code}</h1></html>`;
    let code = 500;
    if (error.code === "ENOENT") {
      const unknownPage = path.join(publicDir, "404.html");
      payload = await fs.readFile(unknownPage);
      code = 404;
    }
    sendResponse(res, code, "text/html", payload);
  }
}
