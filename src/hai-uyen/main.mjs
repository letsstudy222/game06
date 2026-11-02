import { adaptMaps, MAP_FILES } from "./maps.mjs";
import { HaiUyenGame, ROOM_NAMES } from "./model.mjs";
import { SaveStore } from "./save.mjs";
import { HaiUyenView } from "./view.mjs";
async function start() {
  const raw = await Promise.all(
      MAP_FILES.map(async (f) => {
        const r = await fetch(`data/hai-uyen/${f}`);
        if (!r.ok) throw Error(`Không tải được bản đồ ${f}: ${r.status}`);
        return r.json();
      }),
    ),
    maps = adaptMaps(raw);
  let storage;
  try {
    storage = localStorage;
  } catch {
    storage = {
      getItem: () => {
        throw Error("Trình duyệt chặn bộ nhớ");
      },
      setItem: () => {
        throw Error("Trình duyệt chặn bộ nhớ");
      },
    };
  }
  const params = new URLSearchParams(location.search);
  let slot = Number(params.get("slot")) || 1;
  if (![1, 2, 3].includes(slot)) slot = 1;
  let game = new HaiUyenGame(maps, new SaveStore(storage, slot));
  if (params.get("environment") === "land") game.environment = "land";
  const canvas = document.querySelector("#hai-uyen"),
    view = new HaiUyenView(canvas),
    menu = document.querySelector("#menu"),
    keys = new Set(),
    actions = [];
  let stick = { x: 0, y: 0 },
    mouse = null,
    touchAim = null,
    held = false,
    last = 0,
    lastHud = -1,
    interact = false;
  const clear = () => {
    keys.clear();
    actions.length = 0;
    stick = { x: 0, y: 0 };
    held = false;
    mouse = null;
    touchAim = null;
    document.querySelector("#joystick span").style.transform = "";
  };
  const focus = () => canvas.focus({ preventScroll: true });
  const openMenu = () => {
    clear();
    game.paused = true;
    document.querySelector("#slot").value = slot;
    document.querySelector("#environment").value = game.environment;
    if (!menu.open) menu.showModal();
  };
  document.querySelector("#menu-button").addEventListener("click", openMenu);
  menu.addEventListener("close", () => {
    game.paused = false;
    clear();
    last = 0;
    focus();
  });
  menu.addEventListener("cancel", () => {
    game.paused = false;
    clear();
  });
  document.querySelector("#save-button").addEventListener("click", () => {
    game.say(
      game.save()
        ? "Đã ghi tiến trình."
        : "Chưa lưu được; kiểm tra cảnh báo bộ nhớ.",
    );
  });
  document.querySelector("#slot").addEventListener("change", (e) => {
    if (game.inCombat) {
      e.target.value = slot;
      game.say("Không đổi hồ sơ trong giao tranh.");
      return;
    }
    if (!game.store.readOnly && !game.save()) {
      e.target.value = slot;
      return;
    }
    slot = Number(e.target.value);
    const environment = game.environment;
    game = new HaiUyenGame(maps, new SaveStore(storage, slot));
    game.environment = environment;
    game.paused = true;
    clear();
    const url = new URL(location.href);
    url.searchParams.set("slot", slot);
    history.replaceState(null, "", url);
  });
  document.querySelector("#environment").addEventListener("change", (e) => {
    game.environment = e.target.value;
  });
  const actionKeys = {
    Digit1: "k1",
    Digit2: "k2",
    Digit3: "k3",
    Digit4: "k4",
    Space: "guard",
    KeyJ: "basic",
  };
  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      if (!menu.open) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (menu.open || e.target instanceof HTMLSelectElement) return;
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
        e.code,
      )
    )
      e.preventDefault();
    keys.add(e.code);
    if (!e.repeat && actionKeys[e.code]) actions.push(actionKeys[e.code]);
    if (!e.repeat && e.code === "KeyE") interact = true;
  });
  window.addEventListener("keyup", (e) => keys.delete(e.code));
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", () => {
    clear();
    last = 0;
    if (document.hidden) game.save();
  });
  window.addEventListener("pagehide", () => game.save());
  window.addEventListener("resize", () => {
    clear();
    view.resize();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") mouse = { x: e.clientX, y: e.clientY };
    else if (canvas.hasPointerCapture(e.pointerId)) {
      const p = view.screenToWorld(e.clientX, e.clientY);
      touchAim = { x: p.x - game.player.x, y: p.y - game.player.y };
    }
  });
  canvas.addEventListener("pointerdown", (e) => {
    focus();
    if (e.pointerType === "mouse") {
      mouse = { x: e.clientX, y: e.clientY };
      if (e.button === 0) held = true;
    } else {
      canvas.setPointerCapture(e.pointerId);
      const p = view.screenToWorld(e.clientX, e.clientY);
      touchAim = { x: p.x - game.player.x, y: p.y - game.player.y };
    }
  });
  canvas.addEventListener("pointerup", () => {
    held = false;
  });
  canvas.addEventListener("pointercancel", () => {
    held = false;
    touchAim = null;
  });
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("pointerup", () => {
    held = false;
  });
  for (const b of document.querySelectorAll("[data-action]"))
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      actions.push(b.dataset.action);
      focus();
    });
  document.querySelector("#interact").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    interact = true;
    focus();
  });
  const joystick = document.querySelector("#joystick");
  let stickId = null;
  const updateStick = (e) => {
    const r = joystick.getBoundingClientRect(),
      dx = e.clientX - r.left - r.width / 2,
      dy = e.clientY - r.top - r.height / 2,
      d = Math.hypot(dx, dy),
      s = Math.min(1, d / 34);
    stick = d < 7 ? { x: 0, y: 0 } : { x: (dx / d) * s, y: (dy / d) * s };
    mouse = null;
    touchAim = null;
    document.querySelector("#joystick span").style.transform =
      `translate(${stick.x * 30}px,${stick.y * 30}px)`;
  };
  joystick.addEventListener("pointerdown", (e) => {
    if (stickId !== null) return;
    e.preventDefault();
    stickId = e.pointerId;
    joystick.setPointerCapture(stickId);
    updateStick(e);
    focus();
  });
  joystick.addEventListener("pointermove", (e) => {
    if (e.pointerId === stickId) updateStick(e);
  });
  const release = (e) => {
    if (e.pointerId === stickId) {
      stickId = null;
      stick = { x: 0, y: 0 };
      document.querySelector("#joystick span").style.transform = "";
    }
  };
  joystick.addEventListener("pointerup", release);
  joystick.addEventListener("pointercancel", release);
  joystick.addEventListener("lostpointercapture", release);
  function hud() {
    const s = game.snapshot(),
      hp = document.querySelector("#hp");
    hp.setAttribute("aria-valuenow", Math.round(s.player.hp));
    hp.querySelector("i").style.width = `${s.player.hp}%`;
    hp.querySelector("span").textContent = `${Math.ceil(s.player.hp)} / 100`;
    document.querySelector("#room-name").textContent = ROOM_NAMES[s.room];
    document.querySelector("#room-code").textContent =
      `${s.room} · Hồ sơ ${slot} · ${s.tokens} lưu ký`;
    document.querySelector("#objective").textContent = game.objective();
    document.querySelector("#buff").textContent = s.guard
      ? "Thủ Mai · Chặn đúng nhịp để nhận Hồi Thủy"
      : s.empowered
        ? "Hồi Thủy · Cường hóa kỹ năng kế tiếp"
        : s.buff
          ? "Thủy Mạch · Mai dẫn lưu đang sáng"
          : "Trầm Hải Chi Thể · phòng ngự cơ bản";
    for (const b of document.querySelectorAll("[data-action]")) {
      const key = b.dataset.action,
        cd = s.cooldowns[key];
      b.classList.toggle("cooling", cd > 0.05);
      b.classList.toggle(
        "active",
        (key === "k3" && s.buff) || (key === "guard" && s.guard),
      );
      b.querySelector("i").textContent = cd > 0 ? cd.toFixed(1) : "";
      b.setAttribute(
        "aria-description",
        cd > 0 ? `Hồi chiêu ${cd.toFixed(1)} giây` : "Sẵn sàng",
      );
    }
    const notice = document.querySelector("#notice");
    notice.textContent = game.message;
    notice.style.opacity = game.time < game.messageUntil ? "1" : "0";
    const warn = document.querySelector("#save-warning");
    warn.hidden = !game.saveWarning;
    warn.textContent = game.saveWarning;
    const boss = game.enemies.find((e) => e.boss && e.hp > 0),
      bossHud = document.querySelector("#boss-hud");
    bossHud.hidden = !boss || !game.encounter;
    if (boss) {
      bossHud.querySelector("i").style.width =
        `${(boss.hp / boss.maxHp) * 100}%`;
      document.querySelector("#boss-state").textContent =
        `P${boss.phase} · ${boss.state === "windup" ? "Chuẩn bị " + ({ sweep: "quét càng", charge: "lao thẳng", ring: "vòng áp" }[boss.kind] || "đòn đánh") : boss.state === "recover" ? "Khoảng phản công" : boss.state === "strike" ? "Đòn đang ra" : "Giữ khoảng cách"}`;
    }
    view.minimap(document.querySelector("#minimap"), game);
  }
  function frame(t) {
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
    last = t;
    if (!document.hidden) {
      let x =
          stick.x +
          (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) -
          (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0),
        y =
          stick.y +
          (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0) -
          (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0);
      const aim = mouse
        ? view.screenToWorld(mouse.x, mouse.y)
        : touchAim
          ? { x: game.player.x + touchAim.x, y: game.player.y + touchAim.y }
          : null;
      game.aim = aim;
      if (held || keys.has("KeyJ")) actions.push("basic");
      game.update(dt, {
        x,
        y,
        aim,
        actions: [...new Set(actions.splice(0))],
        interact,
      });
      interact = false;
      view.draw(game);
      if (t - lastHud > 80) {
        hud();
        lastHud = t;
      }
    }
    requestAnimationFrame(frame);
  }
  document.querySelector("#loading").hidden = true;
  focus();
  hud();
  requestAnimationFrame(frame);
  window.HaiUyen = {
    ready: () => view.ready,
    snapshot: () => game.snapshot(),
    view: () => ({
      camera: { ...view.camera },
      width: canvas.width,
      height: canvas.height,
      scale: view.scale,
      drawCalls: view.drawCalls,
      slot,
    }),
    maps: () => structuredClone(maps),
  };
}
start().catch((e) => {
  const el = document.querySelector("#loading");
  el.hidden = false;
  el.textContent = `Không khởi động được: ${e.message}. Tải lại trang để thử lại.`;
  console.error(e);
});
