/** Register generated isolated objects in fixed native-pixel cells, with inspected crops. */
const fs = require("node:fs"),
  path = require("node:path"),
  { chromium } = require("playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "assets/samples/dawn");
const sources = [
  {
    file: "foliage-stone.png",
    items: [
      ["palm", [0, 0, 512, 575], 84, 86],
      ["broadleaf", [512, 0, 512, 580], 88, 86],
      ["bush", [0, 590, 512, 385], 45, 34],
      ["boulder", [520, 580, 504, 395], 44, 40],
      ["brokenPillar", [75, 975, 395, 545], 34, 66],
      ["altar", [520, 985, 504, 540], 88, 84],
    ],
  },
  {
    file: "structure.png",
    items: [
      ["pillar", [0, 0, 512, 565], 30, 70],
      ["wall", [512, 0, 512, 565], 64, 48],
      ["fragment", [0, 575, 512, 450], 37, 27],
      ["brazier", [512, 570, 512, 455], 24, 40],
      ["flowers", [0, 1030, 512, 500], 32, 24],
      ["driftwood", [512, 1030, 512, 500], 44, 24],
    ],
  },
];
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(process.env.ASSET_URL || "http://127.0.0.1:8000");
  const palette = JSON.parse(fs.readFileSync(path.join(out, "palette.json")));
  const result = await page.evaluate(
    async ({ sources, palette }) => {
      const colors = palette.map((c) =>
          [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)),
        ),
        atlas = document.createElement("canvas");
      atlas.width = 384;
      atlas.height = 288;
      const ctx = atlas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      const definitions = [];
      for (const source of sources) {
        const img = new Image();
        img.src = "assets/samples/dawn/masters/" + source.file;
        await img.decode();
        const raw = document.createElement("canvas");
        raw.width = img.width;
        raw.height = img.height;
        const g = raw.getContext("2d");
        g.drawImage(img, 0, 0);
        const pixels = g.getImageData(0, 0, raw.width, raw.height).data;
        for (const [id, crop, maxW, maxH] of source.items) {
          const [sx, sy, sw, sh] = crop;
          let l = sx + sw,
            t = sy + sh,
            r = sx,
            b = sy;
          for (let y = sy; y < Math.min(sy + sh, img.height); y++)
            for (let x = sx; x < Math.min(sx + sw, img.width); x++)
              if (pixels[(y * img.width + x) * 4 + 3] >= 160) {
                l = Math.min(l, x);
                t = Math.min(t, y);
                r = Math.max(r, x);
                b = Math.max(b, y);
              }
          if (r <= l || b <= t) throw Error("Empty sprite " + id);
          const scale = Math.min(maxW / (r - l + 1), maxH / (b - t + 1)),
            w = Math.round((r - l + 1) * scale),
            h = Math.round((b - t + 1) * scale),
            cell = document.createElement("canvas");
          cell.width = cell.height = 96;
          const c = cell.getContext("2d");
          c.imageSmoothingEnabled = false;
          c.drawImage(
            img,
            l,
            t,
            r - l + 1,
            b - t + 1,
            Math.round(48 - w / 2),
            90 - h,
            w,
            h,
          );
          const p = c.getImageData(0, 0, 96, 96),
            cache = new Map();
          let bounds = [96, 96, 0, 0];
          for (let i = 0; i < p.data.length; i += 4) {
            if (p.data[i + 3] < 160) {
              p.data[i] = p.data[i + 1] = p.data[i + 2] = p.data[i + 3] = 0;
              continue;
            }
            const key =
              (p.data[i] << 16) | (p.data[i + 1] << 8) | p.data[i + 2];
            let color = cache.get(key);
            if (!color) {
              let distance = Infinity;
              for (const q of colors) {
                const d =
                  0.3 * (q[0] - p.data[i]) ** 2 +
                  0.59 * (q[1] - p.data[i + 1]) ** 2 +
                  0.11 * (q[2] - p.data[i + 2]) ** 2;
                if (d < distance) {
                  distance = d;
                  color = q;
                }
              }
              cache.set(key, color);
            }
            p.data.set([...color, 255], i);
            const x = (i / 4) % 96,
              y = Math.floor(i / 4 / 96);
            bounds = [
              Math.min(bounds[0], x),
              Math.min(bounds[1], y),
              Math.max(bounds[2], x),
              Math.max(bounds[3], y),
            ];
          }
          c.putImageData(p, 0, 0);
          const frame = definitions.length;
          ctx.drawImage(cell, (frame % 4) * 96, Math.floor(frame / 4) * 96);
          definitions.push({
            id,
            frame,
            rect: [(frame % 4) * 96, Math.floor(frame / 4) * 96, 96, 96],
            origin: [48, 90],
            bounds,
            source: { file: source.file, rect: [l, t, r - l + 1, b - t + 1] },
          });
        }
      }
      return { png: atlas.toDataURL().split(",")[1], definitions };
    },
    { sources, palette },
  );
  fs.writeFileSync(
    path.join(out, "objects.png"),
    Buffer.from(result.png, "base64"),
  );
  fs.writeFileSync(
    path.join(out, "objects.json"),
    JSON.stringify(result.definitions, null, 2) + "\n",
  );
  await browser.close();
  console.log(
    "Registered",
    result.definitions.length,
    "isolated pixel objects",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
