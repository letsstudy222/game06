import { GameState } from "./GameState.mjs";
import { IslandScene } from "./IslandScene.mjs";
import { AssetLoader } from "./AssetLoader.mjs";
import { UIHud } from "./UIHud.mjs";
async function start() {
  const canvas = document.querySelector("#island"),
    state = new GameState(),
    assets = await new AssetLoader(state.island.assetManifest).load(
      (n, total) => {
        document.querySelector("#loading-progress").textContent =
          `Đang tải cảnh vật ${n}/${total}…`;
      },
    );
  const scene = new IslandScene(state.island, assets);
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
    const scale =
      innerWidth < 700
        ? 1
        : Math.max(
            2,
            Math.floor(Math.min(innerWidth / 640, innerHeight / 360)),
          );
    canvas.width = Math.ceil(innerWidth / scale);
    canvas.height = Math.ceil(innerHeight / scale);
    const stage = document.querySelector(".stage");
    stage.style.width = canvas.width + "px";
    stage.style.height = canvas.height + "px";
    stage.style.setProperty("--scale", scale);
    state.camera.resize(canvas.width, canvas.height, state.player);
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
    if (e.code === "KeyH" && !e.repeat) {
      e.preventDefault();
      hud.dialog.open ? hud.closeHelp() : hud.openHelp();
      return;
    }
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
    if (!e.repeat && e.code === "KeyE") state.interact();
  });
  document.addEventListener("keyup", (e) => keys.delete(e.code));
  canvas.addEventListener("pointerdown", focus);
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", () => {
    clear();
    last = 0;
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
  document.querySelector("#loading").hidden = true;
  // Read-only diagnostics; mutations still go through real controls.
  window.IslandGame = {
    snapshot: () => state.snapshot(),
    ready: () => scene.ready(),
    view: () => ({
      width: canvas.width,
      height: canvas.height,
      scale: canvas.getBoundingClientRect().width / canvas.width,
      camera: state.camera.snapshot(),
    }),
  };
}
start().catch((error) => {
  document.querySelector("#loading-progress").textContent =
    error.message + " · Hãy tải lại trang.";
  document.querySelector("#loading").dataset.failed = "true";
});
