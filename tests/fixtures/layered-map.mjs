/** Fixture hình học debug, không là Chapter I production content hoặc avatar Quy. */
export function createMapFixture() {
  const width = 320, height = 240, tileWidth = 16, tileHeight = 16;
  const grid = value => Array.from({ length: 15 }, () => Array(20).fill(value));
  const cells = grid(false);
  cells[2][2] = true;
  const base = grid('water'), decor = grid(null);
  decor[5][7] = 'sand';
  const layer = (layerId, phase, order, tiles, occlusionEligible = false) => ({ layerId, phase, order, visible: true, scrollFactor: { x: 1, y: 1 }, occlusionEligible, ...(tiles ? { tiles } : {}) });
  return {
    tilesets: { 'fixture.palette': { debug: true, tiles: { water: { color: '#174559' }, sand: { color: '#b3b98c' }, coral: { color: '#c26977' }, marker: { color: '#f9db75' } } } },
    map: {
      metadataVersion: 1, debug: true, mapId: 'fixture.layered-water', sceneId: 'fixture.map-harness', width, height, tileWidth, tileHeight, tilesetRef: 'fixture.palette',
      layers: [layer('background', 'background', 0), layer('base', 'terrain', 0, base), layer('decor', 'ground', 0, decor), layer('scenery', 'depth', 0, undefined, true), layer('foreground', 'foreground', 0, undefined, true)],
      collision: { cells, rects: [{ x: 130, y: 130, width: 12, height: 10 }] },
      objects: [
        { objectId: 'fixture.coral', layerId: 'scenery', tileId: 'coral', x: 112, y: 112, width: 48, height: 64, anchor: [24, 64], occlusion: { enabled: true, alpha: 0.4, duration: 0.2, margin: 4 } },
        { objectId: 'fixture.marker', layerId: 'decor', tileId: 'marker', x: 200, y: 160, width: 8, height: 8, anchor: [4, 4] },
      ],
      spawnAnchors: [{ anchorId: 'fixture.entry', x: 64, y: 80 }],
      cameraBounds: { x: 0, y: 0, width, height },
      currentFields: [{ currentId: 'fixture.flow', mapId: 'fixture.layered-water', bounds: { x: 160, y: 32, width: 80, height: 64 }, direction: { x: 3, y: 4 }, strength: 1, enabled: true }],
    },
  };
}
