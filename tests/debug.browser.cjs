const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { observeBrowser } = require('./helpers/browser-observer.cjs');
const stats = list => { const v=[...list].sort((a,b)=>a-b);return {count:v.length,mean:v.reduce((a,b)=>a+b,0)/v.length,p50:v[Math.ceil(v.length*.5)-1],p95:v[Math.ceil(v.length*.95)-1],max:v.at(-1)}; };
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const out=process.env.DEBUG_ARTIFACT_DIR||'artifacts/debug';fs.mkdirSync(out,{recursive:true});const runs=[];
 try{
  for(const mode of ['off','metrics','visuals']){
   const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:1});
   await context.addInitScript(()=>{
    const originalAdd=window.addEventListener.bind(window),originalRemove=window.removeEventListener.bind(window),tracked=new Map();
    window.addEventListener=(type,fn,options)=>{if(['error','unhandledrejection'].includes(type)){if(!tracked.has(type))tracked.set(type,new Set());tracked.get(type).add(fn);}return originalAdd(type,fn,options);};
    window.removeEventListener=(type,fn,options)=>{tracked.get(type)?.delete(fn);return originalRemove(type,fn,options);};
    window.__debugListenerCount=()=>[...tracked.values()].reduce((n,s)=>n+s.size,0);
   });
   const page=await context.newPage(),observer=observeBrowser(page),url=new URL(process.env.GAME_URL||'http://127.0.0.1:8000/');
   if(mode!=='off')url.searchParams.set('debug','1');if(mode==='visuals')url.searchParams.set('debugVisuals','1');
   await page.goto(url.href);await page.waitForFunction(()=>window.IslandGame?.ready());
   assert.equal(await page.evaluate(()=>IslandGame.snapshot().island),'dawn');
   if(mode==='off'){
    const inactive=await page.evaluate(()=>({api:typeof IslandDebug,dom:!!document.querySelector('#development-debug'),modules:performance.getEntriesByType('resource').filter(r=>/DevelopmentDebug|DevelopmentDiagnostics/.test(r.name)).length,listeners:__debugListenerCount()}));
    assert.deepEqual(inactive,{api:'undefined',dom:false,modules:0,listeners:0});
   }else{
    await page.waitForFunction(()=>window.IslandDebug?.snapshot().metrics.samples>=20);
    const snapshot=await page.evaluate(()=>IslandDebug.snapshot());
    assert.equal(snapshot.view.aim,null);assert.equal(snapshot.view.current,null);assert.equal(snapshot.view.save,'NOT_INTEGRATED');assert(snapshot.view.assetCount>=3);assert(snapshot.metrics.renderMs.count>0);assert.equal(await page.evaluate(async()=>(await indexedDB.databases()).length),0);
    assert.equal(await page.locator('#development-debug').evaluate(el=>getComputedStyle(el).pointerEvents),'none');
    assert.equal(await page.locator('#development-debug').evaluate(el=>el.inert),true);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'island');
    const before=await page.evaluate(()=>IslandGame.snapshot().player);await page.keyboard.down('d');await page.waitForTimeout(250);await page.keyboard.up('d');const after=await page.evaluate(()=>IslandGame.snapshot().player);assert(after.x>before.x);
    await page.keyboard.press('j');assert((await page.evaluate(()=>IslandGame.snapshot().cooldowns.attack))>0);
    assert.equal((await page.evaluate(()=>IslandDebug.snapshot())).diagnostics.records.length<20,true);
    for(const viewport of [{width:390,height:844},{width:844,height:390}]){
      await page.setViewportSize(viewport);await page.waitForTimeout(300);
      const bounds=await page.locator('#development-debug').boundingBox();assert(bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=viewport.width+.5&&bounds.y+bounds.height<=viewport.height+.5);
      if(mode==='visuals'){const sizes=await page.evaluate(()=>{const a=document.querySelector('#island').getBoundingClientRect(),b=document.querySelector('#development-geometry').getBoundingClientRect();return [a.left-b.left,a.top-b.top,a.width-b.width,a.height-b.height];});assert(sizes.every(v=>Math.abs(v)<.5));}
    }
    await page.setViewportSize({width:1280,height:720});await page.waitForTimeout(300);
   }
   const intervals=await page.evaluate(()=>new Promise(resolve=>{const values=[];let previous=null,count=0;function tick(t){if(previous!==null&&count>10)values.push(t-previous);previous=t;if(++count<101)requestAnimationFrame(tick);else resolve(values);}requestAnimationFrame(tick);}));
   const snapshot=await page.evaluate(()=>window.IslandDebug?.snapshot()??null);
   await page.screenshot({path:path.join(out,`${mode}.png`)});
   if(mode!=='off'){
    const duplicate=await page.evaluate(async()=>{const resource=performance.getEntriesByType('resource').find(r=>new URL(r.name).pathname.endsWith('/DevelopmentDebug.mjs'));const m=await import(resource.name),canvas=document.querySelector('#island');const a=m.createDevelopmentDebug({enabled:true,canvas}),b=m.createDevelopmentDebug({enabled:true,canvas});return {same:a===b,panels:document.querySelectorAll('#development-debug').length,listeners:__debugListenerCount()};});assert.deepEqual(duplicate,{same:true,panels:1,listeners:2});
    await page.evaluate(()=>IslandDebug.dispose());assert.equal(await page.locator('#development-debug').count(),0);assert.equal(await page.evaluate(()=>__debugListenerCount()),0);
    await page.evaluate(async()=>{const resource=performance.getEntriesByType('resource').find(r=>new URL(r.name).pathname.endsWith('/DevelopmentDebug.mjs'));const m=await import(resource.name);const next=m.createDevelopmentDebug({enabled:true,canvas:document.querySelector('#island')});next.dispose();});assert.equal(await page.evaluate(()=>__debugListenerCount()),0);
   }
   assert.deepEqual(observer.snapshot().unexpected,[]);assert.deepEqual(observer.snapshot().missingExpected,[]);
   runs.push({mode,viewport:{width:1280,height:720},dpr:1,raf:stats(intervals),debug:snapshot,errors:observer.snapshot(),resizeCases:mode==='off'?0:2});observer.dispose();await context.close();
  }
  const context=await browser.newContext(),page=await context.newPage(),observer=observeBrowser(page);const url=new URL(process.env.GAME_URL||'http://127.0.0.1:8000/');url.searchParams.set('debug','1');await page.goto(url.href);await page.waitForFunction(()=>window.IslandDebug?.snapshot().metrics.samples>0);
  observer.expect('pageerror','fixture-private-exception');await page.evaluate(()=>setTimeout(()=>{throw Error('fixture-private-exception');},0));await page.waitForFunction(()=>IslandDebug.snapshot().diagnostics.records.some(r=>r.code==='WINDOW_ERROR'));
  observer.expect('pageerror','fixture-private-rejection');await page.evaluate(()=>{setTimeout(()=>{Promise.reject(Error('fixture-private-rejection'));},0);});await page.waitForFunction(()=>IslandDebug.snapshot().diagnostics.records.some(r=>r.code==='UNHANDLED_REJECTION'));
  observer.expect('console','fixture-console-error');await page.evaluate(()=>console.error('fixture-console-error'));
  const missingPath=new URL('assets/fixture-missing.png',url).pathname;observer.expect('http',`404 ${missingPath}`);observer.allow('console','Failed to load resource',1);observer.allow('requestfailed',missingPath,1);await page.evaluate(async()=>{const response=await fetch(new URL('assets/fixture-missing.png',document.baseURI));await response.text();});
  await page.waitForTimeout(100);
  const failure=await page.evaluate(async()=>{const resource=performance.getEntriesByType('resource').find(r=>new URL(r.name).pathname.endsWith('/DevelopmentDebug.mjs'));const m=await import(resource.name),owner=m.createDevelopmentDebug({enabled:true,canvas:document.querySelector('#island')});let caught=false;try{await owner.diagnostics.observe('scene','SCENE_ENTER',async()=>{throw Error('fixture-private-scene');});}catch{caught=true;}return {caught,snapshot:owner.snapshot(),scene:IslandGame.snapshot().island};});assert(failure.caught);assert.equal(failure.scene,'dawn');assert.equal(JSON.stringify(failure.snapshot).includes('fixture-private'),false);
  assert.deepEqual(observer.snapshot().unexpected,[]);assert.deepEqual(observer.snapshot().missingExpected,[]);
  const failureResults=observer.snapshot();observer.dispose();await context.close();
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({runs,failureResults,scope:'runtime measurements, not performance acceptance thresholds'},null,2));
  console.log('PASS debug browser: default-off/no debug modules, read-only overlay + geometry, 4 resize cases, input compatibility, listener cleanup, real frame timings, expected/unexpected error detection; 3 screenshots');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
