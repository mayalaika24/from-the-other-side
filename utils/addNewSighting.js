import fs from "node:fs/promises";
import path from "node:path";
import { getData } from "./getData.js";
import { sanitizeInput } from "./sanitizeInput.js";
import { sightingsEvent } from "../events/sightingsEvent.js";
export async function addNewSighting(dir, newSighting) {
  const pathname = path.join(dir, "data", "data.json");
  try {
    const data = await getData();
    const sanitizedData = sanitizeInput(newSighting);
    data.push(sanitizedData);
    await fs.writeFile(pathname, JSON.stringify(data, null, 2), (err) => {
      throw new Error(`Failed to add to file ${err}`);
    });
    sightingsEvent.emit("sighting-added", sanitizedData);
  } catch (error) {
    throw new Error(error);
  }
}
