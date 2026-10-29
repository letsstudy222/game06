(function (root) {
  "use strict";
  const app = (root.TinyFarm = root.TinyFarm || {});
  const farmerFrames = [
    [
      [138, 26, 195, 287],
      [404, 23, 189, 284],
      [663, 26, 192, 285],
      [925, 24, 191, 282],
    ],
    [
      [150, 326, 182, 284],
      [406, 327, 185, 282],
      [674, 328, 181, 281],
      [935, 326, 178, 283],
    ],
    [
      [130, 633, 187, 277],
      [391, 629, 183, 283],
      [662, 632, 186, 280],
      [927, 631, 182, 281],
    ],
    [
      [153, 924, 165, 291],
      [415, 925, 164, 286],
      [676, 926, 166, 289],
      [938, 929, 165, 284],
    ],
  ];
  const PLOTS = Array.from({ length: 12 }, (_, i) => ({
    x: 83 + (i % 4) * 27,
    y: 177 + Math.floor(i / 4) * 20,
  }));
  const GATHERS = [
    { x: 278, y: 123 },
    { x: 364, y: 124 },
    { x: 190, y: 260 },
    { x: 277, y: 250 },
    { x: 303, y: 265 },
    { x: 70, y: 149 },
  ];
  const PLACES = [
    {
      id: "home",
      x: 157,
      y: 109,
      name: "Mái nhà của bạn",
      icon: "home",
      approach: { x: 157, y: 126 },
    },
    {
      id: "shop",
      x: 251,
      y: 130,
      name: "Quầy nông sản",
      icon: "bag",
      approach: { x: 250, y: 142 },
    },
    {
      id: "an",
      x: 274,
      y: 142,
      name: "An · Người hàng xóm",
      icon: "heart",
      approach: { x: 270, y: 150 },
    },
    {
      id: "pond",
      x: 325,
      y: 209,
      name: "Bến câu cá",
      icon: "fish",
      approach: { x: 316, y: 213 },
    },
    {
      id: "shrine",
      x: 329,
      y: 267,
      name: "Đài Bình Minh",
      icon: "star",
      approach: { x: 321, y: 266 },
    },
  ];
  const polygons = [
    [
      [215, 45],
      [244, 45],
      [244, 310],
      [215, 310],
    ],
    [
      [51, 127],
      [330, 127],
      [330, 151],
      [51, 151],
    ],
    [
      [145, 103],
      [165, 103],
      [165, 139],
      [145, 139],
    ],
    [
      [68, 164],
      [206, 164],
      [206, 239],
      [68, 239],
    ],
    [
      [201, 145],
      [245, 145],
      [245, 275],
      [201, 275],
    ],
    [
      [242, 142],
      [309, 142],
      [309, 242],
      [242, 242],
    ],
    [
      [245, 115],
      [391, 115],
      [391, 138],
      [245, 138],
    ],
    [
      [302, 201],
      [337, 201],
      [337, 218],
      [302, 218],
    ],
    [
      [177, 241],
      [219, 241],
      [219, 276],
      [177, 276],
    ],
    [
      [239, 239],
      [307, 239],
      [340, 252],
      [340, 279],
      [290, 279],
      [268, 263],
      [239, 263],
    ],
    [
      [55, 141],
      [218, 141],
      [218, 169],
      [55, 169],
    ],
  ];

  const TOOLS = {
    hand: "Bàn tay",
    hoe: "Cuốc đất",
    seed: "Hạt giống",
    water: "Bình tưới",
    rod: "Cần câu",
  };
  app.Content = Object.freeze({
    version: 1,
    defaultPet: "phoenix",
    defaultMap: "ban-mai",
    maps: {
      "ban-mai": {
        id: "ban-mai",
        name: "Thung lũng Ban Mai",
        spawn: { x: 230, y: 170 },
        width: 480,
        height: 320,
        art: "assets/garden-detailed.png",
        plots: PLOTS,
        gathers: GATHERS,
        places: PLACES,
        walkable: polygons,
      },
    },
    characters: {
      farmer: {
        id: "farmer",
        art: "assets/farmer-walk.png",
        frames: farmerFrames,
        frameOrigin: "feet",
        logicalHeight: 27,
        referenceHeight: 290,
      },
      an: {
        id: "an",
        art: "assets/an-gardener.png",
        bounds: [410, 100, 414, 1075],
        logicalHeight: 28,
        name: "An",
      },
    },
    pets: {
      phoenix: {
        id: "phoenix",
        type: "phoenix",
        name: "Phượng Hoàng Nhật Diệm",
        rarity: "Legend",
        atlas: "assets/sprites/phoenix-legend.png",
        forms: {
          1: "assets/sprites/phoenix-1.png",
          2: "assets/sprites/phoenix-2.png",
          3: "assets/sprites/phoenix-legend.png",
        },
        frameWidth: 32,
        frameHeight: 32,
        columns: 4,
        rows: 3,
        origin: [16, 22],
        animations: {
          idle: { row: 0, frames: 4, fps: 4 },
          fly: { row: 1, frames: 4, fps: 8 },
          flare: { row: 2, frames: 4, fps: 8 },
        },
      },
    },
    tools: TOOLS,
  });
  if (typeof module !== "undefined" && module.exports)
    module.exports = app.Content;
})(typeof globalThis !== "undefined" ? globalThis : this);
