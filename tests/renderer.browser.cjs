const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const results = {fingerprints:[],viewports:[],pixelChecks:0};
  try {
    for (const dpr of [1,2]) {
      const context = await browser.newContext({viewport:{width:1366,height:768},deviceScaleFactor:dpr});
      const page = await context.newPage(), errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
      await page.goto(process.env.GAME_URL || 'http://127.0.0.1:8000/');
      await page.waitForFunction(()=>window.IslandGame?.ready());
      for (const [width,height] of [[1366,768],[390,844],[844,390]]) {
        await page.setViewportSize({width,height});
        await page.waitForFunction(()=>Math.round(document.querySelector('.game-frame').getBoundingClientRect().width)===Math.round(window.visualViewport?.width || innerWidth));
        const v=await page.evaluate(()=>({dpr:devicePixelRatio,v:IslandGame.view(),filter:getComputedStyle(document.querySelector('#island')).imageRendering,smoothing:document.querySelector('#island').getContext('2d').imageSmoothingEnabled}));
        assert.equal(v.dpr,dpr);assert(Number.isInteger(v.v.scale));assert.equal(v.filter,'pixelated');assert.equal(v.smoothing,false);assert(v.v.width<=v.v.world.width && v.v.height<=v.v.world.height);
        results.viewports.push({dpr,width,height,canvas:[v.v.width,v.v.height],scale:v.v.scale});
      }
      if (dpr===1) {
        results.fingerprints=await page.evaluate(async()=>{
          const {GameState}=await import(new URL('src/island/GameState.mjs',document.baseURI));
          const {IslandScene}=await import(new URL('src/island/IslandScene.mjs',document.baseURI));
          const {AssetLoader}=await import(new URL('src/island/AssetLoader.mjs',document.baseURI));
          const result=[];
          for(const id of ['dawn','dawn-sample']) {
            const state=new GameState(id),assets=await new AssetLoader(state.island.assetManifest).load(),scene=new IslandScene(state.island,assets),canvas=document.createElement('canvas');
            canvas.width=640;canvas.height=360;scene.attach(canvas);state.camera.resize(640,360,state.player);state.time=1.25;
            const cases=[['idle',0,1],['idle',1,0],['idle',0,-1],['idle',-1,0],['move',1,0],['move',-1,0],['move',0,1],['move',0,-1],['attack',1,0],['fire',-1,0],['hurt',0,1],['fly',1,0]];
            for (const [name,x,y] of cases) {
              state.player.animation.set(name,true);state.player.animation.elapsed=0.12;state.player.facing={x,y};state.player.hovering=name==='fly';scene.draw(state);
              const bytes=canvas.getContext('2d').getImageData(0,0,640,360).data;
              const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(v=>v.toString(16).padStart(2,'0')).join('');
              result.push({id,name,x,y,hash});
            }
          }
          return result;
        });
      }
      if (!process.env.FINGERPRINT_ONLY) {
        const checks=await page.evaluate(async()=>{
          const {prepareSpriteFrame,drawPreparedSprite,worldToScreen,resolveDirectionalClip}=await import(new URL('src/island/RenderPrimitives.mjs',document.baseURI));
          const img=new Image();img.src=new URL('assets/production/phoenix/atlas.png',document.baseURI);await img.decode();
          let count=0;
          for (const mirror of [false,true]) for(const pos of [{x:64,y:96},{x:64.2,y:95.8}]) {
            const a=document.createElement('canvas'),b=document.createElement('canvas');a.width=b.width=160;a.height=b.height=160;const ca=a.getContext('2d'),cb=b.getContext('2d');
            ca.imageSmoothingEnabled=cb.imageSmoothingEnabled=false;
            const f=prepareSpriteFrame({rect:[0,0,96,96],anchor:[48,72]}, {width:img.naturalWidth,height:img.naturalHeight});
            drawPreparedSprite(ca,img,f,pos,{mirror});
            if(mirror){cb.translate(Math.round(pos.x),Math.round(pos.y));cb.scale(-1,1);cb.drawImage(img,0,0,96,96,-48,-72,96,96);}
            else cb.drawImage(img,0,0,96,96,Math.round(pos.x-48),Math.round(pos.y-72),96,96);
            const da=ca.getImageData(0,0,160,160).data,db=cb.getImageData(0,0,160,160).data;
            if(!da.every((v,i)=>v===db[i]))throw Error('Pixel anchor/mirror không khớp reference');count++;
          }
          if(worldToScreen({x:20.4,y:30.6},{x:3.3,y:4.8}).y!==26)throw Error('World-screen transform sai');
          if(resolveDirectionalClip('ne',{n:{clipId:'n'}},[{id:'n'}],{ne:'n'}).visualDirection!=='n')throw Error('Fallback sai');
          return count;
        });
        results.pixelChecks+=checks;
      }
      assert.deepEqual(errors,[]);await context.close();
    }
    if(process.env.RENDER_BASELINE)assert.deepEqual(results.fingerprints,JSON.parse(fs.readFileSync(process.env.RENDER_BASELINE)).fingerprints,'RGBA scenes phải giữ baseline');
    const out=process.env.ARTIFACT_DIR || 'artifacts/renderer';fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
    console.log(`PASS renderer: ${results.fingerprints.length} deterministic RGBA scene hashes; ${results.viewports.length} DPR/resize views; ${results.pixelChecks} Canvas pixel comparisons; zero page/asset errors`);
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
