import { buildDawnMap } from "./DawnMap.mjs";
import { buildDawnSample } from "./DawnSample.mjs";
export const ISLANDS = {
  dawn: buildDawnMap(),
  "dawn-sample": buildDawnSample(),
};
export const FIRST_ISLAND = "dawn";
export function getIsland(id) {
  const map = ISLANDS[id];
  if (!map) throw new Error(`Unknown island: ${id}`);
  return map;
}
