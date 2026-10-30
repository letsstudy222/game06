const fs = require("node:fs"),
  path = require("node:path"),
  { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const p = await b.newPage();
  await p.goto(process.env.ASSET_URL || "http://127.0.0.1:8000");
  const result = await p.evaluate(async () => {
    const groups = [
      ["grass", ["#467e4e", "#5c914e", "#7ca653", "#9fba5e"]],
      ["sand", ["#baa56a", "#d2be87", "#e4d29b", "#f3e1b3"]],
      ["dirt", ["#806741", "#a08550", "#baa56a", "#d2be87"]],
      [
        "cliff",
        [
          "#3b535b",
          "#526b6b",
          "#6b8280",
          "#8d9d93",
          "#afbaa6",
          "#999577",
          "#b8ad86",
          "#d2c49c",
        ],
      ],
      [
        "floor",
        [
          "#3b535b",
          "#526b6b",
          "#6b8280",
          "#8d9d93",
          "#afbaa6",
          "#ced0b3",
          "#346b4c",
          "#467e4e",
          "#5c914e",
        ],
      ],
      ["shallow", ["#2f8490", "#399a9c", "#55b2ab", "#86c9bb", "#b8dfcf"]],
    ];
    const src = new Image();
    src.src = "assets/samples/dawn/masters/materials.png";
    await src.decode();
    const out = document.createElement("canvas");
    out.width = 96;
    out.height = 64;
    const g = out.getContext("2d");
    g.imageSmoothingEnabled = false;
    groups.forEach(([id, palette], i) => {
      const c = document.createElement("canvas");
      c.width = c.height = 32;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        src,
        (i % 2) * 512,
        Math.floor(i / 2) * 512,
        512,
        512,
        0,
        0,
        32,
        32,
      );
      const pixels = ctx.getImageData(0, 0, 32, 32),
        colors = palette.map((s) =>
          [1, 3, 5].map((n) => parseInt(s.slice(n, n + 2), 16)),
        );
      for (let k = 0; k < pixels.data.length; k += 4) {
        let best = colors[0],
          dist = Infinity;
        for (const q of colors) {
          const d =
            0.3 * (q[0] - pixels.data[k]) ** 2 +
            0.59 * (q[1] - pixels.data[k + 1]) ** 2 +
            0.11 * (q[2] - pixels.data[k + 2]) ** 2;
          if (d < dist) {
            dist = d;
            best = q;
          }
        }
        pixels.data.set([...best, 255], k);
      }
      ctx.putImageData(pixels, 0, 0);
      g.drawImage(c, (i % 3) * 32, Math.floor(i / 3) * 32);
    });
    return out.toDataURL().split(",")[1];
  });
  fs.writeFileSync(
    path.resolve(__dirname, "../assets/samples/dawn/materials.png"),
    Buffer.from(result, "base64"),
  );
  await b.close();
  console.log("Normalized six native 32px material swatches");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
