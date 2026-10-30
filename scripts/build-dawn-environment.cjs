/** Expand the approved sample kit, preserving its masters and comparison map. */
const fs = require('node:fs'), path = require('node:path');
const { Pixel, png } = require('./pixel-kit.cjs');
const { decode } = require('../tests/png.cjs');
const root = path.resolve(__dirname, '..'), source = path.join(root, 'assets/samples/dawn');
const out = path.join(root, 'assets/environments/dawn');
fs.mkdirSync(out, { recursive: true });
const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json')));
const env = manifest.environment, original = decode(path.join(source, 'objects.png'));
const definitions = structuredClone(env.definitions), sprites = [];
for (const def of definitions) {
  const p = new Pixel(96, 96), [sx, sy] = def.rect;
  for (let y = 0; y < 96; y++) for (let x = 0; x < 96; x++) {
    const at = ((sy + y) * original.width + sx + x) * 4;
    original.data.copy(p.data, (y * 96 + x) * 4, at, at + 4);
  }
  def.canopy = ['palm', 'broadleaf'].includes(def.id);
  sprites.push(p);
}
function add(id, draw, footprint) {
  const p = new Pixel(96, 96); draw(p);
  const frame = sprites.length;
  let l = 96, t = 96, r = 0, b = 0;
  for (let y = 0; y < 96; y++) for (let x = 0; x < 96; x++)
    if (p.data[(y * 96 + x) * 4 + 3]) { l = Math.min(l,x); t = Math.min(t,y); r = Math.max(r,x); b = Math.max(b,y); }
  definitions.push({ id, frame, rect: [(frame % 4)*96, Math.floor(frame/4)*96,96,96], origin:[48,90], bounds:[l,t,r,b], footprint,
    source: { file: 'scripts/build-dawn-environment.cjs', method: 'approved palette pixel extension' } });
  sprites.push(p);
}
// A real thorn silhouette, keeping the original walk-through damage footprint.
add('bramble', p => {
  p.poly([[30,87],[35,78],[45,76],[54,78],[65,85],[60,89],[34,89]], '#346b4c');
  for (const [x,y,dx] of [[33,86,7],[41,88,-4],[49,87,5],[58,87,-6]]) {
    p.line(x,y,x+dx,y-12,'#66533a'); p.line(x+1,y,x+dx+1,y-12,'#a08550');
    p.line(x+dx,y-9,x+dx-4,y-12,'#e4d29b');
    p.line(x+dx,y-6,x+dx+4,y-10,'#d2be87');
    p.rect(x-2,y-3,5,2,'#467e4e'); p.p(x,y-4,'#9fba5e');
  }
}, {kind:'hazard', radius:10, solid:false});
add('shell', p => {
  p.poly([[43,87],[41,83],[43,79],[47,77],[51,79],[54,84],[51,87]], '#d2be87');
  p.poly([[43,84],[43,81],[47,78],[51,81],[52,84]], '#f3e1b3');
  for (let x = 44; x <= 50; x += 3) p.line(47,86,x,80,'#baa56a');
  p.line(44,87,51,87,'#a08550');
}, {kind:'decoration', radius:0, solid:false});
// Reuse the approved driftwood for the legacy log ID, with its own collider.
add('log', p => p.blit(sprites[11],0,0), {kind:'circle', radius:16, solid:true});
function variant(id, base, scale, lean, footprint) {
  add(id, p => {
    const src = sprites[base];
    for (let y=4;y<90;y++) for(let x=4;x<92;x++) {
      const sy = Math.floor(90+(y-90)/scale), sx = Math.floor(48+(x-48-lean*(90-y)/86)/scale);
      if(sx<0||sx>=96||sy<0||sy>=96) continue;
      const at=(sy*96+sx)*4; if(src.data[at+3]) src.data.copy(p.data,(y*96+x)*4,at,at+4);
    }
  }, footprint);
  definitions.at(-1).canopy = base < 2;
  definitions.at(-1).source = {file:'assets/samples/dawn/objects.png', id:env.definitions[base].id, method:'nearest-neighbor silhouette variant', scale, lean};
}
variant('palmLeaning',0,0.88,10,{kind:'trunk',radius:5,solid:true});
variant('broadleafYoung',1,0.8,-5,{kind:'trunk',radius:5,solid:true});
variant('coastalRock',3,0.72,0,{kind:'circle',radius:6.4,solid:true});
const props = new Pixel(384,Math.ceil(sprites.length/4)*96);
const shadows = new Pixel(512,Math.ceil(sprites.length/4)*128);
for (const [frame,p] of sprites.entries()) {
  props.blit(p,(frame%4)*96,Math.floor(frame/4)*96);
  const shadow = new Pixel(128,128), def = definitions[frame];
  for(let y=0;y<96;y++) for(let x=0;x<96;x++) if(p.data[(y*96+x)*4+3]) {
    const height=90-y, px=Math.round(48+(x-48)*0.6+height*0.42), py=Math.round(64+height*0.23);
    for(let dy=0;dy<2;dy++) for(let dx=0;dx<2;dx++) {
      const i=((py+dy)*128+px+dx)*4; shadow.data.set([23,62,88,48],i);
    }
  }
  const contact = def.id === 'shell' ? 4 : 8;
  for(let y=63;y<=66;y++) for(let x=48-contact;x<=48+contact;x++) shadow.data.set([20,47,54,90],(y*128+x)*4);
  shadows.blit(shadow,(frame%4)*128,Math.floor(frame/4)*128);
  def.shadow={rect:[(frame%4)*128,Math.floor(frame/4)*128,128,128],origin:[48,64]};
}
png(props,path.join(out,'objects.png')); png(shadows,path.join(out,'shadows.png'));
fs.copyFileSync(path.join(source,'terrain.png'),path.join(out,'terrain.png'));
env.profile='sun-ruins'; env.definitions=definitions;
for(const [key,file] of [['tiles','terrain.png'],['props','objects.png'],['shadows','shadows.png']]) env[key]='assets/environments/dawn/'+file;
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Dawn environment:',Object.keys(env.tileDefinitions).length,'terrain frames,',definitions.length,'props with shadows');
