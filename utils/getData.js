import path from "node:path";
import fs from "node:fs/promises";

export async function getData() {
  try {
    const content = await fs.readFile(path.join("data", "data.json"), "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}
