import { GameState } from "./GameState.mjs";
import { IslandScene } from "./IslandScene.mjs";
import { UIHud } from "./UIHud.mjs";
const canvas = document.querySelector("#island"),
  state = new GameState(),
  scene = new IslandScene(state.island);
scene.attach(canvas);
const keys = new Set();
let latchedHover = false,
  pad = { x: 0, y: 0 },
  last = 0;
const clear = () => {
  keys.clear();
  pad = { x: 0, y: 0 };
  latchedHover = false;
  resetStick();
};
const focus = () => canvas.focus({ preventScroll: true });
function use(name) {
  if (document.hidden || hud.dialog.open) return;
  state.use(name);
}
function pause() {
  state.paused = !state.paused;
  clear();
}
const hud = new UIHud(state, scene, {
  use,
  hover: () => {
    if (!state.paused) latchedHover = !latchedHover;
  },
  pause,
  clear,
  focus,
});
function fit() {
  const roomW = Math.max(240, innerWidth - 26),
    roomH = Math.max(220, innerHeight - 112),
    raw = Math.min(roomW / 480, roomH / 270, 3),
    scale = raw >= 1 ? Math.floor(raw) : raw,
    frame = document.querySelector(".game-frame");
  frame.style.width = 480 * scale + "px";
  frame.style.height = 270 * scale + "px";
  frame.style.setProperty("--scale", scale);
}
window.addEventListener("resize", fit);
fit();
const moves = [
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ShiftLeft",
  "ShiftRight",
];
document.addEventListener("keydown", (e) => {
  if (hud.dialog.open) return;
  if (["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(e.target.tagName))
    return;
  if (
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      e.code,
    )
  )
    e.preventDefault();
  if (e.code === "Escape" && !e.repeat) {
    pause();
    return;
  }
  if (state.paused) return;
  if (moves.includes(e.code)) keys.add(e.code);
  if (!e.repeat && (e.code === "KeyJ" || e.code === "Space")) use("attack");
  if (!e.repeat && e.code === "KeyK") use("fire");
});
document.addEventListener("keyup", (e) => keys.delete(e.code));
canvas.addEventListener("pointerdown", focus);
window.addEventListener("blur", clear);
document.addEventListener("visibilitychange", () => {
  clear();
  last = 0;
});
scene.sprite.addEventListener("error", () => {
  document.querySelector("#load-error").hidden = false;
});
const stick = document.querySelector(".stick-base"),
  knob = stick.querySelector("i");
let pointer = null;
function resetStick() {
  if (typeof knob !== "undefined" && knob)
    knob.style.transform = "translate(0,0)";
}
function setStick(e) {
  const r = stick.getBoundingClientRect(),
    dx = e.clientX - r.left - r.width / 2,
    dy = e.clientY - r.top - r.height / 2,
    n = Math.hypot(dx, dy),
    limit = 27;
  pad =
    n < 4
      ? { x: 0, y: 0 }
      : { x: dx / Math.max(n, limit), y: dy / Math.max(n, limit) };
  knob.style.transform = `translate(${dx / Math.max(1, n / limit)}px,${dy / Math.max(1, n / limit)}px)`;
}
stick.addEventListener("pointerdown", (e) => {
  if (state.paused) return;
  pointer = e.pointerId;
  stick.setPointerCapture(pointer);
  setStick(e);
  focus();
});
stick.addEventListener("pointermove", (e) => {
  if (e.pointerId === pointer) setStick(e);
});
for (const type of ["pointerup", "pointercancel", "lostpointercapture"])
  stick.addEventListener(type, () => {
    pointer = null;
    pad = { x: 0, y: 0 };
    resetStick();
  });
function frame(timestamp) {
  const dt = last ? Math.min((timestamp - last) / 1000, 0.05) : 0;
  last = timestamp;
  if (!document.hidden) {
    const x =
        Number(keys.has("KeyD") || keys.has("ArrowRight")) -
        Number(keys.has("KeyA") || keys.has("ArrowLeft")) +
        pad.x,
      y =
        Number(keys.has("KeyS") || keys.has("ArrowDown")) -
        Number(keys.has("KeyW") || keys.has("ArrowUp")) +
        pad.y;
    state.update(dt, {
      x,
      y,
      hover: latchedHover || keys.has("ShiftLeft") || keys.has("ShiftRight"),
    });
    scene.draw(state);
    hud.update();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
focus();
// Read-only diagnostics; mutations still go through real controls.
window.IslandGame = {
  snapshot: () => state.snapshot(),
  ready: () => scene.ready(),
  view: () => ({
    width: 480,
    height: 270,
    scale: canvas.getBoundingClientRect().width / 480,
    camera: { ...state.camera },
  }),
};
