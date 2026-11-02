import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {adaptMaps,MAP_FILES,center,reachable,canOccupy,move,PLAYER_RADIUS,inTrigger} from '../src/hai-uyen/maps.mjs';
const raw=MAP_FILES.map(f=>JSON.parse(readFileSync(new URL(`../data/hai-uyen/${f}`,import.meta.url))));
export const maps=adaptMaps(raw);
test('M4 dimensions, IDs, row lengths and every reciprocal anchor validate',()=>{
 assert.equal(Object.keys(maps).length,4);
 const bad=structuredClone(raw);bad[0].collision_rows[0]='#';assert.throws(()=>adaptMaps(bad),/grid/);
 const dup=structuredClone(raw);dup[0].entities.push(dup[0].entities[0]);assert.throws(()=>adaptMaps(dup),/Duplicate/);
 for(const m of Object.values(maps)) for(const t of m.entities.filter(e=>e.type==='transition')) {
  const a=maps[t.target].entities.find(e=>e.id===t.entry_anchor);assert.equal(canOccupy(maps[t.target],center(a),{},PLAYER_RADIUS),true);assert.equal(maps[t.target].entities.some(e=>e.type==='transition'&&inTrigger(center(a),e)),false);
 }
});
test('actual Quy collider reaches all required receivers; gates block then open before BFS',()=>{
 for(const m of Object.values(maps)) {
  const a=m.entities.find(e=>e.type==='spawn'||e.type==='entry_anchor');
  const closed=reachable(m,center(a));
  const flags={'vs.lab.valve_a_primed':true,'vs.lab.valve_b_stable':true,'vs.arena.boss_defeated':true};
  const open=reachable(m,center(a),flags);
  for(const e of m.entities.filter(e=>e.x!==undefined && !['dynamic_gate','decor','landmark'].includes(e.type))) {
   assert(open.has(`${e.x},${e.y}`),`${m.id}/${e.id} reachable with gate open`);
   if(e.type==='checkpoint'||e.type==='puzzle_valve'||e.type==='boss_spawn')assert(closed.has(`${e.x},${e.y}`),e.id);
  }
  if(m.id==='VS-LAB')assert(!closed.has('46,20')&&open.has('46,20'));
  if(m.id==='VS-ARENA')assert(!closed.has('44,26')&&open.has('44,26'));
 }
});
test('swept collision prevents tunnelling and diagonal corner penetration for multiple radii',()=>{
 const m=maps['VS-A1'];
 for(const r of [6,10,14]) {
  const p=center({x:2,y:4});const q=move(m,p,400,0,{},r);assert(q.x<=96-r+.001);assert(canOccupy(m,q,{},r));
  const z=move(m,center({x:2,y:2}),250,250,{},r);assert(canOccupy(m,z,{},r));
 }
 const lab=maps['VS-LAB'];assert(!canOccupy(lab,center({x:39,y:20}),{}));assert(canOccupy(lab,center({x:39,y:20}),{'vs.lab.valve_b_stable':true}));
});
