import { prepareCurrentFields } from './CurrentFields.mjs';
import { prepareSpriteFrame } from './RenderPrimitives.mjs';
export const MAP_PHASES = Object.freeze(['background', 'terrain', 'ground', 'behind', 'depth', 'foreground', 'effects', 'indicators']);
const id = value => typeof value === 'string' && /^[a-zA-Z][\w.-]*$/.test(value);
const positiveInt = value => Number.isSafeInteger(value) && value > 0;
const finite = (...values) => values.every(Number.isFinite);
export const overlaps = (a, b, margin = 0) => a.x - margin < b.x + b.width && a.x + a.width + margin > b.x && a.y - margin < b.y + b.height && a.y + a.height + margin > b.y;
export function objectBounds(object) {
  return { x: object.x - object.anchor[0], y: object.y - object.anchor[1], width: object.width, height: object.height };
}
/** Query điểm tối thiểu; không thay solver/radius/motion của Phượng. */
export function isSolidAt(map, point) {
  if (!finite(point.x, point.y) || point.x < 0 || point.y < 0 || point.x >= map.width || point.y >= map.height) return true;
  return map.collision.cells[Math.floor(point.y / map.tileHeight)][Math.floor(point.x / map.tileWidth)] || map.collision.rects.some(r => point.x >= r.x && point.y >= r.y && point.x < r.x + r.width && point.y < r.y + r.height);
}
export function validateMapDefinitions(maps, tilesets) {
  const diagnostics = [], mapIds = new Set();
  if (!Array.isArray(maps)) return [{ severity: 'error', code: 'MAP_LIST', message: 'Cần danh sách map' }];
  for (const map of maps) {
    const check = (ok, code, message) => { if (!ok) throw Object.assign(Error(message), { code }); };
    try {
      check(map && id(map.mapId), 'MAP_ID', 'mapId không hợp lệ');
      check(!mapIds.has(map.mapId), 'MAP_ID_DUPLICATE', 'mapId trùng'); mapIds.add(map.mapId);
      check(map.metadataVersion === 1, 'MAP_VERSION', 'metadataVersion chưa hỗ trợ');
      check(id(map.sceneId), 'SCENE_REF', 'sceneId phải là reference');
      check([map.width, map.height, map.tileWidth, map.tileHeight].every(positiveInt) && map.width % map.tileWidth === 0 && map.height % map.tileHeight === 0, 'MAP_DIMENSIONS', 'Kích thước phải nguyên dương và chia hết grid');
      const columns = map.width / map.tileWidth, rows = map.height / map.tileHeight;
      const rect = b => b && finite(b.x, b.y, b.width, b.height) && b.x >= 0 && b.y >= 0 && b.width > 0 && b.height > 0 && b.x + b.width <= map.width && b.y + b.height <= map.height;
      const grid = cells => Array.isArray(cells) && cells.length === rows && cells.every(row => Array.isArray(row) && row.length === columns);
      const tileset = tilesets && Object.hasOwn(tilesets, map.tilesetRef) && tilesets[map.tilesetRef];
      check(id(map.tilesetRef) && tileset && tileset.tiles && typeof tileset.tiles === 'object', 'TILESET_REF', 'Không tìm thấy tileset');
      check(tileset.debug !== true || map.debug === true, 'DEBUG_TILESET', 'Palette debug không phải production asset');
      for (const [tileId, tile] of Object.entries(tileset.tiles)) {
        check(id(tileId) && tile, 'TILE_ID', 'Tile definition không hợp lệ');
        if (tileset.debug === true) check(typeof tile.color === 'string' && /^#[0-9a-f]{6}$/i.test(tile.color), 'DEBUG_COLOR', 'Màu debug phải #RRGGBB');
        else prepareSpriteFrame({ rect: tile.rect, anchor: [0, 0] }, { width: tileset.width, height: tileset.height });
      }
      const tileExists = tile => tile === null || (typeof tile === 'string' && Object.hasOwn(tileset.tiles, tile));
      check(Array.isArray(map.layers) && map.layers.length > 0, 'LAYERS', 'Cần layers');
      const layerIds = new Set();
      for (const layer of map.layers) {
        check(layer && id(layer.layerId) && !layerIds.has(layer.layerId), 'LAYER_ID', 'ID layer thiếu hoặc trùng'); layerIds.add(layer.layerId);
        check(MAP_PHASES.includes(layer.phase) && Number.isSafeInteger(layer.order), 'LAYER_ORDER', 'Phase/order không hợp lệ');
        check(typeof layer.visible === 'boolean' && typeof layer.occlusionEligible === 'boolean', 'LAYER_FLAGS', 'Layer flags phải boolean');
        check(layer.scrollFactor && finite(layer.scrollFactor.x, layer.scrollFactor.y) && layer.scrollFactor.x >= 0 && layer.scrollFactor.y >= 0, 'SCROLL_FACTOR', 'Scroll factor không hợp lệ');
        check(layer.phase === 'background' || (layer.scrollFactor.x === 1 && layer.scrollFactor.y === 1), 'PARALLAX_SCOPE', 'Parallax chỉ cho background không tương tác');
        check(!layer.occlusionEligible || ['depth', 'foreground'].includes(layer.phase), 'OCCLUSION_LAYER', 'Chỉ depth/foreground có fade object');
        if (layer.tiles !== undefined) {
          check(layer.phase !== 'depth', 'DEPTH_GRID', 'Depth phase chỉ chứa objects/actors');
          check(grid(layer.tiles), 'LAYER_SIZE', `Grid sai kích thước: ${layer.layerId}`);
          check(layer.tiles.every(row => row.every(tileExists)), 'TILE_REF', `Tile reference không tồn tại: ${layer.layerId}`);
        }
      }
      check(map.collision && grid(map.collision.cells) && map.collision.cells.every(row => row.every(v => typeof v === 'boolean')) && Array.isArray(map.collision.rects), 'COLLISION', 'Collision cần boolean grid và rects riêng');
      check(map.collision.rects.every(rect), 'COLLISION_RECT', 'Solid rect ngoài map');
      check(rect(map.cameraBounds), 'CAMERA_BOUNDS', 'Camera bounds ngoài map');
      check(Array.isArray(map.objects), 'OBJECTS', 'Cần objects array');
      const objectIds = new Set();
      for (const object of map.objects) {
        check(object && id(object.objectId) && !objectIds.has(object.objectId), 'OBJECT_ID', 'ID object thiếu hoặc trùng'); objectIds.add(object.objectId);
        check(layerIds.has(object.layerId), 'OBJECT_LAYER', 'Object trỏ layer thiếu');
        check(finite(object.x, object.y) && positiveInt(object.width) && positiveInt(object.height) && Array.isArray(object.anchor) && object.anchor.length === 2 && finite(...object.anchor) && object.anchor[0] >= 0 && object.anchor[1] >= 0 && object.anchor[0] <= object.width && object.anchor[1] <= object.height, 'OBJECT_BOUNDS', 'Object/anchor không hợp lệ');
        check(rect(objectBounds(object)) && typeof object.tileId === 'string' && tileExists(object.tileId), 'OBJECT_VISUAL', 'Object ngoài map hoặc thiếu tile');
        check(object.depthY === undefined || Number.isFinite(object.depthY), 'OBJECT_DEPTH', 'Depth anchor không hợp lệ');
        if (object.occlusion !== undefined) {
          const o = object.occlusion;
          check(o && typeof o.enabled === 'boolean' && finite(o.alpha, o.duration, o.margin) && o.alpha > 0 && o.alpha <= 1 && o.duration >= 0 && o.margin >= 0, 'OCCLUSION', 'Fade tuning không hợp lệ');
          check(!o.enabled || map.layers.find(l => l.layerId === object.layerId).occlusionEligible, 'OCCLUSION_LAYER', 'Layer chưa cho fade');
        }
      }
      check(Array.isArray(map.spawnAnchors) && map.spawnAnchors.length > 0, 'SPAWNS', 'Thiếu spawn anchor');
      const spawnIds = new Set();
      for (const spawn of map.spawnAnchors) {
        check(spawn && id(spawn.anchorId) && !spawnIds.has(spawn.anchorId), 'SPAWN_ID', 'ID spawn thiếu hoặc trùng'); spawnIds.add(spawn.anchorId);
        check(!isSolidAt(map, spawn), 'SPAWN_BLOCKED', 'Spawn nằm ngoài map hoặc trong solid');
      }
      prepareCurrentFields(map.currentFields, map);
      if (map.debug === true) diagnostics.push({ severity: 'warning', code: 'DEBUG_MAP', mapId: map.mapId, message: 'Fixture kỹ thuật; không phải map production' });
    } catch (error) {
      diagnostics.push({ severity: 'error', code: error.code || 'MAP_CONTENT', mapId: map?.mapId, message: error.message });
    }
  }
  return diagnostics;
}
export function assertMapDefinition(map, tilesets) {
  const errors = validateMapDefinitions([map], tilesets).filter(d => d.severity === 'error');
  if (errors.length) throw Error(errors.map(d => `${d.code} [${d.mapId ?? '?'}]: ${d.message}`).join('\n'));
  return map;
}
