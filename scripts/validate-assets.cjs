/** Kiểm tra asset một lần trước build; không tải mạng hoặc sửa ảnh. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const DEFAULT_MANIFESTS = ['assets/environments/dawn/manifest.json', 'assets/samples/dawn/manifest.json', 'assets/tiles/dawn/manifest.json'];
const ROOT = path.resolve(__dirname, '..');
const positive = n => Number.isSafeInteger(n) && n > 0;
const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);

function safeFile(root, name) {
  if (typeof name !== 'string' || !/^assets\//.test(name) || /[\\%?#:\x00-\x1f]/.test(name) || name.split('/').some(s => !s || s === '.' || s === '..'))
    throw new Error('Đường dẫn phải tương đối từ assets/, không URL, traversal hoặc ký tự mã hóa');
  const file = path.resolve(root, name);
  const realRoot = fs.realpathSync(root);
  // Resolve the nearest existing ancestor too, including a symlink to an absent leaf.
  let ancestor = file;
  while (!fs.existsSync(ancestor)) {
    const parent = path.dirname(ancestor);
    if (parent === ancestor) throw new Error('Không tìm thấy thư mục gốc');
    ancestor = parent;
  }
  const relative = path.relative(realRoot, fs.realpathSync(ancestor));
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) throw new Error('Symlink vượt thư mục dự án');
  return file;
}

function validateManifest(manifest, { root = ROOT, label = '<manifest>', cache = new Map() } = {}) {
  const diagnostics = [], files = new Set();
  const issue = (code, where, message, severity = 'error') => diagnostics.push({ severity, code, location: `${label}:${where}`, message });
  const need = (ok, code, where, message) => { if (!ok) issue(code, where, message); return !!ok; };
  function image(name, where, required = true, expected = {}) {
    let file;
    try { file = safeFile(root, name); } catch (e) { issue('INVALID_PATH', where, e.message); return null; }
    if (!fs.existsSync(file)) { issue(required ? 'MISSING_REQUIRED_ASSET' : 'MISSING_OPTIONAL_ASSET', where, `Thiếu tệp ${name}`, required ? 'error' : 'warning'); return null; }
    try {
      let meta = cache.get(file);
      if (!meta) {
        const data = fs.readFileSync(file);
        if (data.length < 33 || !data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || data.readUInt32BE(8) !== 13 || data.toString('ascii',12,16) !== 'IHDR') {
          issue('UNSUPPORTED_FORMAT', where, 'Cần PNG với IHDR hợp lệ; không hỗ trợ định dạng khác'); return null;
        }
        meta = { width: data.readUInt32BE(16), height: data.readUInt32BE(20), digest: crypto.createHash('sha256').update(data).digest('hex') };
        cache.set(file, meta);
      }
      files.add(name);
      need(positive(meta.width) && positive(meta.height), 'INVALID_DIMENSIONS', where, 'Kích thước PNG phải là số nguyên dương');
      for (const key of ['width','height']) if (expected[key] !== undefined)
        need(positive(expected[key]) && expected[key] === meta[key], 'INVALID_DIMENSIONS', where, `${key} không khớp PNG (${meta[key]})`);
      if (expected.sha256 !== undefined) need(/^[a-f0-9]{64}$/.test(expected.sha256) && expected.sha256 === meta.digest, 'CACHE_VERSION_MISMATCH', where, 'sha256 không khớp nội dung tệp');
      return meta;
    } catch (e) { issue('IMAGE_READ_ERROR', where, `Không đọc được ${name}: ${e.code || e.message}`); return null; }
  }
  function rect(r, meta, where) {
    return need(Array.isArray(r) && r.length === 4 && r.every(Number.isSafeInteger) && r[0] >= 0 && r[1] >= 0 && positive(r[2]) && positive(r[3]) && r[0]+r[2] <= meta.width && r[1]+r[3] <= meta.height, 'INVALID_FRAME_BOUNDS', where, 'Rect [x,y,width,height] phải nằm trong ảnh');
  }
  function anchor(a, width, height, where) {
    need(Array.isArray(a) && a.length === 2 && a.every(Number.isFinite) && a[0] >= 0 && a[1] >= 0 && a[0] <= width && a[1] <= height, 'INVALID_ANCHOR', where, 'Anchor [x,y] hữu hạn, nằm trong frame');
  }
  function bounds(b, width, height, where) {
    need(Array.isArray(b) && b.length === 4 && b.every(Number.isFinite) && b[0]>=0 && b[1]>=0 && b[2]>b[0] && b[3]>b[1] && b[2]<=width && b[3]<=height, 'INVALID_VISUAL_BOUNDS', where, 'Bounds [left,top,right,bottom] phải nằm trong frame');
  }
  function unique(ids, where) {
    const set = new Set();
    for (const id of ids) {
      need(typeof id === 'string' && /^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(id), 'INVALID_ID', where, 'ID asset/frame/clip phải ổn định, không trống');
      need(!set.has(id), 'DUPLICATE_ID', where, `ID trùng: ${id}`); set.add(id);
    }
    return set;
  }
  try {
    if (!object(manifest)) throw new Error('Manifest phải là object');
    if (manifest.assetContractVersion !== undefined) {
      if (!need(manifest.assetContractVersion === 1 && Array.isArray(manifest.assets), 'INVALID_MANIFEST', 'assets', 'Contract version1 cần assets array')) return { diagnostics, files: [] };
      unique(manifest.assets.map(a => a?.id), 'assets');
      for (const a of manifest.assets) {
        if (!object(a)) { issue('INVALID_MANIFEST','assets','Asset phải là object'); continue; }
        const loc = a.id || 'asset';
        need(['sprite-atlas','tileset','environment-image','effects-image','decoration'].includes(a.type), 'UNSUPPORTED_FORMAT',loc,'Loại asset chưa được hỗ trợ');
        need(a.required === undefined || typeof a.required === 'boolean','INVALID_MANIFEST',loc,'required phải boolean');
        for (const key of ['width','height']) if (a[key] !== undefined) need(positive(a[key]),'INVALID_DIMENSIONS',loc,`${key} phải nguyên dương`);
        const requiredMetadata = a.requiredFrameMetadata === undefined ? [] : a.requiredFrameMetadata;
        need(Array.isArray(requiredMetadata) && requiredMetadata.every(k=>['anchor','bounds'].includes(k)),'INVALID_MANIFEST',loc,'requiredFrameMetadata chỉ nhận anchor/bounds');
        const meta = image(a.path,loc,a.required !== false,a);
        // Validate clip/identity metadata even when an optional image is absent.
        const frames = a.frames === undefined ? [] : a.frames;
        if (!need(Array.isArray(frames),'INVALID_MANIFEST',loc,'frames phải array')) continue;
        if (a.type === 'sprite-atlas') need(frames.length > 0,'INVALID_MANIFEST',loc,'Sprite atlas cần frames explicit');
        const frameIds = unique(frames.map(f => f?.id),loc+'.frames');
        for (const f of frames) {
          const r = f?.rect;
          for (const key of ['anchor','bounds']) if (f?.[key] === undefined) {
            const required = Array.isArray(requiredMetadata) && requiredMetadata.includes(key);
            issue(required ? 'MISSING_REQUIRED_METADATA' : 'MISSING_OPTIONAL_METADATA',loc+'.frames',`Thiếu ${key}`,required ? 'error' : 'warning');
          }
          const valid = rect(r,meta || {width:Number.MAX_SAFE_INTEGER,height:Number.MAX_SAFE_INTEGER},loc+'.frames');
          if (valid) {
            if (f.anchor !== undefined) anchor(f.anchor,r[2],r[3],loc);
            if (f.bounds !== undefined) bounds(f.bounds,r[2],r[3],loc);
          }
        }
        if (a.frameWidth !== undefined || a.frameHeight !== undefined) {
          need(positive(a.frameWidth) && positive(a.frameHeight) && (!meta || (meta.width % a.frameWidth === 0 && meta.height % a.frameHeight === 0)), 'INVALID_DIMENSIONS',loc,'Grid frame phải nguyên dương và chia hết atlas');
        }
        const clips = a.clips === undefined ? [] : a.clips;
        if (!need(Array.isArray(clips),'INVALID_MANIFEST',loc,'clips phải array')) continue;
        const clipIds = unique(clips.map(c => c?.id),loc+'.clips');
        for (const c of clips) {
          need(Array.isArray(c?.frameIds) && c.frameIds.length > 0 && c.frameIds.every(id=>frameIds.has(id)), 'INVALID_ANIMATION_REFERENCE',loc,'Clip cần frameIds tồn tại');
          need(Number.isFinite(c?.durationMs) && c.durationMs > 0,'INVALID_ANIMATION_DURATION',loc,'durationMs phải hữu hạn và dương');
          need(c?.loop === undefined || typeof c.loop === 'boolean','INVALID_MANIFEST',loc,'loop phải boolean');
        }
        const requiredClips = a.requiredClips === undefined ? [] : a.requiredClips;
        need(Array.isArray(requiredClips) && requiredClips.every(id=>typeof id==='string' && clipIds.has(id)), 'MISSING_REQUIRED_CLIP',loc,'Thiếu clip bắt buộc được milestone khai báo');
      }
    } else {
      const e = manifest.environment, p = manifest.phoenix;
      if (!need(object(e) && e.kind === 'tilemap' && object(p),'UNSUPPORTED_FORMAT','manifest','Chỉ adapter tilemap Dawn hoặc assetContractVersion1 được hỗ trợ')) return { diagnostics, files: [] };
      need(positive(manifest.version),'INVALID_MANIFEST','version','version phải nguyên dương');
      const terrain = image(e.tiles,'environment.tiles',true,{width:e.tilesSize?.[0],height:e.tilesSize?.[1]});
      need(Array.isArray(e.tilesSize) && e.tilesSize.length===2 && e.tilesSize.every(positive),'INVALID_DIMENSIONS','environment.tilesSize','Cần kích thước terrain explicit');
      const props = image(e.props,'environment.props');
      const shadow = e.shadows === undefined ? null : image(e.shadows,'environment.shadows');
      const grid = positive(e.tileSize) && positive(e.columns);
      need(grid,'INVALID_DIMENSIONS','environment','tileSize/columns phải nguyên dương');
      if (terrain && grid) {
        need(terrain.width === e.columns*e.tileSize && terrain.height%e.tileSize===0,'INVALID_DIMENSIONS','environment','Grid không khớp PNG');
        need(object(e.tileDefinitions),'INVALID_MANIFEST','environment.tileDefinitions','Thiếu định nghĩa tile');
        for (const [id,t] of Object.entries(e.tileDefinitions || {})) need(Number.isSafeInteger(t?.frame) && t.frame>=0 && t.frame<terrain.width/e.tileSize*(terrain.height/e.tileSize),'INVALID_FRAME_INDEX',id,'Tile frame index ngoài atlas');
      }
      need(Array.isArray(e.definitions),'INVALID_MANIFEST','environment.definitions','Cần danh sách props');
      const defs = Array.isArray(e.definitions) ? e.definitions : [];
      unique(defs.map(d=>d?.id),'environment.definitions');
      for (const d of defs) {
        if (props && rect(d?.rect,props,d?.id || 'prop')) {
          anchor(d.origin,d.rect[2],d.rect[3],d.id);
          if (d.bounds!==undefined) bounds(d.bounds,d.rect[2],d.rect[3],d.id);
        }
        if (d?.shadow && shadow && rect(d.shadow.rect,shadow,d.id+'.shadow')) anchor(d.shadow.origin,d.shadow.rect[2],d.shadow.rect[3],d.id+'.shadow');
        if (d?.shadow && !e.shadows) issue('INVALID_MANIFEST',d.id,'Shadow metadata cần ảnh shadows');
        // d.source is provenance relative to a source sheet, never a deployed URL.
      }
      const hero = image(p.image,'phoenix.image');
      const cell = positive(p.frameSize) && positive(p.columns) && positive(p.posesPerDirection);
      need(cell,'INVALID_DIMENSIONS','phoenix','frameSize/columns/posesPerDirection phải nguyên dương');
      need(object(p.directions) && ['up','down','left','right'].every(k=>object(p.directions[k])),'INVALID_MANIFEST','phoenix.directions','Thiếu hướng renderer hiện hữu cần');
      if (hero && cell) {
        need(hero.width === p.frameSize*p.columns && hero.height%p.frameSize===0 && p.posesPerDirection<=p.columns,'INVALID_DIMENSIONS','phoenix','Kích thước atlas không khớp grouping');
        for (const [id,d] of Object.entries(p.directions || {})) {
          need(Number.isSafeInteger(d?.row) && d.row>=0 && (d.row+1)*p.frameSize<=hero.height,'INVALID_FRAME_INDEX','phoenix.'+id,'Direction row ngoài atlas');
          anchor(d?.origin,p.frameSize,p.frameSize,'phoenix.'+id);
          need(d?.mirror===undefined || typeof d.mirror==='boolean','INVALID_MANIFEST','phoenix.'+id,'mirror phải boolean');
        }
        if (p.bounds!==undefined) {
          need(Array.isArray(p.bounds) && p.bounds.length===p.columns*hero.height/p.frameSize,'INVALID_VISUAL_BOUNDS','phoenix.bounds','Số bounds phải khớp atlas');
          if (Array.isArray(p.bounds)) for (const b of p.bounds) bounds(b,p.frameSize,p.frameSize,'phoenix.bounds');
        }
      }
      // PHOENIX_ANIMATIONS uses logical timing; renderer maps those to two poses.
      // Its row/frame counters must not be interpreted as raw atlas clip rows.
    }
  } catch (e) { issue('INVALID_MANIFEST','manifest',e.message); }
  return { diagnostics, files: [...files].sort() };
}

function validateProjectAssets({ root = ROOT, manifests = DEFAULT_MANIFESTS } = {}) {
  const cache = new Map(), diagnostics = [], files = new Set();
  for (const name of manifests) {
    try {
      const file = safeFile(root,name);
      const report = validateManifest(JSON.parse(fs.readFileSync(file,'utf8')), {root,label:name,cache});
      diagnostics.push(...report.diagnostics);report.files.forEach(f=>files.add(f));
    } catch (e) { diagnostics.push({severity:'error',code:'INVALID_MANIFEST',location:name,message:e.message}); }
  }
  return {diagnostics,files:[...files].sort()};
}
function assertProjectAssets(options) {
  const report = validateProjectAssets(options);
  for (const d of report.diagnostics) console.error(`${d.severity} ${d.code} ${d.location}: ${d.message}`);
  if (report.diagnostics.some(d=>d.severity==='error')) throw new Error('Asset validation thất bại');
  return report;
}
if (require.main === module) {
  try {
    const args=process.argv.slice(2);let root=ROOT;
    if (args[0]==='--root') { args.shift();const value=args.shift();if (!value) throw new Error('--root cần đường dẫn');root=path.resolve(value); }
    const report=assertProjectAssets({root,manifests:args.length?args:DEFAULT_MANIFESTS});
    console.log(`Asset validation PASS: ${report.files.length} ảnh PNG`);
  } catch (e) { console.error(e.message);process.exitCode=1; }
}
module.exports={validateManifest,validateProjectAssets,assertProjectAssets,safeFile,DEFAULT_MANIFESTS};
