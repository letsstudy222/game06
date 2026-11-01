import { GameState } from "./GameState.mjs";
import { IslandScene } from "./IslandScene.mjs";
import { AssetLoader } from "./AssetLoader.mjs";
import { UIHud } from "./UIHud.mjs";
import { InputManager } from "./InputManager.mjs";
import { MobileJoystick } from "./MobileJoystick.mjs";
import { UISettings } from "./UISettings.mjs";
import { ResponsiveLayout } from "./ResponsiveLayout.mjs";
import { GameMenu } from "./GameMenu.mjs";
let developmentDebug = null;
async function start() {
  if (new URLSearchParams(location.search).get("debug") === "1") {
    const url = new URL("./DevelopmentDebug.mjs", import.meta.url);
    url.search = new URL(import.meta.url).search;
    const module = await import(url.href);
    developmentDebug = module.createDevelopmentDebug({ enabled: true,
      visuals: new URLSearchParams(location.search).get("debugVisuals") === "1",
      canvas: document.getElementById("island") });
    developmentDebug.diagnostics.record("info", "scene", "SCENE_START");
  }
  const canvas = document.getElementById("island"),
    state = new GameState(
      new URLSearchParams(location.search).get("sample") === "1"
        ? "dawn-sample"
        : undefined,
    ),
    assets = await new AssetLoader(state.island.assetManifest).load(
      (n, total) =>
        (document.getElementById("loading-progress").textContent =
          `Đang tải cảnh vật ${n}/${total}…`),
    ),
    scene = new IslandScene(state.island, assets);
  scene.attach(canvas);
  developmentDebug?.diagnostics.record("info", "asset", "ASSETS_READY", { count: assets.images.size });
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
  if (developmentDebug) {
    const url = new URL("./DevelopmentDebug.mjs", import.meta.url);
    url.search = new URL(import.meta.url).search;
    const { runtimeDebugView } = await import(url.href);
    developmentDebug.setProvider(() => runtimeDebugView({ state, scene, input, assets }));
  }
  let last = 0;
  document.addEventListener("visibilitychange", () => {
    last = 0;
  });
  function frame(timestamp) {
    const dt = last ? Math.min((timestamp - last) / 1000, 0.05) : 0;
    last = timestamp;
    if (!document.hidden) {
      const measurement = developmentDebug?.beginFrame(timestamp, dt);
      state.update(dt, input.sample());
      developmentDebug?.afterUpdate(measurement);
      scene.draw(state);
      developmentDebug?.afterRender(measurement);
      hud.update();
      developmentDebug?.endFrame(measurement);
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
      world: {
        width: state.island.width,
        height: state.island.height,
        tileSize: state.island.tilemap.tileSize,
        columns: state.island.tilemap.columns,
        rows: state.island.tilemap.rows,
        drawCalls: scene.ground.drawCount,
      },
    }),
    settings: () => structuredClone(settings.value),
  };
}
start().catch((error) => {
  document.getElementById("loading-progress").textContent =
    error.message + " · Hãy tải lại trang.";
  developmentDebug?.diagnostics.record("error", "scene", "START_FAILED", {}, error);
  document.getElementById("loading").dataset.failed = "true";
});
