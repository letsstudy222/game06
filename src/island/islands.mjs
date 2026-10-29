import { buildDawnMap } from "./DawnMap.mjs";
export const ISLANDS = { dawn: buildDawnMap() };
export const FIRST_ISLAND = "dawn";
export function getIsland(id) {
  const map = ISLANDS[id];
  if (!map) throw new Error(`Unknown island: ${id}`);
  return map;
}
