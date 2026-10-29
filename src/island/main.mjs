import { GameState } from "./GameState.mjs";
import { IslandScene } from "./IslandScene.mjs";
import { AssetLoader } from "./AssetLoader.mjs";
import { UIHud } from "./UIHud.mjs";
import { InputManager } from "./InputManager.mjs";
import { MobileJoystick } from "./MobileJoystick.mjs";
import { UISettings } from "./UISettings.mjs";
import { ResponsiveLayout } from "./ResponsiveLayout.mjs";
import { GameMenu } from "./GameMenu.mjs";
async function start() {
  const canvas = document.getElementById("island"),
    state = new GameState(),
    assets = await new AssetLoader(state.island.assetManifest).load(
      (n, total) =>
        (document.getElementById("loading-progress").textContent =
          `Đang tải cảnh vật ${n}/${total}…`),
    ),
    scene = new IslandScene(state.island, assets);
  scene.attach(canvas);
  const settings = new UISettings(),
    focus = () => canvas.focus({ preventScroll: true });
  let menu;
  const input = new InputManager({
    state,
    focus,
    onMenu: () => menu.toggle(),
    onHelp: () => menu.openHelp(),
  });
  const joystick = new MobileJoystick(
    document.querySelector(".stick-base"),
    input,
  );
  const layout = new ResponsiveLayout(canvas, state, settings, () => {
    input.clear();
    menu?.sync();
  });
  menu = new GameMenu(state, input, settings, layout);
  const hud = new UIHud(state, scene, input);
  canvas.addEventListener("pointerdown", focus);
  let last = 0;
  document.addEventListener("visibilitychange", () => {
    last = 0;
  });
  function frame(timestamp) {
    const dt = last ? Math.min((timestamp - last) / 1000, 0.05) : 0;
    last = timestamp;
    if (!document.hidden) {
      state.update(dt, input.sample());
      scene.draw(state);
      hud.update();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  focus();
  document.getElementById("loading").hidden = true;
  window.IslandGame = {
    snapshot: () => state.snapshot(),
    ready: () => scene.ready(),
    view: () => ({
      width: canvas.width,
      height: canvas.height,
      scale: layout.plan.scale,
      camera: state.camera.snapshot(),
      input: layout.mode,
    }),
    settings: () => structuredClone(settings.value),
  };
}
start().catch((error) => {
  document.getElementById("loading-progress").textContent =
    error.message + " · Hãy tải lại trang.";
  document.getElementById("loading").dataset.failed = "true";
});
