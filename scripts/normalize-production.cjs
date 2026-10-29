/* Production asset preparation: verified isolated source rectangles, shared palette,
   fixed frame canvases, nearest-neighbor, integer anchors and binary alpha.
   Requires Playwright/Chromium only when rebuilding art, never at runtime. */
const fs = require("node:fs"),
  path = require("node:path");
const { chromium } = require("playwright");
const ROOT = path.join(__dirname, "..");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(process.env.ASSET_URL || "http://127.0.0.1:8000/");
  const output = await page.evaluate(async () => {
    const image = async (url) => {
      const i = new Image();
      i.src = url;
      await i.decode();
      return i;
    };
    const [world, props, hero] = await Promise.all([
      image("assets/production/dawn/world-master.png"),
      image("assets/production/dawn/props-master.png"),
      image("assets/production/phoenix/master.png"),
    ]);
    function canvas(w, h) {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      c.getContext("2d").imageSmoothingEnabled = false;
      return c;
    }
    const terrain = canvas(960, 640);
    terrain.getContext("2d").drawImage(world, 0, 0, 960, 640);
    const poses = [
      {
        direction: "down",
        rect: [59, 73, 378, 358],
        pivot: [244, 410],
        origin: [48, 72],
      },
      {
        direction: "down",
        rect: [552, 75, 383, 365],
        pivot: [747, 420],
        origin: [48, 72],
      },
      {
        direction: "left",
        rect: [71, 548, 389, 349],
        pivot: [170, 880],
        origin: [45, 72],
      },
      {
        direction: "left",
        rect: [581, 604, 403, 298],
        pivot: [674, 885],
        origin: [45, 72],
      },
      {
        direction: "up",
        rect: [55, 996, 415, 433],
        pivot: [250, 1225],
        origin: [48, 52],
      },
      {
        direction: "up",
        rect: [554, 1021, 416, 411],
        pivot: [760, 1230],
        origin: [48, 52],
      },
    ];
    const actor = canvas(192, 288);
    poses.forEach((p, i) => {
      const x = (i % 2) * 96,
        y = Math.floor(i / 2) * 96,
        c = actor.getContext("2d"),
        [sx, sy, sw, sh] = p.rect;
      c.save();
      c.beginPath();
      c.rect(x, y, 96, 96);
      c.clip();
      c.drawImage(
        hero,
        sx,
        sy,
        sw,
        sh,
        x + p.origin[0] + (sx - p.pivot[0]) * 0.16,
        y + p.origin[1] + (sy - p.pivot[1]) * 0.16,
        sw * 0.16,
        sh * 0.16,
      );
      c.restore();
    });
    const propDefinitions = [
      { id: "oak", rect: [0, 0, 535, 480], pivot: [268, 449], scale: 0.18 },
      {
        id: "youngTree",
        rect: [535, 0, 489, 480],
        pivot: [770, 460],
        scale: 0.18,
      },
      {
        id: "boulder",
        rect: [0, 475, 535, 340],
        pivot: [260, 796],
        scale: 0.095,
      },
      {
        id: "standingRock",
        rect: [535, 475, 489, 340],
        pivot: [790, 800],
        scale: 0.095,
      },
      {
        id: "bramble",
        rect: [535, 815, 489, 315],
        pivot: [780, 1105],
        scale: 0.1,
      },
      {
        id: "runeStone",
        rect: [570, 1135, 454, 401],
        pivot: [780, 1506],
        scale: 0.12,
      },
    ];
    const propAtlas = canvas(192, 288);
    propDefinitions.forEach((p, i) => {
      const x = (i % 2) * 96,
        y = Math.floor(i / 2) * 96,
        c = propAtlas.getContext("2d"),
        [sx, sy, sw, sh] = p.rect;
      c.save();
      c.beginPath();
      c.rect(x, y, 96, 96);
      c.clip();
      c.drawImage(
        props,
        sx,
        sy,
        sw,
        sh,
        x + 48 + (sx - p.pivot[0]) * p.scale,
        y + 90 + (sy - p.pivot[1]) * p.scale,
        sw * p.scale,
        sh * p.scale,
      );
      c.restore();
    });
    function paletteFor(canvases, count) {
      const histogram = new Map();
      for (const c of canvases) {
        const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] < 160) continue;
          const key =
              ((d[i] >> 3) << 10) | ((d[i + 1] >> 3) << 5) | (d[i + 2] >> 3),
            v = histogram.get(key) || { r: 0, g: 0, b: 0, n: 0 };
          v.r += d[i];
          v.g += d[i + 1];
          v.b += d[i + 2];
          v.n++;
          histogram.set(key, v);
        }
      }
      let boxes = [
        [...histogram.values()].map((v) => ({
          r: v.r / v.n,
          g: v.g / v.n,
          b: v.b / v.n,
          n: v.n,
        })),
      ];
      function range(box) {
        return ["r", "g", "b"].map(
          (k) =>
            Math.max(...box.map((p) => p[k])) -
            Math.min(...box.map((p) => p[k])),
        );
      }
      while (boxes.length < count) {
        let best = -1,
          score = -1,
          channel = 0;
        for (let i = 0; i < boxes.length; i++) {
          if (boxes[i].length < 2) continue;
          const r = range(boxes[i]),
            max = Math.max(...r),
            n = boxes[i].reduce((s, p) => s + p.n, 0),
            v = max * Math.sqrt(n);
          if (v > score) {
            score = v;
            best = i;
            channel = r.indexOf(max);
          }
        }
        if (best < 0) break;
        const box = boxes.splice(best, 1)[0],
          key = ["r", "g", "b"][channel];
        box.sort((a, b) => a[key] - b[key]);
        const total = box.reduce((s, p) => s + p.n, 0);
        let sum = 0,
          split = 1;
        for (let i = 0; i < box.length - 1; i++) {
          sum += box[i].n;
          if (sum >= total / 2) {
            split = i + 1;
            break;
          }
        }
        boxes.push(box.slice(0, split), box.slice(split));
      }
      return boxes.map((box) => {
        const n = box.reduce((s, p) => s + p.n, 0);
        return ["r", "g", "b"].map((k) =>
          Math.round(box.reduce((s, p) => s + p[k] * p.n, 0) / n),
        );
      });
    }
    function quantize(c, palette) {
      const ctx = c.getContext("2d"),
        d = ctx.getImageData(0, 0, c.width, c.height),
        cache = new Map();
      for (let i = 0; i < d.data.length; i += 4) {
        if (d.data[i + 3] < 160) {
          d.data[i] = d.data[i + 1] = d.data[i + 2] = d.data[i + 3] = 0;
          continue;
        }
        const r = d.data[i],
          g = d.data[i + 1],
          b = d.data[i + 2],
          key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
        let color = cache.get(key);
        if (!color) {
          let best = Infinity;
          for (const p of palette) {
            const score =
              (r - p[0]) ** 2 + (g - p[1]) ** 2 * 1.2 + (b - p[2]) ** 2;
            if (score < best) {
              best = score;
              color = p;
            }
          }
          cache.set(key, color);
        }
        d.data[i] = color[0];
        d.data[i + 1] = color[1];
        d.data[i + 2] = color[2];
        d.data[i + 3] = 255;
      }
      ctx.putImageData(d, 0, 0);
      return c.toDataURL("image/png").split(",")[1];
    }
    const environmentPalette = paletteFor([terrain, propAtlas], 128),
      heroPalette = paletteFor([actor], 48);
    const worldPng = quantize(terrain, environmentPalette),
      propsPng = quantize(propAtlas, environmentPalette),
      heroPng = quantize(actor, heroPalette);
    // Measure the actual baked frame bounds so QA can reject any frame clipped at its edge.
    const bounds = [];
    const d = actor.getContext("2d").getImageData(0, 0, 192, 288).data;
    for (let index = 0; index < 6; index++) {
      let l = 96,
        t = 96,
        r = -1,
        b = -1;
      const x = (index % 2) * 96,
        y = Math.floor(index / 2) * 96;
      for (let yy = 0; yy < 96; yy++)
        for (let xx = 0; xx < 96; xx++)
          if (d[((y + yy) * 192 + x + xx) * 4 + 3]) {
            l = Math.min(l, xx);
            t = Math.min(t, yy);
            r = Math.max(r, xx);
            b = Math.max(b, yy);
          }
      bounds.push([l, t, r + 1, b + 1]);
    }
    return {
      worldPng,
      propsPng,
      heroPng,
      environmentPalette,
      heroPalette,
      poses,
      propDefinitions,
      bounds,
    };
  });
  for (const [file, key] of [
    ["assets/production/dawn/world.png", "worldPng"],
    ["assets/production/dawn/props.png", "propsPng"],
    ["assets/production/phoenix/atlas.png", "heroPng"],
  ])
    fs.writeFileSync(path.join(ROOT, file), Buffer.from(output[key], "base64"));
  const manifest = {
    version: 1,
    environment: {
      world: "assets/production/dawn/world.png",
      worldSize: [960, 640],
      props: "assets/production/dawn/props.png",
      frameSize: 96,
      columns: 2,
      origin: [48, 90],
      definitions: output.propDefinitions.map((p, i) => ({
        id: p.id,
        frame: i,
      })),
    },
    phoenix: {
      image: "assets/production/phoenix/atlas.png",
      frameSize: 96,
      columns: 2,
      posesPerDirection: 2,
      directions: {
        down: { row: 0, origin: [48, 72] },
        left: { row: 1, origin: [45, 72] },
        right: { row: 1, origin: [45, 72], mirror: true },
        up: { row: 2, origin: [48, 52] },
      },
      bounds: output.bounds,
    },
    palette: {
      environment: output.environmentPalette,
      phoenix: output.heroPalette,
    },
    source: {
      worldMaster: "assets/production/dawn/world-master.png",
      propsMaster: "assets/production/dawn/props-master.png",
      phoenixMaster: "assets/production/phoenix/master.png",
      safePoseRects: output.poses,
    },
  };
  fs.writeFileSync(
    path.join(ROOT, "assets/production/manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(
    "Production atlases baked. Phoenix bounds:",
    JSON.stringify(output.bounds),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
