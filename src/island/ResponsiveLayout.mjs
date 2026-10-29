export function viewportPlan(width, height, world, zoom = 0) {
  // Integer CSS pixels per art pixel. A viewport may never exceed world bounds.
  const minimum = Math.max(
    1,
    Math.ceil(width / world.width),
    Math.ceil(height / world.height),
  );
  const automatic = Math.max(
    2,
    Math.floor(Math.min(width / 640, height / 360)),
  );
  const scale = Math.max(minimum, zoom || automatic);
  return {
    scale,
    width: Math.ceil(width / scale),
    height: Math.ceil(height / scale),
  };
}
export class ResponsiveLayout {
  constructor(canvas, state, settings, onModeChange = () => {}) {
    Object.assign(this, { canvas, state, settings, onModeChange });
    this.mode = matchMedia("(pointer: coarse)").matches ? "touch" : "keyboard";
    this.fit = this.fit.bind(this);
    window.addEventListener("resize", this.fit);
    window.visualViewport?.addEventListener("resize", this.fit);
    window.visualViewport?.addEventListener("scroll", this.fit);
    settings.subscribe(this.fit);
    document.addEventListener(
      "pointerdown",
      (e) => {
        if (e.pointerType === "touch") this.setMode("touch");
      },
      { capture: true },
    );
    document.addEventListener(
      "keydown",
      (e) => {
        if (/^(Key[WASDJK]|Arrow|Shift|Space)/.test(e.code))
          this.setMode("keyboard");
      },
      { capture: true },
    );
    this.fit();
  }
  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;
    this.onModeChange();
    this.fit();
  }
  fit() {
    const viewport = window.visualViewport,
      width = Math.round(viewport?.width || innerWidth),
      height = Math.round(viewport?.height || innerHeight);
    const root = document.querySelector(".game-frame");
    root.style.width = width + "px";
    root.style.height = height + "px";
    root.style.left = (viewport?.offsetLeft || 0) + "px";
    root.style.top = (viewport?.offsetTop || 0) + "px";
    if (
      this.viewport &&
      (this.viewport.width !== width || this.viewport.height !== height)
    )
      this.onModeChange();
    this.viewport = { width, height };
    const plan = viewportPlan(
      width,
      height,
      this.state.island,
      this.settings.value.zoom,
    );
    this.plan = plan;
    if (
      this.canvas.width !== plan.width ||
      this.canvas.height !== plan.height
    ) {
      this.canvas.width = plan.width;
      this.canvas.height = plan.height;
    }
    this.canvas.style.width = plan.width * plan.scale + "px";
    this.canvas.style.height = plan.height * plan.scale + "px";
    this.state.camera.resize(plan.width, plan.height, this.state.player);
    root.dataset.input = this.mode;
    root.dataset.orientation = height > width ? "portrait" : "landscape";
    const v = this.settings.value;
    root.style.setProperty("--joy-size", v.joystickSize + "px");
    root.style.setProperty("--action-size", v.actionSize + "px");
    root.style.setProperty("--ui-scale", v.uiScale);
    root.style.setProperty("--ui-opacity", v.opacity);
    const safe = document.querySelector("#safe-ui").getBoundingClientRect();
    root.style.setProperty(
      "--action-scale",
      Math.min(
        v.uiScale,
        (safe.width / 2 - 18) / (v.actionSize * 2.35),
        (safe.height - 110) / (v.actionSize * 2.32),
      ),
    );
    root.style.setProperty(
      "--joy-scale",
      Math.min(
        v.uiScale,
        (safe.width / 2 - 18) / v.joystickSize,
        (safe.height - 100) / v.joystickSize,
      ),
    );
    this.placeControls();
  }
  placeControls() {
    const safe = document.querySelector("#safe-ui"),
      bounds = safe.getBoundingClientRect(),
      portrait = bounds.height > bounds.width,
      orientation = portrait ? "portrait" : "landscape";
    for (const [name, selector] of [
      ["joystick", ".touch-pad"],
      ["actions", ".hotbar"],
    ]) {
      const el = document.querySelector(selector);
      if (this.mode !== "touch") {
        el.style.left = "";
        el.style.top = "";
        continue;
      }
      const w = el.offsetWidth,
        h = el.offsetHeight,
        p = this.settings.value.positions[orientation]?.[name] || {
          x: name === "joystick" ? 0 : 1,
          y: 1,
        };
      const limits = this.limits(name, bounds, w, h);
      el.style.left =
        Math.round(limits.left + (limits.right - limits.left) * p.x) + "px";
      el.style.top =
        Math.round(limits.top + (limits.bottom - limits.top) * p.y) + "px";
    }
  }
  limits(name, bounds, w, h) {
    const margin = 10,
      left =
        name === "joystick" ? margin : Math.max(margin, bounds.width / 2 + 8),
      right =
        name === "joystick"
          ? Math.max(margin, bounds.width / 2 - w - 8)
          : Math.max(left, bounds.width - w - margin);
    const top = Math.max(
      72,
      Math.min(bounds.height * 0.56, bounds.height - h - margin),
    );
    return {
      left,
      right,
      top,
      bottom: Math.max(top, bounds.height - h - margin),
    };
  }
  savePosition(name, left, top) {
    const el = document.querySelector(
        name === "joystick" ? ".touch-pad" : ".hotbar",
      ),
      bounds = document.querySelector("#safe-ui").getBoundingClientRect(),
      l = this.limits(name, bounds, el.offsetWidth, el.offsetHeight),
      orientation = bounds.height > bounds.width ? "portrait" : "landscape",
      positions = structuredClone(this.settings.value.positions);
    positions[orientation] ??= {};
    positions[orientation][name] = {
      x: (left - l.left) / Math.max(1, l.right - l.left),
      y: (top - l.top) / Math.max(1, l.bottom - l.top),
    };
    this.settings.update({ positions });
  }
}
