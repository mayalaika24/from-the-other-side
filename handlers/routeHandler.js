import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
export async function routeHandle(res, baseDir) {
  const data = await getData(res, baseDir);
  sendResponse(res, 200, "application/json", JSON.stringify(data));
}
