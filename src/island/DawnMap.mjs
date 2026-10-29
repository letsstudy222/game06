/** Authored 40×28 island. Coordinates below are tile cells, never image crops. */
export const TILE_SIZE = 32;
export function buildDawnMap() {
  const columns = 40,
    rows = 28,
    grid = Array.from({ length: rows }, () => Array(columns).fill("deep"));
  const coast = [
    null,
    null,
    [15, 23],
    [11, 28],
    [8, 31],
    [6, 33],
    [5, 34],
    [4, 35],
    [4, 35],
    [3, 36],
    [3, 36],
    [4, 36],
    [5, 35],
    [5, 35],
    [4, 35],
    [3, 36],
    [3, 36],
    [3, 35],
    [4, 34],
    [4, 34],
    [5, 34],
    [5, 33],
    [6, 32],
    [8, 31],
    [10, 29],
    [12, 27],
    null,
    null,
  ];
  for (let y = 0; y < rows; y++)
    if (coast[y])
      for (let x = coast[y][0]; x <= coast[y][1]; x++) grid[y][x] = "sand";
  // Two deliberately cut coves break the island silhouette.
  for (const [x, y] of [
    [5, 11],
    [5, 12],
    [6, 12],
    [5, 13],
    [6, 13],
    [32, 18],
    [33, 18],
    [34, 18],
    [33, 19],
    [34, 19],
  ])
    grid[y][x] = "deep";
  const land = (x, y) => grid[y]?.[x] && grid[y][x] !== "deep";
  const mask = grid.map((row) => row.map((v) => v !== "deep"));
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < columns; x++) {
      if (!mask[y][x]) {
        if (
          [-2, -1, 0, 1, 2].some((dy) =>
            [-2, -1, 0, 1, 2].some((dx) => mask[y + dy]?.[x + dx]),
          )
        )
          grid[y][x] = "shallow";
        continue;
      }
      if (
        [-2, -1, 0, 1, 2].every((dy) =>
          [-2, -1, 0, 1, 2].every((dx) => mask[y + dy]?.[x + dx]),
        )
      )
        grid[y][x] = "grass";
    }
  // Raised north terrace: shaped outline, solid stone rim, one broad stair passage.
  const terrace = {
    5: [15, 27],
    6: [12, 30],
    7: [10, 32],
    8: [9, 33],
    9: [9, 33],
    10: [9, 33],
    11: [9, 33],
    12: [10, 32],
    13: [11, 31],
  };
  const raised = (x, y) =>
    terrace[y] && x >= terrace[y][0] && x <= terrace[y][1];
  const elevation = Array.from({ length: rows }, () => Array(columns).fill(0));
  for (let y = 5; y <= 13; y++)
    for (let x = terrace[y][0]; x <= terrace[y][1]; x++) {
      elevation[y][x] = 1;
      grid[y][x] =
        !raised(x - 1, y) || !raised(x + 1, y) || !raised(x, y - 1)
          ? "rim"
          : "grass";
    }
  for (let x = 11; x <= 31; x++) {
    const front = x < 15 ? 13 : x > 24 && x < 29 ? 15 : 14;
    for (let y = 13; y < front; y++) grid[y][x] = "grass";
    grid[front][x] = "cliff";
    grid[front + 1][x] = "cliffFoot";
  }
  const paint = (kind, x, y, w, h) => {
    for (let j = y; j < y + h; j++)
      for (let i = x; i < x + w; i++) grid[j][i] = kind;
  };
  // Readable paths connect beach → clearing → stairs → grove/ruins, no random scatter.
  paint("path", 20, 17, 2, 6);
  paint("path", 11, 18, 19, 2);
  paint("grass", 17, 19, 6, 3);
  paint("path", 23, 19, 2, 3);
  paint("path", 20, 22, 5, 1);
  paint("path", 19, 10, 3, 4);
  paint("path", 20, 10, 8, 2);
  paint("path", 13, 10, 7, 2);
  paint("stairs", 19, 13, 3, 4);
  paint("path", 19, 22, 3, 2);
  paint("floor", 25, 7, 7, 6);
  for (const [x, y] of [
    [25, 7],
    [26, 7],
    [31, 7],
    [25, 12],
    [30, 12],
    [31, 12],
    [25, 9],
    [28, 8],
    [30, 10],
  ])
    grid[y][x] = "moss";
  for (const [x, y] of [
    [25, 7],
    [31, 7],
    [25, 12],
    [31, 12],
  ])
    grid[y][x] = "grass";
  // A worn floor opening faces west toward the central terrace path.
  paint("floor", 24, 10, 2, 2);
  const center = (x, y) => ({ x: x * 32 + 16, y: y * 32 + 16 });
  const object = (asset, x, y, extra = {}) => ({
    ...center(x, y),
    asset,
    ...extra,
  });
  return {
    id: "dawn",
    name: "Đảo Bình Minh",
    label: "DAWN ISLAND",
    assetManifest: "assets/tiles/dawn/manifest.json",
    width: columns * 32,
    height: rows * 32,
    tilemap: { tileSize: 32, columns, rows, ground: grid, elevation },
    spawn: center(19, 20),
    checkpoints: {
      beach: center(20, 24),
      forest: center(14, 11),
      cliff: center(20, 12),
      ruins: center(29, 10),
    },
    regions: [
      {
        id: "ruins",
        name: "Tàn tích Nhật Diệm",
        bounds: [24 * 32, 6 * 32, 9 * 32, 8 * 32],
      },
      {
        id: "forest",
        name: "Lối rừng ánh sớm",
        bounds: [10 * 32, 6 * 32, 8 * 32, 8 * 32],
      },
      {
        id: "cliff",
        name: "Thềm đá ánh sớm",
        bounds: [18 * 32, 9 * 32, 6 * 32, 9 * 32],
      },
      {
        id: "beach",
        name: "Bãi biển phía Nam",
        bounds: [6 * 32, 23 * 32, 27 * 32, 4 * 32],
      },
      {
        id: "meadow",
        name: "Đồng cỏ Bình Minh",
        bounds: [5 * 32, 16 * 32, 29 * 32, 7 * 32],
      },
    ],
    trees: [
      object("palm", 7, 17, { size: 1 }),
      object("palm", 8, 21, { size: 1 }),
      object("palm", 29, 21, { size: 1 }),
      object("palm", 31, 16, { size: 1 }),
      object("palm", 26, 23, { size: 1 }),
      object("palm", 12, 23, { size: 1 }),
      object("broadleaf", 12, 8, { size: 1 }),
      object("broadleaf", 15, 8, { size: 1 }),
      object("broadleaf", 11, 11, { size: 1 }),
      object("broadleaf", 16, 12, { size: 1 }),
      object("broadleaf", 24, 6, { size: 1 }),
      object("palm", 28, 5, { size: 1 }),
      object("broadleaf", 10, 17, { size: 1 }),
      object("palm", 27, 17, { size: 1 }),
    ],
    rocks: [
      object("boulder", 12, 21, { r: 11 }),
      object("boulder", 29, 18, { r: 11 }),
      object("boulder", 17, 24, { r: 11 }),
      object("boulder", 34, 10, { r: 11 }),
    ],
    bushes: [
      object("bush", 9, 19),
      object("bush", 28, 20),
      object("bush", 15, 16),
      object("bush", 24, 17),
    ],
    hazards: [
      object("bramble", 14, 20, { r: 10 }),
      object("bramble", 26, 20, { r: 10 }),
    ],
    props: [
      object("pillar", 26, 8),
      object("brokenPillar", 31, 8),
      object("brokenPillar", 26, 12),
      object("pillar", 31, 12),
      object("altar", 29, 8),
      object("brazier", 27, 9),
      object("brazier", 31, 10),
      object("fragment", 25, 7),
      object("fragment", 30, 12),
      object("log", 9, 17),
      object("flowers", 16, 18),
      object("flowers", 23, 20),
      object("flowers", 15, 22),
      object("flowers", 24, 9),
      object("flowers", 14, 12),
      object("shell", 19, 25),
      object("shell", 23, 24),
      object("shell", 9, 22),
    ],
    colliders: [
      { ...center(9, 17), r: 16 },
      ...[
        [26, 8, 12],
        [31, 8, 12],
        [26, 12, 12],
        [31, 12, 12],
        [29, 8, 20],
        [27, 9, 7],
        [31, 10, 7],
      ].map(([x, y, r]) => ({ ...center(x, y), r })),
    ],
    shrine: {
      ...center(29, 10),
      visual: center(29, 8),
      radius: 47,
      name: "Bệ đá Nhật Diệm",
    },
    targets: [],
    foam: [],
    ambient: [
      { ...center(17, 19), type: "butterfly" },
      { ...center(23, 21), type: "butterfly" },
      { ...center(29, 8), type: "ember" },
    ],
  };
}
