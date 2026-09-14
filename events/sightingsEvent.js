import { EventEmitter } from "node:events";
import { createAlert } from "../utils/createAlert.js";

export const sightingsEvent = new EventEmitter();

sightingsEvent.on("sighting-added", createAlert);
