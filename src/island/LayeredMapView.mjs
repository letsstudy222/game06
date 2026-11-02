import { assertMapDefinition, MAP_PHASES, objectBounds, overlaps } from './MapDefinition.mjs';
import { visibleCells } from './WorldLayer.mjs';
import { compareRenderDepth, prepareSpriteFrame, drawPreparedSprite } from './RenderPrimitives.mjs';
import { prepareCurrentFields, getCurrentAt } from './CurrentFields.mjs';
import { OcclusionFade } from './OcclusionFade.mjs';
const freeze = object => {
  if (object && typeof object === 'object') { Object.values(object).forEach(freeze); Object.freeze(object); }
  return object;
};
/** Adapter bổ sung; không thay IslandScene, loop hoặc actor controller hiện hữu. */
export class LayeredMapView {
  constructor(map, tilesets) {
    assertMapDefinition(map, tilesets);
    this.map = freeze(structuredClone(map));
    const source = tilesets[map.tilesetRef];
    this.tileset = { ...source, tiles: structuredClone(source.tiles) };
    this.frames = new Map();
    if (source.debug !== true) {
      if (!source.image || source.image.naturalWidth !== source.width || source.image.naturalHeight !== source.height) throw Error('MAP_IMAGE: tileset phải được decode và khớp dimensions');
      for (const [key, tile] of Object.entries(source.tiles)) this.frames.set(key, prepareSpriteFrame({ rect: tile.rect, anchor: [0, 0] }, source));
    }
    this.layers = this.map.layers.map((layer, index) => ({ ...layer, index })).sort((a, b) => MAP_PHASES.indexOf(a.phase) - MAP_PHASES.indexOf(b.phase) || a.order - b.order || a.index - b.index);
    this.objects = new Map(this.layers.map(layer => [layer.layerId, this.map.objects.filter(o => o.layerId === layer.layerId)]));
    this.currentFields = prepareCurrentFields(this.map.currentFields, this.map);
    this.occlusion = new OcclusionFade();
    this.drawCount = 0;
  }
  getCurrentAt(position, mapState) { return getCurrentAt(position, this.currentFields, mapState); }
  tile(ctx, tileId, bounds) {
    if (tileId === null) return;
    if (this.tileset.debug === true) {
      ctx.fillStyle = this.tileset.tiles[tileId].color;
      ctx.fillRect(Math.round(bounds.x), Math.round(bounds.y), bounds.width, bounds.height);
    } else {
      const frame = this.frames.get(tileId);
      // Map tile/object size is presentation data, not a collision footprint.
      const [sx, sy, sw, sh] = frame.rect;
      if (sw === bounds.width && sh === bounds.height) drawPreparedSprite(ctx, this.tileset.image, frame, bounds);
      else ctx.drawImage(this.tileset.image, sx, sy, sw, sh, Math.round(bounds.x), Math.round(bounds.y), bounds.width, bounds.height);
    }
    this.drawCount++;
  }
  draw(ctx, { camera, width, height, actors = [], focusActorId, deltaTime = 0, debugCurrents = false, mapState }) {
    if (![camera.x, camera.y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) throw Error('MAP_VIEWPORT: viewport không hợp lệ');
    const actorIds = new Set(), actorOrders = new Set();
    for (const actor of actors) {
      if (!actor.actorId || actorIds.has(actor.actorId) || !Number.isFinite(actor.depthY) || (!Number.isSafeInteger(actor.renderOrder) || actor.renderOrder < 0 || actorOrders.has(actor.renderOrder)) || typeof actor.draw !== 'function') throw Error('MAP_ACTOR: actor render view không hợp lệ');
      actorIds.add(actor.actorId); actorOrders.add(actor.renderOrder);
    }
    const focus = actors.find(a => a.actorId === focusActorId);
    if (focus && !focus.bounds) throw Error('MAP_ACTOR_BOUNDS: focus actor cần visible bounds');
    const fadeObjects = this.layers.flatMap(layer => (this.objects.get(layer.layerId) || []).map(object => ({
      objectId: object.objectId, bounds: objectBounds(object), occlusion: object.occlusion,
      eligible: layer.visible && layer.occlusionEligible && (layer.phase === 'foreground' || (layer.phase === 'depth' && focus && (object.depthY ?? object.y) > focus.depthY)),
    })));
    this.occlusion.update(fadeObjects, focus?.bounds, deltaTime);
    this.drawCount = 0;
    const viewport = { x: Math.round(camera.x), y: Math.round(camera.y), width, height };
    const drawObject = object => {
      const bounds = objectBounds(object);
      if (!overlaps(bounds, viewport)) return;
      ctx.save();
      try { ctx.globalAlpha *= this.occlusion.alpha(object.objectId); this.tile(ctx, object.tileId, bounds); }
      finally { ctx.restore(); }
    };
    const drawDepth = () => {
      const items = [];
      for (const layer of this.layers.filter(l => l.visible && l.phase === 'depth'))
        for (const object of this.objects.get(layer.layerId)) items.push({ depthY: object.depthY ?? object.y, renderOrder: items.length, draw: () => drawObject(object) });
      const count = items.length;
      for (const actor of actors) items.push({ ...actor, renderOrder: count + actor.renderOrder });
      items.sort(compareRenderDepth);
      for (const item of items) item.draw(ctx);
    };
    ctx.save();
    try {
      ctx.imageSmoothingEnabled = false;
      let depthDrawn = false;
      for (const layer of this.layers) {
        const phase = MAP_PHASES.indexOf(layer.phase);
        if (!depthDrawn && phase >= MAP_PHASES.indexOf('depth')) {
          ctx.save(); ctx.translate(-viewport.x, -viewport.y);
          try { drawDepth(); } finally { ctx.restore(); }
          depthDrawn = true;
        }
        if (!layer.visible || layer.phase === 'depth') continue;
        const cam = { x: Math.round(camera.x * layer.scrollFactor.x), y: Math.round(camera.y * layer.scrollFactor.y) };
        ctx.save(); ctx.translate(-cam.x, -cam.y);
        try {
          if (layer.tiles) for (const { column, row } of visibleCells(this.map.width / this.map.tileWidth, this.map.height / this.map.tileHeight, this.map.tileWidth, this.map.tileHeight, cam, width, height))
            this.tile(ctx, layer.tiles[row][column], { x: column * this.map.tileWidth, y: row * this.map.tileHeight, width: this.map.tileWidth, height: this.map.tileHeight });
          for (const object of this.objects.get(layer.layerId)) {
            if (layer.phase === 'background') {
              const bounds = objectBounds(object);
              if (overlaps(bounds, { ...cam, width, height })) this.tile(ctx, object.tileId, bounds);
            } else drawObject(object);
          }
        } finally { ctx.restore(); }
      }
      if (!depthDrawn) {
        ctx.save(); ctx.translate(-viewport.x, -viewport.y);
        try { drawDepth(); } finally { ctx.restore(); }
      }
      if (debugCurrents) {
        ctx.save(); ctx.translate(-viewport.x, -viewport.y);
        try {
          ctx.strokeStyle = '#ffffff';
          for (const field of this.currentFields) {
            const b = field.bounds, center = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
            if (!overlaps(b, viewport) || !this.getCurrentAt(center, mapState).includes(field)) continue;
            ctx.strokeRect(b.x, b.y, b.width, b.height);
            ctx.beginPath(); ctx.moveTo(center.x, center.y);
            ctx.lineTo(center.x + field.direction.x * 12, center.y + field.direction.y * 12); ctx.stroke();
          }
        } finally { ctx.restore(); }
      }
    } finally { ctx.restore(); }
  }
  dispose() { this.occlusion.reset(); this.frames.clear(); }
}
