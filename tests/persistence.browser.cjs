const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
(async () => {
  const fixtureSource = fs.readFileSync(path.join(__dirname, 'fixtures/save.mjs'), 'utf8');
  const out = process.env.SAVE_ARTIFACT_DIR || 'artifacts/persistence'; fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext(), errors = [], databaseName = 'task31.fixture.' + Date.now();
  const page = await context.newPage();
  const attach = p => { p.on('pageerror', e => errors.push(e.message)); p.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); }); };
  attach(page);
  async function initialize(p) {
    await p.goto(process.env.GAME_URL || 'http://127.0.0.1:8000/'); await p.waitForFunction(() => window.IslandGame?.ready());
    await p.evaluate(async ({ databaseName, fixtureSource }) => {
      const base = document.baseURI;
      const api = await import(new URL('src/island/SaveCoordinator.mjs', base));
      const schema = await import(new URL('src/island/SaveSchema.mjs', base));
      const backend = await import(new URL('src/island/IndexedSaveStore.mjs', base));
      // Chỉ import module fixture do repository sở hữu; file save người chơi chỉ đi qua JSON.parse.
      const fixtureURL = URL.createObjectURL(new Blob([fixtureSource], { type: 'text/javascript' }));
      const fixture = await import(fixtureURL); URL.revokeObjectURL(fixtureURL);
      const writer = await api.SaveCoordinator.open({ databaseName, ...fixture.saveOptions() });
      const h = { ...fixture, ...schema, writer, api, backend, databaseName, cases: [] };
      h.check = (condition, message) => { if (!condition) throw Error(message); };
      h.expect = async (promise, code) => { try { await promise; throw Error(`Thiếu lỗi ${code}`); } catch (error) { if (error.code !== code) throw error; } };
      h.raw = async slot => { const store = await backend.IndexedSaveStore.open({ databaseName }); try { return await store.read(slot); } finally { store.close(); } };
      h.replaceRaw = (slot, row) => new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName, 1);
        request.onsuccess = () => { const db = request.result, tx = db.transaction('slots', 'readwrite'); tx.objectStore('slots').put(row); tx.oncomplete = () => { db.close(); resolve(); }; tx.onabort = () => { db.close(); reject(tx.error); }; };
        request.onerror = () => reject(request.error);
      });
      h.save = async (slot, marker, changes = {}) => { const current = await writer.load(slot); return writer.requestSave({ ...fixture.saveRequest(slot, current.revision, marker, 'fixture.' + crypto.randomUUID()), ...changes }); };
      window.SaveHarness = h;
    }, { databaseName, fixtureSource });
  }
  let cases = [];
  try {
    await initialize(page);
    cases = await page.evaluate(async () => {
      const h = SaveHarness, w = h.writer, check = h.check, expect = h.expect;
      const run = async (name, fn) => { await fn(); h.cases.push(name); };
      localStorage.setItem('nhat-diem.farm.v1', 'fixture.keep'); localStorage.setItem('nhat-diem.ui.v1', 'fixture.ui.keep');
      await run('real IndexedDB initialization and exactly three empty slots', async () => { const slots = await w.listSlots(); check(slots.length === 3 && slots.every(s => !s.present), 'slots'); const names = await indexedDB.databases(); check(names.some(n => n.name === h.databaseName && n.version === 1), 'db version'); });
      await run('save acknowledgment after readwrite transaction complete and verified readback', async () => {
        let complete = false; const original = IDBDatabase.prototype.transaction;
        IDBDatabase.prototype.transaction = function(...args) { const tx = original.apply(this, args); if (args[1] === 'readwrite') tx.addEventListener('complete', () => complete = true); return tx; };
        try { const result = await h.save('slot-1', 1); check(complete && result.status === 'COMMITTED' && result.verified, 'early ack'); } finally { IDBDatabase.prototype.transaction = original; }
      });
      await run('three independent slot payloads', async () => { await h.save('slot-2', 2); await h.save('slot-3', 3); check((await w.load('slot-1')).snapshot.payload.marker === 1 && (await w.load('slot-2')).snapshot.payload.marker === 2 && (await w.load('slot-3')).snapshot.payload.marker === 3, 'mixed slots'); });
      await run('sequential save retains one previous generation', async () => { await h.save('slot-1', 4); const row = await h.raw('slot-1'); check(row.revision === 2 && row.active.snapshot.payload.marker === 4 && row.backup.snapshot.payload.marker === 1, 'backup'); });
      await run('invalid slot and unsafe manual request rejected', async () => { await expect(w.requestSave(h.saveRequest('slot-4')), 'INVALID_SLOT'); await expect(h.save('slot-1', 9, { eligibility: { state: 'COMBAT_UNSAFE', checkpointApproved: true } }), 'SAVE_BLOCKED'); });
      await run('safe automatic milestone accepted', async () => { const result = await h.save('slot-1', 5, { trigger: 'auto', eligibility: { state: 'SAFE_TO_SAVE', checkpointApproved: true, milestoneApproved: true } }); check(result.status === 'COMMITTED', 'auto'); });
      await run('real transaction abort simulates interrupted write without replacing active', async () => {
        const before = JSON.stringify(await h.raw('slot-1')), original = IDBObjectStore.prototype.put;
        IDBObjectStore.prototype.put = function(...args) { const request = original.apply(this, args); this.transaction.abort(); return request; };
        try { await expect(h.save('slot-1', 99), 'TRANSACTION_ABORTED'); } finally { IDBObjectStore.prototype.put = original; }
        check(JSON.stringify(await h.raw('slot-1')) === before, 'abort changed row');
      });
      await run('quota fault rejected and prior active/backup preserved', async () => {
        const before = JSON.stringify(await h.raw('slot-1')), original = IDBObjectStore.prototype.put;
        IDBObjectStore.prototype.put = function() { throw new DOMException('Fixture quota', 'QuotaExceededError'); };
        try { await expect(h.save('slot-1', 99), 'QUOTA_EXCEEDED'); } finally { IDBObjectStore.prototype.put = original; }
        check(JSON.stringify(await h.raw('slot-1')) === before, 'quota changed row');
      });
      await run('readback failure is not advertised as verified save success', async () => {
        const original = IDBObjectStore.prototype.get, current = await w.load('slot-1'); let readonlyGets = 0;
        const request = h.saveRequest('slot-1',current.revision,11,'fixture.readback');
        IDBObjectStore.prototype.get = function(...args) { if(this.transaction.mode==='readonly' && ++readonlyGets===2) throw new DOMException('Fixture readback denied','SecurityError'); return original.apply(this,args); };
        try { const result=await w.requestSave(request); check(result.status==='COMMITTED_UNVERIFIED' && !result.verified,'false verified ack'); } finally { IDBObjectStore.prototype.get=original; }
        check((await w.requestSave(request)).alreadyCommitted,'retry duplicated');
      });
      await run('subsequent valid request works after failed writes', async () => { await h.save('slot-1', 6); check((await w.load('slot-1')).snapshot.payload.marker === 6, 'writer poisoned'); });
      await run('corrupt active requires explicit backup recovery', async () => { const row = await h.raw('slot-1'); row.active.snapshot.payload.marker = 999; await h.replaceRaw('slot-1', row); const load = await w.load('slot-1'); check(load.status === 'RECOVERY_REQUIRED' && load.snapshot.payload.marker === 11, 'recovery candidate'); await expect(w.recover('slot-1', { expectedRevision: row.revision }), 'CONFIRMATION_REQUIRED'); await w.recover('slot-1', { expectedRevision: row.revision, confirmed: true, requestId: 'fixture.recover' }); check((await w.load('slot-1')).snapshot.payload.marker === 11, 'recovery failed'); });
      await run('invalid backup warns without replacing a valid active', async()=>{const original=await h.raw('slot-1'),row=structuredClone(original);row.backup.digest='bad';await h.replaceRaw('slot-1',row);const load=await w.load('slot-1');check(load.status==='READY'&&load.backupStatus==='INVALID','backup warning');await h.replaceRaw('slot-1',original);});
      await run('missing active record can offer own valid backup', async () => { const original = await h.raw('slot-1'), row = structuredClone(original); delete row.active; await h.replaceRaw('slot-1', row); check((await w.load('slot-1')).status === 'RECOVERY_REQUIRED', 'missing active'); await h.replaceRaw('slot-1', original); });
      await run('both corrupt generations do not fabricate state', async () => { const original = await h.raw('slot-1'), row = structuredClone(original); row.active.digest = 'bad'; row.backup.digest = 'bad'; await h.replaceRaw('slot-1', row); check((await w.load('slot-1')).status === 'CORRUPT', 'corrupt accepted'); await h.replaceRaw('slot-1', original); });
      await run('backup never borrowed from another slot', async () => { const original = await h.raw('slot-2'), row = structuredClone(original); row.active = null; row.backup = (await h.raw('slot-1')).active; await h.replaceRaw('slot-2', row); check((await w.load('slot-2')).status === 'CORRUPT', 'cross-slot backup'); await h.replaceRaw('slot-2', original); });
      await run('schema 0 and future schemas preserved, no silent downgrade', async () => {
        const original = await h.raw('slot-1');
        for (const version of [0, 2]) { const row = structuredClone(original), snapshot = structuredClone(row.active.snapshot); snapshot.schemaVersion = version; row.active = await h.makeGeneration('slot-1', row.revision, 'fixture.version', snapshot); await h.replaceRaw('slot-1', row); const before = JSON.stringify(await h.raw('slot-1')); check((await w.load('slot-1')).status === 'UNSUPPORTED_SCHEMA', 'version fallback'); await expect(h.save('slot-1', 7), 'UNSUPPORTED_SCHEMA'); check(JSON.stringify(await h.raw('slot-1')) === before, 'unsupported mutated'); check((await w.exportRawSlot('slot-1')).includes('tu-linh-save-raw'), 'raw export'); }
        await h.replaceRaw('slot-1', original);
      });
      await run('unsupported content preserved independently of schema', async () => { const original = await h.raw('slot-1'), row = structuredClone(original); const s = structuredClone(row.active.snapshot); s.contentVersion = 'fixture.unsupported'; row.active = await h.makeGeneration('slot-1', row.revision, 'fixture.content', s); await h.replaceRaw('slot-1', row); check((await w.load('slot-1')).status === 'UNSUPPORTED_CONTENT', 'content'); await h.replaceRaw('slot-1', original); });
      await run('reward ledger/receipts survive same-version and supported content update without grants', async () => {
        const load = await w.load('slot-1'), request = h.saveRequest('slot-1', load.revision, 8, 'fixture.reward');
        request.snapshot.payload.RewardGrantLedger = { sourceClaims: [{ canonicalSourceRewardKey: 'fixture.unique', grantId: 'fixture.grant', recipientIds: ['fixture.form'] }], recipientGrants: [{ grantId: 'fixture.grant', recipientId: 'fixture.form' }] }; request.snapshot.payload.receipts = ['fixture.receipt']; request.snapshot.payload.worldState = ['fixture.environment'];
        await w.requestSave(request); const before = JSON.stringify((await w.load('slot-1')).snapshot.payload), retry = await w.requestSave(request); check(retry.alreadyCommitted, 'physical retry');
        const changed = structuredClone(request); changed.expectedRevision++; changed.requestId = 'fixture.content-update'; changed.snapshot.contentVersion = 'fixture.content.2'; await w.requestSave(changed);
        check(JSON.stringify((await w.load('slot-1')).snapshot.payload) === before, 'version granted');
      });
      await run('portable export validates format, checksum and no UI keys', async () => { h.file = await w.exportSlot('slot-1'); const value = JSON.parse(h.file); check(value.format === 'tu-linh-save' && value.exportVersion === 1 && value.digest.length === 64 && !h.file.includes('nhat-diem.ui.v1'), 'export'); });
      await run('import preview never overwrites existing destination', async () => { const before = JSON.stringify(await h.raw('slot-2')); h.preview = await w.previewImport(h.file, 'slot-2'); check(h.preview.overwritesExisting && h.preview.destinationSlot === 'slot-2', 'preview'); await expect(w.confirmImport(h.preview.token), 'CONFIRMATION_REQUIRED'); check(JSON.stringify(await h.raw('slot-2')) === before, 'preview wrote'); });
      await run('confirmed import keeps prior destination as backup and other slots unchanged', async () => { const before1 = JSON.stringify(await h.raw('slot-1')), before3 = JSON.stringify(await h.raw('slot-3')), old = (await w.load('slot-2')).snapshot; await w.confirmImport(h.preview.token, { confirmed: true, eligibility: { state: 'SAFE_TO_SAVE', checkpointApproved: true } }); const row = await h.raw('slot-2'); check(JSON.stringify(row.backup.snapshot) === JSON.stringify(old), 'backup import'); check(JSON.stringify(await h.raw('slot-1')) === before1 && JSON.stringify(await h.raw('slot-3')) === before3, 'other slots changed'); check(JSON.stringify(row.active.snapshot.payload) === JSON.stringify((await w.load('slot-1')).snapshot.payload), 'roundtrip'); });
      await run('stale preview rejected after destination advances', async () => { const preview = await w.previewImport(h.file, 'slot-3'); await h.save('slot-3', 10); await expect(w.confirmImport(preview.token, { confirmed: true, eligibility: { state: 'SAFE_TO_SAVE', checkpointApproved: true } }), 'REVISION_CONFLICT'); });
      await run('invalid, oversized, dangerous and corrupt imports rejected', async () => {
        await expect(w.previewImport('not json', 'slot-1'), 'IMPORT_PARSE'); await expect(w.previewImport('x'.repeat(2 * 1024 * 1024 + 1), 'slot-1'), 'IMPORT_TOO_LARGE');
        await expect(w.previewImport('{"__proto__":{}}', 'slot-1'), 'UNSAFE_KEY');
        const data = JSON.parse(h.file); data.snapshot.payload.marker++; await expect(w.previewImport(JSON.stringify(data), 'slot-1'), 'CHECKSUM_MISMATCH');
        await expect(w.previewImportFile({ size: 3000000, text(){ throw Error('không đọc file quá lớn'); } }, 'slot-1'), 'IMPORT_TOO_LARGE'); check({}.polluted === undefined, 'polluted');
      });
      await run('unsupported import schema/version rejected without writes', async () => { const data = JSON.parse(h.file); data.snapshot.schemaVersion = 9; const {digest,...body} = data; data.digest = await h.checksum(body); await expect(w.previewImport(JSON.stringify(data), 'slot-3'), 'UNSUPPORTED_SCHEMA'); data.exportVersion = 9; await expect(w.previewImport(JSON.stringify(data), 'slot-3'), 'UNSUPPORTED_EXPORT'); });
      await run('duplicate source claim and recipient grant fixtures rejected', async () => { const data = JSON.parse(h.file); data.snapshot.payload.RewardGrantLedger.sourceClaims.push(data.snapshot.payload.RewardGrantLedger.sourceClaims[0]); const {digest,...body} = data; data.digest = await h.checksum(body); await expect(w.previewImport(JSON.stringify(data), 'slot-3'), 'INVALID_PAYLOAD'); });
      await run('dangerous exit keeps last committed checkpoint and has no HP policy', async () => { const before = await w.load('slot-1'); await expect(h.save('slot-1', 99, { eligibility: { state: 'COMBAT_UNSAFE', checkpointApproved: true } }), 'SAVE_BLOCKED'); const after = await w.load('slot-1'); check(JSON.stringify(before.snapshot) === JSON.stringify(after.snapshot) && after.snapshot.payload.hp === undefined && after.snapshot.checkpoint.anchorId === 'fixture.safe', 'unsafe changed'); });
      await run('delete one slot and ABA protection preserve other slots', async () => { const before = JSON.stringify(await h.raw('slot-1')), load = await w.load('slot-3'); await w.deleteSlot('slot-3', { expectedRevision: load.revision, confirmed: true }); check((await w.load('slot-3')).status === 'EMPTY', 'delete'); await expect(w.requestSave(h.saveRequest('slot-3', 0, 0)), 'REVISION_CONFLICT'); check(JSON.stringify(await h.raw('slot-1')) === before, 'delete mixed'); });
      await run('unavailable/security denied is explicit and never localStorage fallback', async () => { await expect(h.api.SaveCoordinator.open({ indexedDB: null }), 'PERSISTENCE_UNAVAILABLE'); await expect(h.api.SaveCoordinator.open({ indexedDB: { open(){ throw new DOMException('Fixture denied', 'SecurityError'); } } }), 'PERSISTENCE_UNAVAILABLE'); check(localStorage.getItem('nhat-diem.farm.v1') === 'fixture.keep' && localStorage.getItem('nhat-diem.ui.v1') === 'fixture.ui.keep', 'settings changed'); });
      return h.cases;
    });
    // Hai tab thật, hai kết nối IndexedDB cùng revision.
    const second = await context.newPage(); attach(second); await initialize(second);
    const revision = await page.evaluate(async () => (await SaveHarness.writer.load('slot-1')).revision);
    const writes = await Promise.all([page, second].map((p,index)=>p.evaluate(async ({revision,index})=>{try{return await SaveHarness.writer.requestSave(SaveHarness.saveRequest('slot-1',revision,20+index,'fixture.tab.'+index));}catch(e){return {code:e.code};}},{revision,index})));
    assert.equal(writes.filter(v=>v.status==='COMMITTED').length,1); assert.equal(writes.filter(v=>v.code==='REVISION_CONFLICT').length,1); cases.push('two real tabs use CAS: exactly one writer wins');
    await second.evaluate(()=>SaveHarness.writer.close()); await second.close();
    const safe = await page.evaluate(async()=>SaveHarness.writer.load('slot-1'));
    await page.evaluate(()=>SaveHarness.writer.close()); await initialize(page);
    assert.deepEqual(await page.evaluate(async()=> (await SaveHarness.writer.load('slot-1')).snapshot),safe.snapshot); cases.push('browser page reload/reopen preserves actual IndexedDB data');
    await page.evaluate(()=>window.dispatchEvent(new Event('blur'))); assert.equal((await page.evaluate(async()=>SaveHarness.writer.load('slot-1'))).revision,safe.revision); cases.push('focus loss performs no implicit save or progression mutation');
    await page.evaluate(async()=>{
      const section=document.createElement('section');section.id='save-harness';Object.assign(section.style,{position:'fixed',inset:'20px',zIndex:99999,background:'#173644',color:'white',padding:'24px',font:'16px sans-serif',overflow:'auto'});
      section.innerHTML='<h1>Fixture lưu dữ liệu Task 31</h1><p>Chỉ dữ liệu kiểm thử — không lưu hành trình Phượng hoặc Quy.</p><pre id="save-slots"></pre><select id="save-destination"><option>slot-1</option><option selected>slot-2</option><option>slot-3</option></select> <button id="save-export">Xuất slot 1</button><p><input type="file" id="save-file" accept="application/json"></p><label><input type="checkbox" id="save-confirm"> Tôi xác nhận thay dữ liệu slot đích đã chọn</label> <button id="save-import" disabled>Xác nhận import</button><pre id="save-result"></pre>';
      document.body.append(section); const h=SaveHarness,show=async()=>document.querySelector('#save-slots').textContent=JSON.stringify(await h.writer.listSlots(),null,2); await show();
      document.querySelector('#save-destination').onchange=()=>{h.uiPreview=null;document.querySelector('#save-file').value='';document.querySelector('#save-confirm').checked=false;document.querySelector('#save-import').disabled=true;document.querySelector('#save-result').textContent='Đích đã đổi; chọn lại file để xem trước.';};
      document.querySelector('#save-export').onclick=async()=>{const text=await h.writer.exportSlot('slot-1'),url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='tu-linh-save-slot-1.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
      document.querySelector('#save-file').onchange=async event=>{try{h.uiPreview=await h.writer.previewImportFile(event.target.files[0],document.querySelector('#save-destination').value);document.querySelector('#save-result').textContent='Đã xem trước; chưa ghi slot:\n'+JSON.stringify(h.uiPreview,null,2);document.querySelector('#save-import').disabled=false;}catch(e){document.querySelector('#save-result').textContent=e.code;}};
      document.querySelector('#save-import').onclick=async()=>{try{const result=await h.writer.confirmImport(h.uiPreview.token,{confirmed:document.querySelector('#save-confirm').checked,eligibility:{state:'SAFE_TO_SAVE',checkpointApproved:true}});document.querySelector('#save-result').textContent=JSON.stringify(result);await show();}catch(e){document.querySelector('#save-result').textContent=e.code;}};
    });
    const downloadPromise = page.waitForEvent('download'); await page.locator('#save-export').click(); const download = await downloadPromise; const filename = path.join(out,'fixture-export.json'); await download.saveAs(filename); assert.equal(JSON.parse(fs.readFileSync(filename,'utf8')).format,'tu-linh-save'); cases.push('player-controlled browser download exports portable JSON');
    const beforeImport=await page.evaluate(async()=>JSON.stringify(await SaveHarness.raw('slot-2')));
    await page.locator('#save-file').setInputFiles(filename);await page.waitForFunction(()=>window.SaveHarness.uiPreview);
    assert.equal(await page.evaluate(async()=>JSON.stringify(await SaveHarness.raw('slot-2'))),beforeImport); cases.push('file chooser preview does not overwrite destination');
    await page.locator('#save-destination').selectOption('slot-3'); assert(await page.locator('#save-import').isDisabled());
    await page.locator('#save-destination').selectOption('slot-2'); await page.locator('#save-file').setInputFiles(filename); await page.waitForFunction(()=>window.SaveHarness.uiPreview); cases.push('changing destination invalidates prior import preview and confirmation');
    await page.locator('#save-import').click(); await page.waitForFunction(()=>document.querySelector('#save-result').textContent==='CONFIRMATION_REQUIRED'); assert.equal(await page.evaluate(async()=>JSON.stringify(await SaveHarness.raw('slot-2'))),beforeImport); cases.push('UI refuses import without explicit overwrite confirmation');
    await page.locator('#save-confirm').check(); await page.locator('#save-import').click(); await page.waitForFunction(()=>{try{const r=JSON.parse(document.querySelector('#save-result').textContent);return r.status==='COMMITTED'&&r.verified;}catch{return false;}}); cases.push('explicit UI confirmation imports into selected slot after commit');
    await page.screenshot({path:path.join(out,'save-management.png')});
    assert.equal(await page.evaluate(()=>IslandGame.snapshot().island),'dawn');assert.deepEqual(errors,[]);
    await page.evaluate(()=>SaveHarness.writer.close());
    await page.evaluate(name=>new Promise((resolve,reject)=>{const r=indexedDB.deleteDatabase(name);r.onsuccess=resolve;r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('cleanup blocked'));}),databaseName);
    await page.evaluate(async()=>{const h=SaveHarness;h.writer=await h.api.SaveCoordinator.open({databaseName:h.databaseName,...h.saveOptions()});const slots=await h.writer.listSlots();h.check(slots.every(s=>!s.present),'deleted storage fabricated recovery');await h.writer.close();await new Promise((resolve,reject)=>{const r=indexedDB.deleteDatabase(h.databaseName);r.onsuccess=resolve;r.onerror=()=>reject(r.error);});}); cases.push('browser database deletion removes active and backup; no fabricated recovery');
    cases.push('fixture database cleanup does not touch production database or other storage');
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:cases.length,failed:0,cases,errors,databaseName},null,2));
    console.log(`PASS persistence browser: ${cases.length} cases on real IndexedDB, actual two-tab CAS, abort/quota faults, reload, confirmation UI/download; zero page/asset errors`);
  } finally {await context.close();await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
