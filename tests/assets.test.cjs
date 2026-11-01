const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const { validateManifest, validateProjectAssets, safeFile } = require('../scripts/validate-assets.cjs');
const repo = path.resolve(__dirname,'..'), roots=[];
after(()=>{ for(const root of roots) fs.rmSync(root,{recursive:true,force:true}); });
function fixture() {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'asset-contract-'));roots.push(root);
  fs.mkdirSync(path.join(root,'assets/test'),{recursive:true});
  fs.copyFileSync(path.join(repo,'assets/production/phoenix/atlas.png'),path.join(root,'assets/test/image.png'));
  const manifest={assetContractVersion:1,assets:[{id:'fixture.actor',type:'sprite-atlas',path:'assets/test/image.png',width:192,height:288,frames:[{id:'frame.idle',rect:[0,0,96,96],anchor:[48,72],bounds:[19,18,79,75]}],clips:[{id:'clip.idle',frameIds:['frame.idle'],durationMs:250,loop:true}],requiredClips:['clip.idle']}]};
  return {root,manifest};
}
const codes=r=>r.diagnostics.filter(d=>d.severity==='error').map(d=>d.code);
function invalid(change,code) {const f=fixture();change(f.manifest,f.root);const r=validateManifest(f.manifest,{root:f.root,label:'fixture'});assert(codes(r).includes(code),JSON.stringify(r));assert(r.diagnostics.every(d=>d.location&&d.message));}
test('three existing tilemap manifests and Phoenix atlas remain compatible',()=>{const r=validateProjectAssets();assert.deepEqual(codes(r),[]);assert.equal(r.files.length,9);});
test('minimal future sprite fixture has typed frame/clip metadata',()=>{const f=fixture();assert.deepEqual(codes(validateManifest(f.manifest,{root:f.root})),[]);});
test('required absent image fails with contextual diagnostic',()=>invalid(m=>m.assets[0].path='assets/test/missing.png','MISSING_REQUIRED_ASSET'));
test('optional absent decoration warns without creating a fallback creature',()=>{const f=fixture();f.manifest.assets=[{id:'fixture.decor',type:'decoration',path:'assets/test/missing.png',required:false}];const r=validateManifest(f.manifest,{root:f.root});assert.deepEqual(codes(r),[]);assert.equal(r.diagnostics[0].code,'MISSING_OPTIONAL_ASSET');assert.deepEqual(r.files,[]);});
test('declared image dimensions must match real PNG',()=>invalid(m=>m.assets[0].height=287,'INVALID_DIMENSIONS'));
test('atlas grid frame dimensions are positive and divide the image',()=>invalid(m=>Object.assign(m.assets[0],{frameWidth:95,frameHeight:96}),'INVALID_DIMENSIONS'));
test('rect cannot extend beyond atlas',()=>invalid(m=>m.assets[0].frames[0].rect=[191,0,96,96],'INVALID_FRAME_BOUNDS'));
test('frame size zero is invalid',()=>invalid(m=>m.assets[0].frames[0].rect=[0,0,0,96],'INVALID_FRAME_BOUNDS'));
test('animation cannot reference an unknown frame',()=>invalid(m=>m.assets[0].clips[0].frameIds=['unknown'],'INVALID_ANIMATION_REFERENCE'));
test('duration must be finite and positive',()=>invalid(m=>m.assets[0].clips[0].durationMs=0,'INVALID_ANIMATION_DURATION'));
test('required clips must exist',()=>invalid(m=>m.assets[0].requiredClips.push('clip.move'),'MISSING_REQUIRED_CLIP'));
test('duplicate asset IDs rejected',()=>invalid(m=>m.assets.push(structuredClone(m.assets[0])),'DUPLICATE_ID'));
test('duplicate frame IDs rejected',()=>invalid(m=>m.assets[0].frames.push(structuredClone(m.assets[0].frames[0])),'DUPLICATE_ID'));
test('anchor and visual bounds must be finite and in frame',()=>invalid(m=>m.assets[0].frames[0].anchor=[Infinity,0],'INVALID_ANCHOR'));
test('invalid visual bounds rejected',()=>invalid(m=>m.assets[0].frames[0].bounds=[80,0,10,90],'INVALID_VISUAL_BOUNDS'));
test('traversal, encoded, absolute and remote paths are rejected',()=>{for(const name of ['assets/../image.png','assets/%2e%2e/image.png','/game06/assets/test/image.png','https://example.com/x.png','assets\\test\\image.png','assets/test/image.png?v=1'])invalid(m=>m.assets[0].path=name,'INVALID_PATH');});
test('symlink escape rejected',()=>{const f=fixture();fs.symlinkSync(os.tmpdir(),path.join(f.root,'assets/out'),'dir');assert.throws(()=>safeFile(f.root,'assets/out/anything.png'),/Symlink/);});
test('deployment prefix resolution stays relative to document URL',()=>{assert.equal(new URL('assets/test/image.png','https://example.test/game06/').pathname,'/game06/assets/test/image.png');const f=fixture();assert.equal(safeFile(f.root,'assets/test/image.png'),path.join(f.root,'assets/test/image.png'));});
test('unsupported format and checksum mismatch fail',()=>{invalid((m,r)=>fs.writeFileSync(path.join(r,m.assets[0].path),'not a PNG'),'UNSUPPORTED_FORMAT');invalid(m=>m.assets[0].sha256='0'.repeat(64),'CACHE_VERSION_MISMATCH');});
test('malformed contract reports rather than throws',()=>{for(const m of [null,[],{assetContractVersion:9,assets:[]},{assetContractVersion:1,assets:[null]}])assert(codes(validateManifest(m)).length);});
test('legacy Phoenix invalid direction grouping is rejected without changing timing definitions',()=>{const m=JSON.parse(fs.readFileSync(path.join(repo,'assets/environments/dawn/manifest.json')));m.phoenix.directions.down.row=99;assert(codes(validateManifest(m)).includes('INVALID_FRAME_INDEX'));});
test('CLI is independent of cwd and returns nonzero on invalid required content',()=>{const f=fixture(),cli=path.join(repo,'scripts/validate-assets.cjs');fs.writeFileSync(path.join(f.root,'assets/test/manifest.json'),JSON.stringify(f.manifest));let r=spawnSync(process.execPath,[cli,'--root',f.root,'assets/test/manifest.json'],{cwd:os.tmpdir(),encoding:'utf8'});assert.equal(r.status,0,r.stderr);fs.unlinkSync(path.join(f.root,'assets/test/image.png'));r=spawnSync(process.execPath,[cli,'--root',f.root,'assets/test/manifest.json'],{cwd:os.tmpdir(),encoding:'utf8'});assert.equal(r.status,1);assert.match(r.stderr,/MISSING_REQUIRED_ASSET.*fixture.actor/);});
test('CLI optional missing emits warning with success exit',()=>{const f=fixture();f.manifest.assets[0].required=false;fs.unlinkSync(path.join(f.root,'assets/test/image.png'));fs.writeFileSync(path.join(f.root,'assets/test/manifest.json'),JSON.stringify(f.manifest));const r=spawnSync(process.execPath,[path.join(repo,'scripts/validate-assets.cjs'),'--root',f.root,'assets/test/manifest.json'],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);assert.match(r.stderr,/MISSING_OPTIONAL_ASSET/);});
test('build revision covers font bytes, and invalid assets fail before deleting previous build',()=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),'asset-build-'));roots.push(root);for(const name of ['scripts','src','assets','artifacts','index.html','style.css'])fs.cpSync(path.join(repo,name),path.join(root,name),{recursive:true});const build=()=>spawnSync(process.execPath,[path.join(root,'scripts/build-site.cjs')],{cwd:os.tmpdir(),encoding:'utf8'});let r=build();assert.equal(r.status,0,r.stderr);const a=r.stdout.match(/ready: (\w+)/)[1];fs.appendFileSync(path.join(root,'assets/fonts/VT323-Regular.ttf'),Buffer.from([0]));r=build();assert.equal(r.status,0,r.stderr);assert.notEqual(r.stdout.match(/ready: (\w+)/)[1],a);const sentinel=path.join(root,'_site/keep.txt');fs.writeFileSync(sentinel,'last good');fs.unlinkSync(path.join(root,'assets/environments/dawn/terrain.png'));r=build();assert.equal(r.status,1);assert.match(r.stderr,/MISSING_REQUIRED_ASSET/);assert.equal(fs.readFileSync(sentinel,'utf8'),'last good');});

test('duplicate clip IDs rejected',()=>invalid(m=>m.assets[0].clips.push(structuredClone(m.assets[0].clips[0])),'DUPLICATE_ID'));
test('milestone can require anchors and visual bounds',()=>invalid(m=>{m.assets[0].requiredFrameMetadata=['anchor','bounds'];delete m.assets[0].frames[0].anchor;},'MISSING_REQUIRED_METADATA'));
test('optional missing image does not excuse malformed declared dimensions',()=>invalid(m=>{m.assets[0].required=false;m.assets[0].path='assets/test/missing.png';m.assets[0].width=-1;},'INVALID_DIMENSIONS'));
test('all declared non-sprite image categories use the same safe resource checks',()=>{for(const type of ['tileset','environment-image','effects-image','decoration']) {const f=fixture();f.manifest.assets[0].type=type;assert.deepEqual(codes(validateManifest(f.manifest,{root:f.root})),[]);}});
