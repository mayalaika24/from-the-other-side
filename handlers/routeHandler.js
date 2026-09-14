import { addNewSighting } from "../utils/addNewSighting.js";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { stories } from "../data/stories.js";
export async function handleGet(res, baseDir) {
  const data = await getData(res, baseDir);
  const content = JSON.stringify(data);
  sendResponse(res, 200, "application/json", content);
}

export async function handlePost(req, res, dirname) {
  try {
    const parsedBody = await parseJSONBody(req);
    addNewSighting(dirname, parsedBody);
    sendResponse(res, 201, "application/json", JSON.stringify(parsedBody));
  } catch (error) {
    sendResponse(res, 400, "application/json", JSON.stringify({ error }));
  }
}

export async function handleNews(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length);
    res.write(
      `data: ${JSON.stringify({
        event: "news-update",
        story: stories[randomIndex],
      })}\n\n`,
    );
  }, 1000);
}
