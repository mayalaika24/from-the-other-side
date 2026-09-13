import path from "node:path";
import fs from "node:fs/promises";

export async function getData(res, dir) {
  try {
    const content = await fs.readFile(
      path.join(dir, "data", "data.json"),
      "utf-8",
    );
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}
