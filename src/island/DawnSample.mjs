/** Approval sample only: three terraces, tropical clearing and a coherent sun shrine. */
export function buildDawnSample() {
  const columns = 26,
    rows = 22,
    s = 32,
    ground = Array.from({ length: rows }, () => Array(columns).fill("deep"));
  const edges = [
    null,
    null,
    [7, 20],
    [5, 22],
    [3, 23],
    [2, 23],
    [2, 23],
    [2, 23],
    [3, 23],
    [3, 24],
    [3, 24],
    [2, 24],
    [2, 24],
    [2, 23],
    [3, 23],
    [3, 23],
    [3, 23],
    [4, 22],
    [5, 21],
    [7, 19],
    null,
    null,
  ];
  for (let y = 0; y < rows; y++)
    if (edges[y])
      for (let x = edges[y][0]; x <= edges[y][1]; x++) ground[y][x] = "sand";
  for (const [x, y] of [
    [3, 8],
    [3, 9],
    [23, 12],
    [23, 13],
    [22, 13],
    [23, 14],
    [4, 16],
    [5, 17],
  ])
    ground[y][x] = "deep";
  const land = ground.map((row) => row.map((k) => k === "sand"));
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < columns; x++) {
      if (!land[y][x]) {
        if (
          [-2, -1, 0, 1, 2].some((dy) =>
            [-2, -1, 0, 1, 2].some((dx) => land[y + dy]?.[x + dx]),
          )
        )
          ground[y][x] = "shallow";
      } else if (
        [-2, -1, 0, 1, 2].every((dy) =>
          [-2, -1, 0, 1, 2].every((dx) => land[y + dy]?.[x + dx]),
        )
      )
        ground[y][x] = "grass";
    }
  const elevation = Array.from({ length: rows }, () => Array(columns).fill(0)),
    mood = Array.from({ length: rows }, () => Array(columns).fill("sun"));
  const paint = (kind, x, y, w, h) => {
    for (let j = y; j < y + h; j++)
      for (let i = x; i < x + w; i++) ground[j][i] = kind;
  };
  for (let y = 3; y < 11; y++)
    for (let x = 5; x <= 21; x++) {
      elevation[y][x] = 1;
      if (ground[y][x] === "sand") ground[y][x] = "grass";
      if (x < 8) mood[y][x] = "forest";
      else if (x < 10) mood[y][x] = "forestEdge";
    }
  for (let y = 3; y <= 6; y++)
    for (let x = 14; x <= 21; x++) {
      elevation[y][x] = 2;
      mood[y][x] = "ruins";
    }
  // Two distinct cliff bands with broad working stair connections.
  for (let x = 5; x <= 21; x++) {
    const front = x < 9 ? 10 : 11;
    ground[front][x] = "cliff";
    ground[front + 1][x] = "cliffFoot";
  }
  for (let x = 14; x <= 21; x++) {
    ground[7][x] = "cliff";
    ground[8][x] = "cliffFoot";
  }
  for (let y = 3; y <= 10; y++) ground[y][5] = "rim";
  for (let y = 9; y <= 10; y++) ground[y][21] = "rim";
  for (let x = 5; x <= 13; x++) ground[3][x] = "rim";
  for (let y = 3; y <= 6; y++) {
    ground[y][14] = "rim";
    ground[y][21] = "rim";
  }
  for (let x = 14; x <= 21; x++) {
    ground[2][x] = "rim";
    elevation[2][x] = 2;
  }
  paint("stairs", 10, 10, 3, 3);
  paint("stairs", 17, 7, 2, 2);
  paint("path", 11, 13, 2, 4);
  paint("path", 12, 16, 2, 3);
  paint("path", 10, 9, 9, 1);
  paint("path", 10, 8, 2, 2);
  paint("floor", 15, 3, 6, 4);
  paint("stonePath", 16, 9, 4, 1);
  paint("stonePath", 17, 6, 2, 1);
  for (const [x, y] of [
    [15, 3],
    [20, 3],
    [15, 6],
    [20, 6],
  ])
    ground[y][x] = "moss";
  const center = (x, y) => ({ x: x * s + 16, y: y * s + 16 });
  const o = (asset, x, y, extra = {}) => ({ ...center(x, y), asset, ...extra });
  const trees = [
    o("palm", 5, 14, { size: 1 }),
    o("palm", 20, 16, { size: 1 }),
    o("palm", 7, 18, { size: 1 }),
    o("palm", 21, 10, { size: 1 }),
    o("palm", 4, 6, { size: 1 }),
    o("broadleaf", 6, 6, { size: 1 }),
    o("broadleaf", 8, 5, { size: 1 }),
    o("broadleaf", 6, 8, { size: 1 }),
    o("broadleaf", 7, 9, { size: 1 }),
    o("broadleaf", 22, 5, { size: 1 }),
    o("palm", 22, 8, { size: 1 }),
  ];
  const rocks = [
    o("boulder", 8, 16, { r: 12 }),
    o("boulder", 20, 18, { r: 12 }),
    o("boulder", 22, 15, { r: 12 }),
  ];
  const props = [
    o("pillar", 15, 4),
    o("brokenPillar", 20, 4),
    o("pillar", 15, 6),
    o("brokenPillar", 20, 6),
    o("wall", 16, 3),
    o("wall", 19, 3),
    o("altar", 18, 4),
    o("fragment", 14, 5),
    o("fragment", 21, 6),
    o("brazier", 16, 5),
    o("brazier", 19, 5),
    o("flowers", 9, 14),
    o("flowers", 15, 15),
    o("flowers", 13, 8),
    o("flowers", 21, 10),
    o("driftwood", 16, 19),
  ];
  const solid = props
    .filter((p) =>
      [
        "pillar",
        "brokenPillar",
        "wall",
        "altar",
        "fragment",
        "brazier",
        "driftwood",
      ].includes(p.asset),
    )
    .map((p) => ({
      ...p,
      r:
        p.asset === "altar"
          ? 21
          : p.asset === "wall"
            ? 22
            : p.asset === "brazier"
              ? 7
              : 11,
    }));
  return {
    id: "dawn-sample",
    name: "Đảo Bình Minh",
    label: "DAWN ISLAND",
    assetManifest: "assets/samples/dawn/manifest.json",
    artProfile: "sun-ruins-sample",
    width: columns * s,
    height: rows * s,
    tilemap: { tileSize: s, columns, rows, ground, elevation, mood },
    spawn: center(12, 14),
    checkpoints: {
      beach: center(12, 18),
      forest: center(10, 7),
      cliff: center(11, 9),
      ruins: center(18, 6),
    },
    regions: [
      {
        id: "ruins",
        name: "Tàn tích Nhật Diệm",
        bounds: [14 * s, 2 * s, 8 * s, 5 * s],
      },
      {
        id: "forest",
        name: "Lối rừng ánh sớm",
        bounds: [4 * s, 4 * s, 7 * s, 6 * s],
      },
      {
        id: "cliff",
        name: "Thềm đá ánh sớm",
        bounds: [10 * s, 7 * s, 11 * s, 6 * s],
      },
      {
        id: "beach",
        name: "Bãi biển phía Nam",
        bounds: [4 * s, 17 * s, 19 * s, 4 * s],
      },
      {
        id: "meadow",
        name: "Đồng cỏ Bình Minh",
        bounds: [4 * s, 13 * s, 20 * s, 4 * s],
      },
    ],
    trees,
    rocks,
    bushes: [
      o("bush", 7, 13),
      o("bush", 18, 15),
      o("bush", 8, 7),
      o("bush", 21, 4),
    ],
    hazards: [],
    props,
    targets: [],
    colliders: solid,
    shrine: {
      ...center(18, 6),
      visual: center(18, 4),
      radius: 44,
      name: "Bệ đá Nhật Diệm",
    },
    foam: [],
    ambient: [
      { ...center(10, 15), type: "butterfly" },
      { ...center(15, 14), type: "butterfly" },
      { ...center(18, 4), type: "ember" },
    ],
  };
}
