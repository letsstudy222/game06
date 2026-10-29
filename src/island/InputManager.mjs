export class InputManager {
  constructor({ state, focus, onMenu, onHelp }) {
    Object.assign(this, { state, focus, onMenu, onHelp });
    this.keys = new Set();
    this.pad = { x: 0, y: 0 };
    this.hoverHeld = false;
    this.hoverLatched = false;
    this.resetters = [];
    document.addEventListener("keydown", (e) => this.keydown(e));
    document.addEventListener("keyup", (e) => this.keys.delete(e.code));
    window.addEventListener("blur", () => this.clear());
    document.addEventListener("visibilitychange", () => this.clear());
  }
  keydown(e) {
    if (e.code === "Escape" && !e.repeat) {
      e.preventDefault();
      this.onMenu();
      return;
    }
    if (
      e.code === "KeyH" &&
      !e.repeat &&
      !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)
    ) {
      e.preventDefault();
      this.onHelp();
      return;
    }
    if (
      this.state.paused ||
      /INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)
    )
      return;
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
        e.code,
      )
    )
      e.preventDefault();
    this.keys.add(e.code);
    if (!e.repeat) {
      if (["KeyJ", "Space"].includes(e.code)) this.action("attack");
      if (e.code === "KeyK") this.action("fire");
      if (e.code === "KeyE") this.action("interact");
    }
  }
  action(name) {
    if (this.state.paused || document.hidden) return false;
    return name === "interact" ? this.state.interact() : this.state.use(name);
  }
  sample() {
    const k = this.keys,
      x =
        Number(k.has("KeyD") || k.has("ArrowRight")) -
        Number(k.has("KeyA") || k.has("ArrowLeft")),
      y =
        Number(k.has("KeyS") || k.has("ArrowDown")) -
        Number(k.has("KeyW") || k.has("ArrowUp"));
    return {
      x: x || y ? x : this.pad.x,
      y: x || y ? y : this.pad.y,
      hover:
        this.hoverHeld ||
        this.hoverLatched ||
        k.has("ShiftLeft") ||
        k.has("ShiftRight"),
    };
  }
  clear() {
    this.keys.clear();
    this.pad = { x: 0, y: 0 };
    this.hoverHeld = false;
    this.hoverLatched = false;
    for (const fn of this.resetters) fn();
  }
}
