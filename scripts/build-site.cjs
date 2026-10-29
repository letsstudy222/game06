/** Static Pages artifact; one revision tag for the complete ES module graph. */
const fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "_site");
const modules = fs
  .readdirSync(path.join(root, "src/island"))
  .filter((n) => n.endsWith(".mjs"))
  .sort();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const revision = crypto
  .createHash("sha256")
  .update(
    modules.map((n) => read("src/island/" + n)).join("\n") +
      read("index.html") +
      read("style.css"),
  )
  .digest("hex")
  .slice(0, 12);
fs.rmSync(out, { recursive: true, force: true });
function copy(source, target = source) {
  const destination = path.join(out, target);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(path.join(root, source), destination, { recursive: true });
}
for (const file of [
  "style.css",
  "assets/favicon.svg",
  "assets/fonts/VT323-Regular.ttf",
  "assets/fonts/VT323-OFL.txt",
  "assets/production/manifest.json",
  "assets/production/dawn/world.png",
  "assets/production/dawn/props.png",
  "assets/production/phoenix/atlas.png",
])
  copy(file);
fs.mkdirSync(path.join(out, "src/island"), { recursive: true });
for (const name of modules) {
  const source = read("src/island/" + name).replace(
    /(from\s+["'])(\.\/[^"'?]+\.mjs)(["'])/g,
    `$1$2?v=${revision}$3`,
  );
  fs.writeFileSync(path.join(out, "src/island", name), source);
}
fs.writeFileSync(
  path.join(out, "index.html"),
  read("index.html")
    .replace(/style\.css\?v=[^"']+/g, "style.css?v=" + revision)
    .replace(
      /src\/island\/main\.mjs\?v=[^"']+/g,
      "src/island/main.mjs?v=" + revision,
    ),
);
for (const name of ["meadow", "forest", "ruins", "beach", "fire"])
  copy("artifacts/dawn-" + name + ".png", "screenshots/dawn-" + name + ".png");
for (const name of ["ui-before", "ui-after"])
  copy("artifacts/" + name, "screenshots/" + name);
console.log("Static Pages package ready:", revision);
