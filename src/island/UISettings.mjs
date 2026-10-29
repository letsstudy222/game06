export const SETTINGS_KEY = "nhat-diem.ui.v1";
export const DEFAULTS = Object.freeze({
  joystickSize: 112,
  actionSize: 64,
  opacity: 0.8,
  uiScale: 1,
  zoom: 0,
  positions: {},
});
const ranges = {
  joystickSize: [88, 144],
  actionSize: [52, 80],
  opacity: [0.45, 1],
  uiScale: [0.8, 1.2],
  zoom: [0, 4],
};
export function sanitizeSettings(raw = {}) {
  if (!raw || typeof raw !== "object") raw = {};
  const result = { ...DEFAULTS, positions: {} };
  for (const [key, [min, max]] of Object.entries(ranges))
    if (typeof raw[key] === "number" && Number.isFinite(raw[key]))
      result[key] = Math.min(max, Math.max(min, raw[key]));
  result.zoom = Math.round(result.zoom);
  for (const orientation of ["portrait", "landscape"])
    for (const name of ["joystick", "actions"]) {
      const p = raw.positions?.[orientation]?.[name];
      if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
        result.positions[orientation] ??= {};
        result.positions[orientation][name] = {
          x: Math.max(0, Math.min(1, p.x)),
          y: Math.max(0, Math.min(1, p.y)),
        };
      }
    }
  return result;
}
export class UISettings {
  constructor(storage) {
    this.listeners = new Set();
    this.saved = true;
    try {
      this.storage = storage || window.localStorage;
      this.value = sanitizeSettings(
        JSON.parse(this.storage.getItem(SETTINGS_KEY) || "{}"),
      );
    } catch {
      this.value = sanitizeSettings();
      this.saved = false;
    }
  }
  update(patch) {
    this.value = sanitizeSettings({ ...this.value, ...patch });
    try {
      this.storage.setItem(SETTINGS_KEY, JSON.stringify(this.value));
      this.saved = true;
    } catch {
      this.saved = false;
    }
    for (const fn of this.listeners) fn(this.value);
  }
  reset() {
    this.update({ ...DEFAULTS, positions: {} });
  }
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
