import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMapFixture } from './fixtures/layered-map.mjs';
import { validateMapDefinitions, assertMapDefinition, isSolidAt } from '../src/island/MapDefinition.mjs';
import { LayeredMapView } from '../src/island/LayeredMapView.mjs';
import { prepareCurrentFields, getCurrentAt } from '../src/island/CurrentFields.mjs';
import { OcclusionFade } from '../src/island/OcclusionFade.mjs';
import { visibleCells, WorldLayer } from '../src/island/WorldLayer.mjs';
import { ISLANDS, FIRST_ISLAND } from '../src/island/islands.mjs';
import { canOccupy } from '../src/island/geometry.mjs';
import fs from 'node:fs';
const invalid = (mutate, code) => {
  const f = createMapFixture(); mutate(f.map, f.tilesets);
  const errors = validateMapDefinitions([f.map], f.tilesets).filter(d => d.severity === 'error');
  assert(errors.length > 0); if (code) assert.equal(errors[0].code, code);
};
const fixtureFields = () => { const { map } = createMapFixture(); return { map, fields: prepareCurrentFields(map.currentFields, map) }; };
const context = () => ({ globalAlpha: 1, imageSmoothingEnabled: true, save(){}, restore(){}, translate(){}, fillRect(){}, drawImage(){}, beginPath(){}, moveTo(){}, lineTo(){}, stroke(){}, strokeRect(){} });
const occluder = (objectId = 'a', x = 10) => ({ objectId, bounds: { x, y: 10, width: 30, height: 30 }, eligible: true, occlusion: { enabled: true, alpha: 0.4, duration: 0.2, margin: 4 } });
const actor = { x: 20, y: 20, width: 5, height: 5 };
test('valid layered fixture warns debug but has no errors', () => {
  const f = createMapFixture(); assert.equal(validateMapDefinitions([f.map], f.tilesets).filter(d => d.severity === 'error').length, 0);
  assert.equal(validateMapDefinitions([f.map], f.tilesets)[0].code, 'DEBUG_MAP');
});
test('duplicate map IDs rejected', () => { const f = createMapFixture(); assert.equal(validateMapDefinitions([f.map, f.map], f.tilesets).at(-1).code, 'MAP_ID_DUPLICATE'); });
test('dimensions must be integer and grid-aligned', () => { for (const width of [0, -1, 319, NaN, Infinity]) invalid(m => m.width = width, 'MAP_DIMENSIONS'); });
test('metadata version unsupported fails', () => invalid(m => m.metadataVersion = 2, 'MAP_VERSION'));
test('missing tileset fails', () => invalid(m => m.tilesetRef = 'absent', 'TILESET_REF'));
test('unknown tile reference fails', () => invalid(m => m.layers[1].tiles[0][0] = 'unknown', 'TILE_REF'));
test('layer dimensions and duplicate layer IDs fail', () => { invalid(m => m.layers[1].tiles.pop(), 'LAYER_SIZE'); invalid(m => m.layers[1].layerId = m.layers[0].layerId, 'LAYER_ID'); });
test('invalid collision values or rectangles fail', () => { invalid(m => m.collision.cells[0][0] = 'water', 'COLLISION'); invalid(m => m.collision.rects[0].x = 400, 'COLLISION_RECT'); });
test('valid spawn and out-of-map or blocked spawn validation', () => {
  const { map } = createMapFixture(); assert.equal(isSolidAt(map, map.spawnAnchors[0]), false);
  invalid(m => m.spawnAnchors[0].x = -1, 'SPAWN_BLOCKED');
  invalid(m => Object.assign(m.spawnAnchors[0], { x: 40, y: 40 }), 'SPAWN_BLOCKED');
  invalid(m => m.spawnAnchors = [], 'SPAWNS');
});
test('art changes do not change collision; water can be passable locally', () => {
  const { map } = createMapFixture(); const before = isSolidAt(map, { x: 40, y: 40 });
  map.layers[1].tiles[2][2] = 'sand'; assert.equal(isSolidAt(map, { x: 40, y: 40 }), before);
  assert.equal(isSolidAt(map, { x: 24, y: 24 }), false);
  assert.equal(isSolidAt(map, { x: 135, y: 135 }), true);
});
test('object IDs, layer references and occlusion flags validate', () => {
  invalid(m => m.objects.push(structuredClone(m.objects[0])), 'OBJECT_ID');
  invalid(m => m.objects[0].layerId = 'absent', 'OBJECT_LAYER');
  invalid(m => m.layers[3].occlusionEligible = false, 'OCCLUSION_LAYER');
  invalid(m => m.objects[0].occlusion.alpha = 0, 'OCCLUSION');
});
test('parallax limited to non-interactive background', () => { invalid(m => m.layers[1].scrollFactor.x = 0.5, 'PARALLAX_SCOPE'); const f = createMapFixture(); f.map.layers[0].scrollFactor.x = 0.5; assertMapDefinition(f.map, f.tilesets); });
test('camera bounds must fit map', () => invalid(m => m.cameraBounds.width = 1000, 'CAMERA_BOUNDS'));
test('invalid required map fails at view construction, no silent fallback', () => { const f = createMapFixture(); f.map.layers[1].tiles[0][0] = 'unknown'; assert.throws(() => new LayeredMapView(f.map, f.tilesets), /TILE_REF/); });
test('static layer ordering and dynamic depth ordering are explicit', () => {
  const f = createMapFixture(); f.map.layers.reverse(); const view = new LayeredMapView(f.map, f.tilesets), drawn = [];
  view.draw(context(), { camera: { x: 0, y: 0 }, width: 160, height: 120, actors: [
    { actorId: 'late', depthY: 80, renderOrder: 2, draw: () => drawn.push('late') },
    { actorId: 'early', depthY: 80, renderOrder: 1, draw: () => drawn.push('early') },
  ] });
  assert.deepEqual(drawn, ['early', 'late']); assert.equal(view.layers[0].phase, 'background');
});
test('tile culling visits only camera cells including rectangular tiles', () => {
  const cells = [...visibleCells(100, 100, 16, 8, { x: 16, y: 8 }, 32, 16)];
  assert.deepEqual(cells, [{ column: 1, row: 1 }, { column: 2, row: 1 }, { column: 1, row: 2 }, { column: 2, row: 2 }]);
  const f = createMapFixture(), view = new LayeredMapView(f.map, f.tilesets);
  view.draw(context(), { camera: { x: 0, y: 0 }, width: 32, height: 32 }); assert.equal(view.drawCount, 4);
});
test('occlusion entry fades over time, does not pop', () => { const fade = new OcclusionFade(); fade.update([occluder()], actor, 0.1); assert.equal(fade.alpha('a'), 0.7); fade.update([occluder()], actor, 0.1); assert.equal(fade.alpha('a'), 0.4); });
test('occlusion exit restores opacity', () => { const fade = new OcclusionFade(); fade.update([occluder()], actor, 0.1); fade.update([occluder()], null, 0.1); assert.equal(fade.alpha('a'), 1); });
test('multiple overlapping occluders have independent fades', () => { const fade = new OcclusionFade(); fade.update([occluder('a'), occluder('b')], actor, 0.1); assert.equal(fade.alpha('a'), 0.7); assert.equal(fade.alpha('b'), 0.7); });
test('distant objects and explicit bypass remain opaque', () => { const fade = new OcclusionFade(), bypass = occluder('b'); bypass.occlusion.enabled = false; fade.update([occluder('far', 1000), bypass], actor, 0.1); assert.equal(fade.alpha('far'), 1); assert.equal(fade.alpha('b'), 1); });
test('hysteresis prevents boundary flicker and eventually releases', () => {
  const fade = new OcclusionFade(); fade.update([occluder()], actor, 0.1);
  fade.update([occluder()], { x: 41, y: 20, width: 5, height: 5 }, 0.1); assert.equal(fade.alpha('a'), 0.4);
  fade.update([occluder()], { x: 45, y: 20, width: 5, height: 5 }, 0.1); assert.equal(fade.alpha('a'), 0.7);
});
test('occlusion reset/removal cleans transient state; invalid dt fails', () => { const fade = new OcclusionFade(); fade.update([occluder()], actor, 0.1); fade.update([], null, 0); assert.equal(fade.states.size, 0); fade.reset(); assert.throws(() => fade.update([], null, NaN)); });
test('map snapshot immutable, actor/world/collision not mutated by fade', () => {
  const f = createMapFixture(), before = JSON.stringify(f.map), view = new LayeredMapView(f.map, f.tilesets);
  const a = Object.freeze({ actorId: 'player', depthY: 88, renderOrder: 0, bounds: Object.freeze({ x: 108, y: 76, width: 8, height: 12 }), draw(){} });
  view.draw(context(), { camera: { x: 0, y: 0 }, width: 320, height: 240, actors: [a], focusActorId: 'player', deltaTime: 0.1 });
  assert.equal(view.occlusion.alpha('fixture.coral'), 0.7); assert.equal(JSON.stringify(f.map), before); assert(Object.isFrozen(view.map.collision.cells)); view.dispose(); assert.equal(view.occlusion.states.size, 0);
});
test('current vectors normalize and remain immutable', () => { const { fields } = fixtureFields(); assert.deepEqual(fields[0].direction, { x: 0.6, y: 0.8 }); assert(Object.isFrozen(fields[0].direction)); });
test('zero strength and zero direction produce no force', () => { const { map } = createMapFixture(); Object.assign(map.currentFields[0], { direction: { x: 0, y: 0 }, strength: 0 }); const fields = prepareCurrentFields(map.currentFields, map); assert.equal(getCurrentAt({ x: 180, y: 50 }, fields)[0].strength, 0); });
test('malformed current vector, strength, bounds and map reference rejected', () => {
  for (const change of [f => f.direction.x = NaN, f => f.strength = -1, f => f.bounds.width = 500, f => f.mapId = 'other', f => f.direction = { x: 0, y: 0 }]) invalid(m => change(m.currentFields[0]));
});
test('current bounds use half-open edges', () => { const { fields } = fixtureFields(); assert.equal(getCurrentAt({ x: 160, y: 32 }, fields).length, 1); assert.equal(getCurrentAt({ x: 240, y: 32 }, fields).length, 0); });
test('overlapping currents returned separately, no force composition implied', () => {
  const { map } = createMapFixture(); map.currentFields.push({ ...map.currentFields[0], currentId: 'fixture.counterflow', direction: { x: -1, y: 0 } });
  const result = getCurrentAt({ x: 180, y: 50 }, prepareCurrentFields(map.currentFields, map)); assert.equal(result.length, 2); assert.deepEqual(result.map(f => f.currentId), ['fixture.counterflow', 'fixture.flow']);
});
test('current binding reads authority resolver, missing binding fails visibly', () => {
  const { map } = createMapFixture(); map.currentFields[0].stateBinding = 'fixture.event'; const fields = prepareCurrentFields(map.currentFields, map), p = { x: 180, y: 50 };
  assert.throws(() => getCurrentAt(p, fields), /CURRENT_BINDING/); assert.equal(getCurrentAt(p, fields, { resolveBinding: () => false }).length, 0); assert.equal(getCurrentAt(p, fields, { resolveBinding: () => true }).length, 1);
});
test('disabling current visuals does not change query or actor pose', () => {
  const f = createMapFixture(), view = new LayeredMapView(f.map, f.tilesets), p = Object.freeze({ x: 180, y: 50 }); const before = view.getCurrentAt(p);
  for (const debugCurrents of [false, true]) view.draw(context(), { camera: { x: 0, y: 0 }, width: 320, height: 240, debugCurrents });
  assert.deepEqual(view.getCurrentAt(p), before); assert.deepEqual(p, { x: 180, y: 50 });
});
test('production tileset checks actual frame bounds and decoded image', () => {
  const f = createMapFixture(); const tiles = Object.fromEntries(Object.keys(f.tilesets['fixture.palette'].tiles).map(key => [key, { rect: [0, 0, 16, 16] }]));
  f.tilesets['fixture.palette'] = { width: 16, height: 16, tiles }; assertMapDefinition(f.map, f.tilesets);
  assert.throws(() => new LayeredMapView(f.map, f.tilesets), /MAP_IMAGE/);
  f.tilesets['fixture.palette'].tiles.water.rect = [10, 0, 16, 16]; assert.throws(() => assertMapDefinition(f.map, f.tilesets), /atlas/);
});
test('existing Dawn registration, collision semantics and culling stay compatible', () => {
  assert.equal(FIRST_ISLAND, 'dawn'); assert.deepEqual(Object.keys(ISLANDS), ['dawn', 'dawn-sample']);
  for (const island of Object.values(ISLANDS)) {
    assert.equal(canOccupy(island, island.spawn), true); assert.equal(canOccupy(island, { x: 0, y: 0 }), false);
    const layer = new WorldLayer(null, island, {}); assert.equal(layer.visibleTiles({ x: 0, y: 0 }, 64, 64).length, 4);
    assert.equal(JSON.parse(fs.readFileSync(new URL('../' + island.assetManifest, import.meta.url))).environment.kind, 'tilemap');
  }
});
