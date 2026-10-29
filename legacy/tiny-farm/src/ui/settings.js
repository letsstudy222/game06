(function (root) {
  "use strict";
  const app = (root.TinyFarm = root.TinyFarm || {}),
    KEY = "tiny-farm.settings.v1";
  const defaults = {
    sound: false,
    motion: !matchMedia("(prefers-reduced-motion: reduce)").matches,
    showMinimap: true,
  };
  let value = { ...defaults };
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    for (const k of Object.keys(defaults))
      if (typeof raw[k] === "boolean") value[k] = raw[k];
  } catch {}
  app.Settings = {
    get: (key) => value[key],
    snapshot: () => ({ ...value }),
    set(key, v) {
      if (!(key in defaults)) return;
      value[key] = !!v;
      try {
        localStorage.setItem(KEY, JSON.stringify(value));
      } catch {}
      document.dispatchEvent(
        new CustomEvent("tinyfarm:settings", { detail: { ...value } }),
      );
    },
  };
})(window);
