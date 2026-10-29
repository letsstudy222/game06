(function (root) {
  "use strict";
  const names = [
    "hand",
    "hoe",
    "seed",
    "water",
    "rod",
    "fruit",
    "wood",
    "home",
    "bag",
    "heart",
    "book",
    "star",
    "gear",
    "exit",
    "save",
    "sun",
    "moon",
    "rain",
    "radish",
    "carrot",
    "pumpkin",
    "fish",
    "audio",
    "expand",
    "leaf",
  ];
  const api = {
    names,
    markup(name) {
      const i = names.indexOf(name === "map" ? "home" : name);
      return `<span aria-hidden="true" class="pixel-icon" style="--icon-index:${Math.max(0, i)}"></span>`;
    },
    upgrade(root = document) {
      for (const svg of root.querySelectorAll(
        "svg:not(.svg-library):not(.svg-library svg)",
      )) {
        if (svg.id === "weather-icon") continue;
        const use = svg.querySelector("use");
        if (!use) continue;
        const name = use.getAttribute("href")?.replace("#i-", "");
        if (names.includes(name)) svg.outerHTML = api.markup(name);
      }
    },
  };
  (root.TinyFarm = root.TinyFarm || {}).PixelIcons = api;
})(window);
