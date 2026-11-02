import { DevelopmentDiagnostics, FrameProfiler } from './DevelopmentDiagnostics.mjs';
import { worldToScreen } from './RenderPrimitives.mjs';
const owners = new WeakMap();
const finite = (...values) => values.every(Number.isFinite);
/** Chỉ vẽ trên Canvas debug riêng. Không suy collider từ sprite rect. */
export function drawDebugGeometry(ctx, view, width, height) {
  if (!view?.camera || !finite(view.camera.x, view.camera.y, width, height) || width <= 0 || height <= 0) return;
  ctx.save();
  try {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, width, height); ctx.imageSmoothingEnabled = false;
    const camera = view.camera, size = view.tileSize;
    if (Number.isFinite(size) && size >= 1) {
      ctx.strokeStyle = '#ffffff40'; ctx.beginPath();
      for (let x = -Math.round(camera.x) % size, count = 0; x < width && count < 200; x += size, count++) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
      for (let y = -Math.round(camera.y) % size, count = 0; y < height && count < 200; y += size, count++) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
      ctx.stroke();
    }
    if (view.actor && finite(view.actor.x, view.actor.y, view.actor.radius) && view.actor.radius >= 0) {
      const p = worldToScreen(view.actor, camera); ctx.strokeStyle = '#ffff66'; ctx.beginPath(); ctx.arc(p.x, p.y, view.actor.radius, 0, Math.PI * 2); ctx.moveTo(p.x - 4, p.y); ctx.lineTo(p.x + 4, p.y); ctx.moveTo(p.x, p.y - 4); ctx.lineTo(p.x, p.y + 4); ctx.stroke();
    }
    ctx.strokeStyle = '#66ffff'; ctx.strokeRect(0.5, 0.5, Math.max(0, width - 1), Math.max(0, height - 1));
  } finally { ctx.restore(); }
}
/** Metrics provider của legacy Dawn, không giả new input/save/current đã tích hợp. */
export function runtimeDebugView({ state, scene, input, assets }) {
  const move = input.sample(), camera = state.camera.snapshot(), tileSize = state.island.tilemap.tileSize;
  return { sceneId: state.island.id, camera, actor: { x: state.player.x, y: state.player.y, radius: state.player.radius },
    tileSize, tile: { x: Math.floor(state.player.x / tileSize), y: Math.floor(state.player.y / tileSize) },
    movement: { x: move.x, y: move.y }, aim: null, inputContext: state.paused ? 'pause' : 'legacy-gameplay',
    current: null, save: 'NOT_INTEGRATED', assetCount: assets.images.size, actorCount: 1, tileDraws: scene.ground.drawCount };
}
export function createDevelopmentDebug({ enabled = false, visuals = false, canvas, documentTarget = globalThis.document, windowTarget = globalThis.window, clock = () => performance.now() } = {}) {
  if (!enabled) return null;
  if (!documentTarget?.body || !windowTarget || !canvas) throw Error('DEBUG_ENV_REQUIRED');
  if (owners.has(documentTarget)) { const owner = owners.get(documentTarget); owner.diagnostics.record('warning', 'system', 'DEBUG_ALREADY_ACTIVE'); return owner; }
  const diagnostics = new DevelopmentDiagnostics({ enabled: true, clock }), profiler = new FrameProfiler();
  const panel = documentTarget.createElement('pre'); panel.id = 'development-debug'; panel.setAttribute('aria-hidden', 'true'); panel.inert = true;
  Object.assign(panel.style, { position: 'fixed', left: '8px', top: '8px', zIndex: '99999', margin: '0', padding: '8px', boxSizing: 'border-box', maxWidth: 'calc(100vw - 16px)', maxHeight: '42vh', overflow: 'hidden', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: '#ffffff', background: '#102832ed', font: '11px monospace', pointerEvents: 'none' });
  documentTarget.body.append(panel);
  const overlay = visuals ? documentTarget.createElement('canvas') : null;
  if (overlay) { overlay.id = 'development-geometry'; overlay.setAttribute('aria-hidden', 'true'); overlay.inert = true; Object.assign(overlay.style, { position: 'fixed', zIndex: '99998', pointerEvents: 'none', imageRendering: 'pixelated' }); documentTarget.body.append(overlay); }
  let disposed = false, provider = null, lastPanel = -Infinity, lastTimestamp = null, latestView = null;
  const listeners = [];
  const on = (type, listener) => { windowTarget.addEventListener(type, listener); listeners.push(() => windowTarget.removeEventListener(type, listener)); };
  on('error', event => diagnostics.record('error', 'system', 'WINDOW_ERROR', {}, event.error));
  on('unhandledrejection', event => diagnostics.record('error', 'system', 'UNHANDLED_REJECTION', {}, event.reason));
  const controller = {
    diagnostics, profiler,
    setProvider(value) { provider = value; },
    beginFrame(timestamp, gameDelta) { if (disposed) return null; return { timestamp, gameDelta, start: clock() }; },
    afterUpdate(frame) { if (frame) frame.afterUpdate = clock(); },
    afterRender(frame) { if (frame) frame.afterRender = clock(); },
    endFrame(frame) {
      if (!frame || disposed) return;
      const afterHud = clock(), debugStart = afterHud;
      try {
        if (provider && (visuals || frame.timestamp - lastPanel >= 250)) latestView = provider();
        if (overlay && latestView) {
          const rect = canvas.getBoundingClientRect();
          if (overlay.width !== canvas.width) overlay.width = canvas.width;
          if (overlay.height !== canvas.height) overlay.height = canvas.height;
          Object.assign(overlay.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
          drawDebugGeometry(overlay.getContext('2d'), latestView, overlay.width, overlay.height);
        }
        if (frame.timestamp - lastPanel >= 250) {
          const metrics = profiler.snapshot(); lastPanel = frame.timestamp;
          const lines = ['DEBUG — chỉ đọc', `FPS ước tính: ${metrics.fpsEstimate?.toFixed(1) ?? 'chưa có mẫu'}`, `Delta game: ${(frame.gameDelta * 1000).toFixed(2)} ms`];
          if (latestView) lines.push(`Scene: ${latestView.sceneId}`, `Camera: ${latestView.camera.x}, ${latestView.camera.y}`, `Actor: ${latestView.actor.x.toFixed(1)}, ${latestView.actor.y.toFixed(1)}`, `Tile: ${latestView.tile.x}, ${latestView.tile.y}`, `Move thô: ${latestView.movement.x}, ${latestView.movement.y}`, 'Aim/current: chưa tích hợp', `Input: ${latestView.inputContext}`, `Assets: ${latestView.assetCount}; actor: ${latestView.actorCount}; tile draws: ${latestView.tileDraws}`, 'Save: chưa tích hợp');
          for (const warning of diagnostics.snapshot().records.filter(r => r.severity !== 'info').slice(-3)) lines.push(`${warning.severity}/${warning.category}: ${warning.code}`);
          panel.textContent = lines.join('\n');
        }
      } catch (error) { diagnostics.record('error', 'renderer', 'DEBUG_RENDER_FAILED', {}, error); }
      const end = clock();
      profiler.record({ deltaMs: lastTimestamp === null ? frame.gameDelta * 1000 : Math.max(0, frame.timestamp - lastTimestamp), updateMs: frame.afterUpdate - frame.start, renderMs: frame.afterRender - frame.afterUpdate, hudMs: afterHud - frame.afterRender, debugMs: end - debugStart });
      lastTimestamp = frame.timestamp;
    },
    snapshot() { return { enabled: !disposed, visuals, metrics: profiler.snapshot(), view: latestView ? structuredClone(latestView) : null, diagnostics: diagnostics.snapshot() }; },
    dispose() { if (disposed) return; disposed = true; listeners.forEach(remove => remove()); panel.remove(); overlay?.remove(); diagnostics.enabled = false; owners.delete(documentTarget); if (windowTarget.IslandDebug === publicView) delete windowTarget.IslandDebug; },
  };
  const publicView = Object.freeze({ snapshot: () => controller.snapshot(), dispose: () => controller.dispose() });
  owners.set(documentTarget, controller); windowTarget.IslandDebug = publicView;
  diagnostics.record('info', 'system', 'DEBUG_ENABLED');
  return controller;
}
