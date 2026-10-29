(function () {
  "use strict";
  const { World, CROPS, ITEMS, PRICES, QUESTS, KEY } = FarmRules;
  const farmerArt = new Image();
  farmerArt.src = "assets/farmer-walk.png?v=3";
  const anArt = new Image();
  anArt.src = "assets/an-gardener.png?v=3";
  // Measured alpha bounds, not an assumed grid: generated sheets have uneven gutters.
  const farmerFrames = [
    [
      [138, 26, 195, 287],
      [404, 23, 189, 284],
      [663, 26, 192, 285],
      [925, 24, 191, 282],
    ],
    [
      [150, 326, 182, 284],
      [406, 327, 185, 282],
      [674, 328, 181, 281],
      [935, 326, 178, 283],
    ],
    [
      [130, 633, 187, 277],
      [391, 629, 183, 283],
      [662, 632, 186, 280],
      [927, 631, 182, 281],
    ],
    [
      [153, 924, 165, 291],
      [415, 925, 164, 286],
      [676, 926, 166, 289],
      [938, 929, 165, 284],
    ],
  ];
  const $ = (s) => document.querySelector(s);
  const modal = $("#modal");
  let world,
    storageOK = true,
    badSave = false;
  try {
    world = World.load(localStorage);
  } catch (error) {
    world = new World();
    if (["SecurityError", "NotAllowedError"].includes(error.name))
      storageOK = false;
    else badSave = true;
  }
  const s = world.s;
  let replacingSave = false;
  let booted = false,
    tool = "hand",
    route = [],
    pending = null,
    hovered = null,
    selectedPlot = -1;
  let moving = false,
    stepTime = 0,
    actionTime = 0,
    actionKind = "",
    dirty = true,
    hudTime = 0,
    autosave = 0;
  let transitioning = false,
    fishing = null,
    lastBiteFrame = 0,
    lastMelody = 0;
  const keys = new Set(),
    reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOOLS = {
    hand: "Bàn tay",
    hoe: "Cuốc đất",
    seed: "Gieo hạt",
    water: "Bình tưới",
    rod: "Cần câu",
  };
  const PLOTS = Array.from({ length: 12 }, (_, i) => ({
    x: 83 + (i % 4) * 27,
    y: 177 + Math.floor(i / 4) * 20,
  }));
  const GATHERS = [
    { x: 278, y: 123 },
    { x: 364, y: 124 },
    { x: 190, y: 260 },
    { x: 277, y: 250 },
    { x: 303, y: 265 },
    { x: 70, y: 149 },
  ];
  const PLACES = [
    {
      id: "home",
      x: 157,
      y: 109,
      name: "Mái nhà của bạn",
      icon: "home",
      approach: { x: 157, y: 126 },
    },
    {
      id: "shop",
      x: 251,
      y: 130,
      name: "Quầy nông sản",
      icon: "bag",
      approach: { x: 250, y: 142 },
    },
    {
      id: "an",
      x: 274,
      y: 142,
      name: "An · Người hàng xóm",
      icon: "heart",
      approach: { x: 270, y: 150 },
    },
    {
      id: "pond",
      x: 325,
      y: 209,
      name: "Bến câu cá",
      icon: "fish",
      approach: { x: 316, y: 213 },
    },
    {
      id: "shrine",
      x: 329,
      y: 267,
      name: "Đài Bình Minh",
      icon: "star",
      approach: { x: 321, y: 266 },
    },
  ];
  const polygons = [
    [
      [215, 45],
      [244, 45],
      [244, 310],
      [215, 310],
    ],
    [
      [51, 127],
      [330, 127],
      [330, 151],
      [51, 151],
    ],
    [
      [145, 103],
      [165, 103],
      [165, 139],
      [145, 139],
    ],
    [
      [68, 164],
      [206, 164],
      [206, 239],
      [68, 239],
    ],
    [
      [201, 145],
      [245, 145],
      [245, 275],
      [201, 275],
    ],
    [
      [242, 142],
      [309, 142],
      [309, 242],
      [242, 242],
    ],
    [
      [245, 115],
      [391, 115],
      [391, 138],
      [245, 138],
    ],
    [
      [302, 201],
      [337, 201],
      [337, 218],
      [302, 218],
    ],
    [
      [177, 241],
      [219, 241],
      [219, 276],
      [177, 276],
    ],
    [
      [239, 239],
      [307, 239],
      [340, 252],
      [340, 279],
      [290, 279],
      [268, 263],
      [239, 263],
    ],
    [
      [55, 141],
      [218, 141],
      [218, 169],
      [55, 169],
    ],
  ];
  function inside(x, y, p) {
    let hit = false;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const [a, b] = p[i],
        [c, d] = p[j];
      if (b > y !== d > y && x < ((c - a) * (y - b)) / (d - b) + a) hit = !hit;
    }
    return hit;
  }
  function walkable(x, y) {
    return polygons.some((p) => inside(x, y, p));
  }
  if (!walkable(s.player.x, s.player.y))
    Object.assign(s.player, { x: 230, y: 170 });
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const GRID = 5,
    COLS = 96,
    ROWS = 64;
  const cells = Array.from({ length: COLS * ROWS }, (_, i) =>
    walkable((i % COLS) * GRID + 2.5, Math.floor(i / COLS) * GRID + 2.5),
  );
  function cellAt(x, y) {
    return Math.floor(y / GRID) * COLS + Math.floor(x / GRID);
  }
  function pointAt(i) {
    return { x: (i % COLS) * GRID + 2.5, y: Math.floor(i / COLS) * GRID + 2.5 };
  }
  function nearestCell(point) {
    let best = -1,
      distance = Infinity;
    for (let i = 0; i < cells.length; i++)
      if (cells[i]) {
        const d = dist(point, pointAt(i));
        if (d < distance) {
          distance = d;
          best = i;
        }
      }
    return best;
  }
  function edgeClear(a, b) {
    const p = pointAt(a),
      q = pointAt(b);
    for (let i = 1; i < 5; i++)
      if (!walkable(p.x + ((q.x - p.x) * i) / 5, p.y + ((q.y - p.y) * i) / 5))
        return false;
    return true;
  }
  function pathTo(point) {
    const from = nearestCell(s.player),
      end = nearestCell(point);
    if (from === end) return [pointAt(end)];
    const queue = [from],
      visited = new Set([from]),
      parent = new Map();
    let n = 0;
    while (n < queue.length) {
      const at = queue[n++];
      if (at === end) break;
      for (const next of [
        at - COLS,
        at + COLS,
        ...(at % COLS ? [at - 1] : []),
        ...(at % COLS < COLS - 1 ? [at + 1] : []),
      ]) {
        if (
          next < 0 ||
          next >= cells.length ||
          !cells[next] ||
          visited.has(next) ||
          !edgeClear(at, next)
        )
          continue;
        visited.add(next);
        parent.set(next, at);
        queue.push(next);
      }
    }
    if (!visited.has(end)) return [];
    const result = [];
    let p = end;
    while (p !== from) {
      result.push(pointAt(p));
      p = parent.get(p);
    }
    return result.reverse();
  }
  function notify(text) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = text;
    const root = $("#toasts");
    root.append(el);
    while (root.children.length > 2) root.firstElementChild.remove();
    setTimeout(() => {
      el.classList.add("fading");
      setTimeout(() => el.remove(), 350);
    }, 5200);
  }
  function save(announce = false) {
    if (replacingSave) return;
    try {
      world.save(localStorage);
      storageOK = true;
      $("#save-status").textContent = "Đã lưu tại máy";
      if (announce) notify("Đã lưu khu vườn trên trình duyệt này.");
    } catch {
      storageOK = false;
      $("#save-status").textContent = "Chưa lưu được";
      if (announce)
        notify(
          "Trình duyệt đang chặn lưu trữ. Hãy xuất bản lưu trong Hướng dẫn.",
        );
    }
  }
  function finish(message, f = 660) {
    dirty = true;
    save();
    notify(message);
    tone(f);
    actionTime = 0.45;
  }
  function switchTab(name) {
    for (const b of document.querySelectorAll("[data-tab]")) {
      const on = b.dataset.tab === name;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      $("#panel-" + b.dataset.tab).hidden = !on;
    }
    dirty = true;
    updateUI();
  }
  function selectTool(name) {
    if (!TOOLS[name]) return;
    tool = name;
    for (const b of document.querySelectorAll("[data-tool]")) {
      const on = b.dataset.tool === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    }
    $("#tool-name").textContent = TOOLS[name];
    actionKind = name;
    tone(350);
  }
  function icon(name, color = "#81905d") {
    if (["radish", "carrot", "pumpkin", "fruit", "wood"].includes(name)) {
      const art = {
        radish:
          '<path fill="#e89ba5" d="M7 10q10-6 11 2t-7 9L6 15Z"/><path stroke="#739253" d="M11 10V3m0 4L6 3m5 4 6-5"/>',
        carrot:
          '<path fill="#e9a059" d="m7 9 11 2-8 11Z"/><path stroke="#719250" d="m12 9-3-7m4 7 5-7m-6 5 7-2"/><path stroke="#b77941" d="m8 13 5 1m-4 3 3 1"/>',
        pumpkin:
          '<path fill="#df9349" d="M12 7C1 1 0 22 12 21 24 22 23 1 12 7"/><path stroke="#b7763e" d="M12 7c-6 1-6 13 0 14m0-14c6 1 6 13 0 14"/><path stroke="#7a9153" d="m12 7 1-5 4 1"/>',
        fruit:
          '<path fill="#ce7157" d="M12 8C0 0 1 23 12 21 23 23 24 0 12 8"/><path stroke="#6a8c4b" d="M12 8V2c5-1 7 1 7 1l-6 3"/>',
        wood: '<path fill="#b08a55" d="m4 9 13-5 5 11-13 6Z"/><ellipse fill="#d1af72" stroke="#80623f" cx="7" cy="15" rx="5" ry="6"/><ellipse fill="none" stroke="#a17e4d" cx="7" cy="15" rx="2" ry="3"/><path stroke="#765b39" d="m10 9 8-3m-6 7 7-3"/>',
      };
      return `<svg viewBox="0 0 24 24" style="color:${color};stroke-width:1.5">${art[name]}</svg>`;
    }
    return `<svg style="color:${color}"><use href="#i-${name}"/></svg>`;
  }
  function updateHUD() {
    $("#coins").textContent = Math.floor(s.coins).toLocaleString("vi-VN");
    $("#energy").textContent = `${s.energy} / 100`;
    $("#energy-fill").style.width = s.energy + "%";
    $("#energy-fill").style.background = s.energy < 20 ? "#d49370" : "";
    const minute = Math.floor(s.minute / 10) * 10;
    $("#clock").textContent =
      `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
    $("#calendar").textContent = `${world.season} · Ngày ${world.seasonDay}`;
    $("#weather-label").textContent =
      world.weather === "rain"
        ? "Mưa nhẹ"
        : s.minute >= 1140
          ? "Đêm dịu"
          : "Trời trong";
    $("#weather-icon use").setAttribute(
      "href",
      world.weather === "rain"
        ? "#i-rain"
        : s.minute >= 1140
          ? "#i-moon"
          : "#i-sun",
    );
    $("#seed-count").textContent = s.seeds[s.chosenSeed] + " hạt";
    $("#friendship").textContent = `An · ${s.stats.friendship} điểm thân thiết`;
    $("#pet-note").textContent =
      s.petDay === s.day
        ? "Nhật Diệm đang nghỉ. Phép sương hồi lại ngày mai."
        : "Phép sương đang sẵn sàng.";
    const near = nearestTarget();
    $("#context-hint").textContent = paused
      ? "Đang tạm dừng · bấm tiếp tục để chơi"
      : near && dist(s.player, near.approach || near) < 22
        ? `E · ${near.label || near.name}`
        : "Chạm để đi · Chạm vật để tương tác";
  }
  function updateUI() {
    if (!dirty) return;
    dirty = false;
    updateHUD();
    $("#quests").innerHTML = QUESTS.map((q, i) => {
      const n = Math.min(q.goal, q.progress(s)),
        claimed = s.claims.includes(q.id),
        ready = n >= q.goal && !claimed;
      return `<article class="quest ${claimed ? "claimed" : ""}"><div class="quest-top"><span class="quest-title">${q.title}</span><span class="quest-n">0${i + 1}</span></div><p>${q.text}</p><div class="quest-bottom"><div class="quest-progress"><i style="width:${(n / q.goal) * 100}%"></i></div><span>${n}/${q.goal}</span>${ready ? `<button class="claim-button" data-claim="${q.id}">Nhận ${q.reward} G</button>` : `<span>${claimed ? "Đã nhận" : q.reward + " G"}</span>`}</div></article>`;
    }).join("");
    $("#inventory").innerHTML =
      '<div class="inventory-title">THU HOẠCH & VẬT LIỆU</div><div class="inventory-grid">' +
      Object.entries(ITEMS)
        .map(
          ([k, name]) =>
            `<div class="inventory-slot">${icon(k === "fish" ? "fish" : k)}<b>${s.bag[k]}</b><span>${name}</span></div>`,
        )
        .join("") +
      '</div><div class="inventory-title">HẠT GIỐNG</div><div class="inventory-grid">' +
      Object.entries(CROPS)
        .map(
          ([k, c]) =>
            `<div class="inventory-slot">${icon(k)}<b>${s.seeds[k]}</b><span>${c.name}</span></div>`,
        )
        .join("") +
      "</div>";
    $("#seed-choice").value = s.chosenSeed;
    $("#daily-tip").textContent =
      world.weather === "rain"
        ? "Hôm nay trời mưa: cây được tưới tự nhiên. Một ngày đẹp để câu cá, nhặt gỗ hoặc ghé thăm hàng xóm."
        : s.stats.harvested === 0
          ? "Cuốc đất → gieo hạt → tưới nước. Củ cải lớn sau 1 đêm đủ nước. Về nhà ngủ để sang ngày mới."
          : "Bán nông sản ở quầy của An. Giữ lại 8 gỗ và dành 350 vàng để thắp sáng Đài Bình Minh.";
  }
  function openDialog(title, html, kicker = "THUNG LŨNG BAN MAI") {
    route = [];
    pending = null;
    keys.clear();
    moving = false;
    if (modal.open) modal.close();
    $("#modal-title").textContent = title;
    $("#modal-eyebrow").textContent = kicker;
    $("#modal-body").innerHTML = html;
    modal.showModal();
  }
  function closeDialog() {
    if (fishing) cancelFishing();
    modal.close();
    keys.clear();
    canvas.focus({ preventScroll: true });
  }
  function shop() {
    openDialog(
      "Quầy của An",
      `<div class="shop-balance"><span>MỘT MÙA MÀNG MỚI</span><strong id="shop-coins">${s.coins} G</strong></div>${Object.entries(
        CROPS,
      )
        .map(
          ([k, c]) =>
            `<div class="shop-row">${icon(k)}<div><strong>Hạt ${c.name.toLowerCase()}</strong><small>${c.days} đêm đủ nước · bán ${c.price} G<br>Đang có <span data-seed-stock="${k}">${s.seeds[k]}</span> hạt</small></div><button data-buy="${k}">${c.seed} G · Mua</button></div>`,
        )
        .join(
          "",
        )}<div class="shop-row">${icon("water", "#7f9a99")}<div><strong>Bình tưới đồng</strong><small>Tốn ít thể lực hơn khi tưới cây.</small></div><button data-upgrade ${s.upgraded ? "disabled" : ""}>${s.upgraded ? "Đã nâng cấp" : "180 G"}</button></div><p class="shop-notice" id="shop-notice">An: Chọn hạt giống nào cho hôm nay?</p><button class="wide-button" data-sell-all>Bán nông sản · ${sellValue()} G</button><p class="small-note">Bán toàn bộ rau, cá và táo. Gỗ luôn được giữ lại.</p>`,
      "QUẦY NÔNG SẢN · MỞ CỬA MỖI NGÀY",
    );
  }
  function sellValue() {
    return ["radish", "carrot", "pumpkin", "fish", "fruit"].reduce(
      (n, k) => n + s.bag[k] * PRICES[k],
      0,
    );
  }
  function refreshShop(message) {
    $("#shop-coins").textContent = s.coins + " G";
    $("#shop-notice").textContent = message;
    for (const el of document.querySelectorAll("[data-seed-stock]"))
      el.textContent = s.seeds[el.dataset.seedStock];
    const sell = $("[data-sell-all]");
    if (sell) sell.textContent = `Bán nông sản · ${sellValue()} G`;
    const u = $("[data-upgrade]");
    if (u && s.upgraded) {
      u.disabled = true;
      u.textContent = "Đã nâng cấp";
    }
  }
  function home() {
    openDialog(
      "Chốn để trở về",
      `<div class="home-art" role="img" aria-label="Căn nhà gỗ ấm áp với chiếc giường và cửa sổ"><span></span></div><p>Một tách trà ấm. Một chiếc giường nhỏ. Khu vườn sẽ chờ bạn vào sáng mai.</p><div class="day-summary"><div><span>HÔM NAY</span><strong>Ngày ${world.seasonDay} · ${world.season}</strong></div><div><span>THỂ LỰC</span><strong>${s.energy} / 100</strong></div></div><p class="small-note">Chỉ cây đã được tưới mới lớn qua đêm. Ngủ hồi đầy thể lực. Không mất tiến trình khi đóng game.</p><button id="sleep" class="wide-button">Ngủ một giấc · Sang ngày mới</button><button data-close class="wide-button secondary">Trở lại khu vườn</button>`,
      "NGÔI NHÀ CỦA BẠN",
    );
  }
  function sleep() {
    if (transitioning) return;
    transitioning = true;
    modal.close();
    $("#transition").classList.add("active");
    keys.clear();
    route = [];
    pending = null;
    setTimeout(() => {
      const summary = world.sleep();
      s.player.x = 230;
      s.player.y = 148;
      pet.x = 255;
      pet.y = 143;
      target.x = 255;
      target.y = 143;
      dirty = true;
      save();
      updateUI();
      $("#transition").classList.remove("active");
      transitioning = false;
      openDialog(
        "Chào một bình minh mới",
        `<p>Ánh sáng lại chạm lên mái nhà. ${summary.weather === "rain" ? "Mưa nhẹ đang tưới mát khu vườn." : "Một ngày trong lành đang đợi bạn ngoài cửa."}</p><div class="day-summary"><div><span>HÔM NAY</span><strong>${world.season} · Ngày ${world.seasonDay}</strong></div><div><span>CÂY ĐÃ LỚN</span><strong>${summary.grew} cây</strong></div></div><p>Thể lực đã hồi đầy. ${s.plots.some((p) => p.crop && p.growth >= CROPS[p.crop].days) ? "Có cây đã chín! Chạm vào cây để thu hoạch." : "Nhớ chăm sóc những hạt mầm nhỏ nhé."}</p><button data-close class="wide-button">Bắt đầu ngày mới</button>`,
        "MỘT NGÀY THẬT ĐẸP",
      );
    }, 550);
  }
  function talk() {
    const message = world.talk();
    dirty = true;
    save();
    tone(550);
    openDialog(
      "An · Người giữ vườn",
      `<div class="npc-card"><div class="npc-portrait" role="img" aria-label="An, người hàng xóm đội nón rơm"></div><p>${message.slice(4)}</p></div><p class="small-note">Thân thiết: ${s.stats.friendship} điểm · Trò chuyện và tặng táo mỗi ngày để thân hơn.</p><div class="modal-actions"><button class="wide-button secondary" id="gift">Tặng táo · Đang có ${s.bag.fruit}</button><button class="wide-button" id="visit-shop">Ghé quầy hàng</button></div><p id="gift-notice" class="shop-notice"></p>`,
      "NGƯỜI HÀNG XÓM CỦA BẠN",
    );
  }
  function shrine() {
    openDialog(
      s.restored ? "Bình minh đã trở lại" : "Đài Bình Minh",
      `<div class="restore-art">${icon("star", "#c69e56")}</div><p>${s.restored ? "Bạn đã mang hơi ấm trở lại thung lũng. Cứ thong thả trồng cây, câu cá và sống những ngày thật đẹp cùng Nhật Diệm." : "Một phiến đá cũ giữa cỏ hoa. An nói rằng ngọn lửa ở đây từng dẫn đường cho mọi người trở về."}</p><div class="day-summary"><div><span>VÀNG</span><strong>${s.coins} / 350 G</strong></div><div><span>GỖ</span><strong>${s.bag.wood} / 8</strong></div></div>${!s.restored ? '<button id="restore" class="wide-button">Góp vật liệu · Khôi phục đài cổ</button>' : '<button data-close class="wide-button">Tiếp tục cuộc sống ở Ban Mai</button>'}<p id="restore-notice" class="shop-notice"></p>`,
      "CHƯƠNG I · NGỌN LỬA TRỞ VỀ",
    );
  }
  function help() {
    openDialog(
      "Những ngày ở Ban Mai",
      `<p>Điều hành nông trại nhỏ và phục hồi Đài Bình Minh. Bạn có thể chơi thong thả; cây thiếu nước sẽ ngừng lớn, không bị héo.</p><div class="help-grid"><div><b>1. Gieo một khởi đầu</b>Chọn cuốc → chạm ô đất. Chọn hạt → chạm ô đất. Chọn bình tưới → tưới cây.</div><div><b>2. Đón bình minh</b>Về nhà ngủ. Củ cải lớn sau 1 đêm đủ nước; cà rốt 2 đêm, bí ngô 3 đêm.</div><div><b>3. Sống cùng khu vườn</b>Nhặt gỗ và táo; câu cá ở cầu gỗ; trò chuyện, tặng táo cho An.</div><div><b>4. Mang hơi ấm trở về</b>Bán nông sản, nhận thưởng nhật ký. Góp 350 G và 8 gỗ để khôi phục đài.</div></div><p class="help-controls">WASD / mũi tên: đi · Chạm: tự tìm đường<br>E / Space: tương tác gần nhất · 1–5: dụng cụ<br>I: túi đồ · Esc: đóng / tạm dừng<br>Trên điện thoại: chạm đích hoặc vật cần tương tác.</p><p class="small-note">Lưu tự động sau mỗi hành động và mỗi 10 giây. Chỉ lưu trên trình duyệt, không đồng bộ tài khoản. Xuất bản lưu để chuyển máy hoặc sao lưu.</p><div class="modal-actions"><button id="export-save" class="wide-button secondary">Xuất bản lưu</button><button id="import-save" class="wide-button secondary">Nhập bản lưu</button></div><input id="save-file" type="file" accept="application/json,.json" hidden><p id="import-notice" class="shop-notice"></p><button id="reset-game" class="danger-button">Bắt đầu một khu vườn mới…</button>`,
      "SỔ TAY NGƯỜI GIỮ VƯỜN",
    );
  }
  function startFishing() {
    if (fishing) return;
    if (!world.spend(3)) {
      notify("Không đủ thể lực để câu. Ăn táo hoặc về nhà ngủ nhé.");
      return;
    }
    dirty = true;
    save();
    const delay = 900 + Math.random() * 1200;
    fishing = {
      phase: "waiting",
      elapsed: 0,
      delay,
      position: 0,
      direction: 1,
      zone: 35 + Math.random() * 20,
      handled: false,
    };
    openDialog(
      "Một chút yên bình bên hồ",
      `<div class="fishing-pond"></div><p id="fish-instruction" class="fish-instruction">Đã thả câu. Đợi phao rung…</p><div class="fishing-meter"><div id="fish-zone" class="fish-zone" style="left:${fishing.zone}%;width:25%"></div><div id="fish-cursor" class="fish-cursor" style="left:0%"></div></div><button id="reel" class="wide-button" disabled>Đang chờ cá…</button><p class="small-note">Khi cá cắn, bấm Kéo cần (hoặc Space) lúc vạch trắng ở trong vùng xanh. Mỗi lượt tốn 3 thể lực.</p>`,
      "BẾN CÂU · HỒ BAN MAI",
    );
    lastBiteFrame = performance.now();
    requestAnimationFrame(fishingFrame);
  }
  function fishingFrame(now) {
    if (!fishing || !modal.open) return;
    const dt = Math.min(now - lastBiteFrame, 60);
    lastBiteFrame = now;
    if (document.hidden) {
      requestAnimationFrame(fishingFrame);
      return;
    }
    const f = fishing;
    f.elapsed += dt;
    if (f.phase === "waiting" && f.elapsed >= f.delay) {
      f.phase = "bite";
      f.elapsed = 0;
      $("#fish-instruction").textContent =
        "Cá cắn câu! Kéo khi vạch trắng nằm trong vùng xanh.";
      $("#reel").disabled = false;
      $("#reel").textContent = "Kéo cần!";
      tone(920);
    }
    if (f.phase === "bite") {
      f.position += f.direction * dt * 0.042;
      if (f.position >= 98) {
        f.position = 98;
        f.direction = -1;
      }
      if (f.position <= 0) {
        f.position = 0;
        f.direction = 1;
      }
      $("#fish-cursor").style.left = f.position + "%";
      if (f.elapsed > 12000) {
        resolveFishing(false);
        return;
      }
    }
    if (fishing) requestAnimationFrame(fishingFrame);
  }
  function reel() {
    if (!fishing || fishing.phase !== "bite") return;
    resolveFishing(
      fishing.position >= fishing.zone && fishing.position <= fishing.zone + 25,
    );
  }
  function resolveFishing(success) {
    if (!fishing || fishing.handled) return;
    fishing.handled = true;
    fishing = null;
    const message = world.fish(success);
    finish(message, success ? 880 : 330);
    $("#fish-instruction").textContent = message;
    $("#reel").textContent = "Thả câu lần nữa · 3 thể lực";
    $("#reel").disabled = false;
    $("#reel").dataset.retry = "true";
  }
  function cancelFishing() {
    fishing = null;
  }
  function candidates() {
    return [
      ...PLACES,
      ...PLOTS.map((p, i) => ({
        ...p,
        id: "plot",
        index: i,
        label:
          s.plots[i].crop && s.plots[i].growth >= CROPS[s.plots[i].crop].days
            ? "Thu hoạch"
            : TOOLS[tool],
        approach: { x: p.x, y: p.y + 7 },
      })),
      ...GATHERS.map((p, i) => ({
        ...p,
        id: "gather",
        index: i,
        name: i < 2 ? "Nhặt táo rừng" : "Nhặt cành gỗ",
        approach: { x: p.x, y: p.y + 4 },
      })).filter((p) => p.id !== "gather" || !s.gathered.includes(p.index)),
    ];
  }
  function nearestTarget() {
    let nearest = null,
      best = Infinity;
    for (const p of candidates()) {
      const d = dist(s.player, p.approach || p);
      if (d < best) {
        nearest = p;
        best = d;
      }
    }
    return nearest;
  }
  function interact(p) {
    if (!p || modal.open || paused || transitioning) return;
    actionKind = tool;
    actionTime = 0.5;
    if (p.id === "plot") {
      selectedPlot = p.index;
      finish(world.plot(p.index, tool), tool === "water" ? 730 : 530);
    }
    if (p.id === "gather") finish(world.forage(p.index), 590);
    if (p.id === "home") home();
    if (p.id === "shop") shop();
    if (p.id === "an") talk();
    if (p.id === "pond") startFishing();
    if (p.id === "shrine") shrine();
  }
  function go(point, action = null) {
    route = pathTo(point);
    pending = action;
    if (!route.length) {
      pending = null;
      notify("Lối đi này đang bị cây hoặc bờ hồ chắn. Hãy chọn một lối khác.");
    }
  }
  function mapPoint(e) {
    const r = canvas.getBoundingClientRect(),
      cover = getComputedStyle(canvas).objectFit === "cover";
    const scale = (cover ? Math.max : Math.min)(r.width / W, r.height / H);
    return {
      x: (e.clientX - r.left - (r.width - W * scale) / 2) / scale,
      y: (e.clientY - r.top - (r.height - H * scale) / 2) / scale,
    };
  }
  function targetAt(point) {
    const plot = PLOTS.findIndex(
      (p) => Math.abs(point.x - p.x) < 12 && Math.abs(point.y - p.y) < 10,
    );
    if (plot >= 0)
      return {
        ...PLOTS[plot],
        id: "plot",
        index: plot,
        approach: { x: PLOTS[plot].x, y: PLOTS[plot].y + 7 },
      };
    let best = null,
      distance = 16;
    for (const p of candidates().filter((p) => p.id !== "plot")) {
      const d = dist(point, p);
      if (d < distance) {
        best = p;
        distance = d;
      }
    }
    return best;
  }
  canvas.addEventListener("pointerdown", (e) => {
    if (!booted || paused || modal.open || transitioning) return;
    canvas.focus({ preventScroll: true });
    const point = mapPoint(e),
      hit = targetAt(point);
    if (hit) {
      go(hit.approach || hit, hit);
      if (hit.id === "plot") selectedPlot = hit.index;
    } else if (walkable(point.x, point.y)) {
      go(point);
      selectedPlot = -1;
    } else
      notify(
        "Đi theo lối đất hoặc bãi cỏ. Cây, hàng rào và hồ không thể đi xuyên qua.",
      );
  });
  canvas.addEventListener("pointermove", (e) => {
    hovered = targetAt(mapPoint(e));
    canvas.style.cursor = hovered ? "pointer" : "crosshair";
  });
  canvas.addEventListener("pointerleave", () => {
    hovered = null;
  });
  function togglePause() {
    paused = !paused;
    keys.clear();
    $("#pause").textContent = paused ? "▷" : "Ⅱ";
    $("#pause").setAttribute("aria-pressed", String(paused));
    $("#pause").setAttribute("aria-label", paused ? "Tiếp tục" : "Tạm dừng");
    updateHUD();
  }
  document.addEventListener("keydown", (e) => {
    if (!booted) return;
    if (modal.open) {
      if (e.code === "Space" && fishing) {
        e.preventDefault();
        if (fishing.phase === "bite") reel();
      }
      return;
    }
    if (["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(e.target.tagName))
      return;
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(
        e.code,
      )
    )
      e.preventDefault();
    if (e.repeat && ["KeyE", "Space", "Escape", "KeyI"].includes(e.code))
      return;
    if (e.code === "Escape") {
      togglePause();
      return;
    }
    if (paused) return;
    if (
      [
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.code)
    ) {
      keys.add(e.code);
      route = [];
      pending = null;
    }
    if (e.code === "KeyE" || e.code === "Space") {
      const p = nearestTarget();
      if (p && dist(s.player, p.approach || p) < 24) interact(p);
      else notify("Đến gần ô đất, An, bến câu hoặc một vật để tương tác.");
    }
    if (/^Digit[1-5]$/.test(e.code))
      selectTool(Object.keys(TOOLS)[Number(e.code.slice(-1)) - 1]);
    if (e.code === "KeyI") switchTab("bag");
  });
  document.addEventListener("keyup", (e) => keys.delete(e.code));
  window.addEventListener("blur", () => {
    keys.clear();
    moving = false;
    save();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      keys.clear();
      save();
    }
  });
  window.addEventListener("pagehide", () => save());
  $("#close-modal").addEventListener("click", closeDialog);
  modal.addEventListener("cancel", () => {
    cancelFishing();
    keys.clear();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      const r = modal.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        closeDialog();
    }
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.tab) switchTab(b.dataset.tab);
    if (b.dataset.travel && booted && !paused && !modal.open) {
      const p = PLACES.find((p) => p.id === b.dataset.travel);
      go(p.approach, p);
      notify("Đang đến " + p.name.toLowerCase() + ".");
      canvas.focus({ preventScroll: true });
    }
    if (b.dataset.tool) {
      selectTool(b.dataset.tool);
      canvas.focus({ preventScroll: true });
    }
    if (b.dataset.claim) {
      finish(world.claim(b.dataset.claim), 880);
      updateUI();
    }
    if (b.hasAttribute("data-close")) closeDialog();
    if (b.dataset.buy) {
      const message = world.buy(b.dataset.buy);
      finish(message);
      refreshShop(message);
    }
    if (b.hasAttribute("data-upgrade")) {
      const message = world.upgrade();
      finish(message);
      refreshShop(message);
    }
    if (b.hasAttribute("data-sell-all")) {
      const message = world.sell();
      finish(message);
      refreshShop(message);
    }
    if (b.id === "sleep") sleep();
    if (b.id === "gift") {
      const message = world.gift();
      finish(message);
      $("#gift-notice").textContent = message;
      b.textContent = `Tặng táo · Đang có ${s.bag.fruit}`;
    }
    if (b.id === "visit-shop") shop();
    if (b.id === "restore") {
      const message = world.restore();
      finish(message);
      $("#restore-notice").textContent = message;
      if (s.restored) {
        $("#modal-title").textContent = "Bình minh đã trở lại!";
        b.disabled = true;
        b.textContent = "Đài Bình Minh đã được khôi phục";
        mode = "flare";
        modeUntil = time + 4;
        burst();
      }
    }
    if (b.id === "reel") {
      if (b.dataset.retry) {
        cancelFishing();
        startFishing();
      } else reel();
    }
    if (b.id === "export-save") exportSave();
    if (b.id === "import-save") $("#save-file").click();
    if (b.id === "reset-game") confirmReset();
    if (b.dataset.form) {
      s.petForm = Number(b.dataset.form);
      syncPet();
      save();
      tone(720);
    }
  });
  document.querySelector(".journal-tabs").addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.code)) return;
    e.preventDefault();
    const tabs = [...document.querySelectorAll("[data-tab]")],
      at = tabs.indexOf(document.activeElement);
    const next =
      e.code === "Home"
        ? 0
        : e.code === "End"
          ? tabs.length - 1
          : (at + (e.code === "ArrowRight" ? 1 : -1) + tabs.length) %
            tabs.length;
    switchTab(tabs[next].dataset.tab);
    tabs[next].focus();
  });
  $("#seed-choice").addEventListener("change", (e) => {
    s.chosenSeed = e.target.value;
    selectTool("seed");
    dirty = true;
    save();
    updateUI();
  });
  $("#eat").addEventListener("click", () => finish(world.eat()));
  $("#sell").addEventListener("click", () => {
    go(PLACES[1].approach, PLACES[1]);
    notify("Đang đến quầy của An để bán nông sản.");
  });
  $("#home").addEventListener("click", () => {
    if (!booted) return;
    home();
  });
  $("#help").addEventListener("click", help);
  $("#save").addEventListener("click", () => save(true));
  $("#pause").addEventListener("click", togglePause);
  $("#pet-power").addEventListener("click", () => {
    finish(world.pet(), 880);
    burst();
    mode = "flare";
    modeUntil = time + 3;
  });
  $("#fly").addEventListener("click", () => {
    mode = "fly";
    modeUntil = time + 8;
    tone(770);
    notify("Nhật Diệm sải cánh quanh bạn.");
  });
  $("#flare").addEventListener("click", () => {
    mode = "flare";
    modeUntil = time + 3;
    burst();
    tone(440);
  });
  $("#sound").addEventListener("click", () => {
    sound = !sound;
    const b = $("#sound");
    b.setAttribute("aria-pressed", String(sound));
    b.setAttribute("aria-label", sound ? "Tắt âm thanh" : "Bật âm thanh");
    if (sound) {
      try {
        audio =
          audio || new (window.AudioContext || window.webkitAudioContext)();
        audio.resume();
        tone(660);
      } catch {
        sound = false;
        b.setAttribute("aria-pressed", "false");
        notify("Trình duyệt này chưa hỗ trợ âm thanh.");
      }
    }
  });
  $("#fullscreen").addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      notify(
        "Trình duyệt không cho phép toàn màn hình. Bạn vẫn có thể chơi bình thường.",
      );
    }
  });
  function syncPet() {
    form = s.petForm;
    const files = {
      1: "phoenix-1.png",
      2: "phoenix-2-v2.png",
      3: "phoenix-3-v2.png",
    };
    $("#portrait").src = "assets/" + files[form];
    for (const b of document.querySelectorAll("[data-form]")) {
      const on = Number(b.dataset.form) === form;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-pressed", String(on));
    }
  }
  function exportSave() {
    const blob = new Blob([JSON.stringify(s, null, 2)], {
        type: "application/json",
      }),
      url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nhat-diem-ngay-${s.day}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  document.addEventListener("change", async (e) => {
    if (e.target.id !== "save-file" || !e.target.files[0]) return;
    try {
      const file = e.target.files[0];
      if (file.size > 100000) throw Error("Tệp quá lớn.");
      const loaded = new World(JSON.parse(await file.text()));
      if (
        !confirm(
          "Thay tiến trình hiện tại bằng bản lưu đã chọn? Hãy xuất bản lưu hiện tại trước nếu cần giữ lại.",
        )
      )
        return;
      replacingSave = true;
      localStorage.setItem(KEY, JSON.stringify(loaded.s));
      location.reload();
    } catch {
      replacingSave = false;
      $("#import-notice").textContent =
        "Không thể đọc bản lưu. Tiến trình hiện tại được giữ nguyên.";
    }
  });
  function confirmReset() {
    openDialog(
      "Gieo một khởi đầu khác?",
      `<p class="reset-warning">Thao tác này xóa tiến trình nông trại trên trình duyệt này. Hãy xuất bản lưu trước nếu bạn muốn giữ khu vườn cũ.</p><div class="modal-actions"><button data-close class="wide-button secondary">Giữ khu vườn hiện tại</button><button id="confirm-reset" class="wide-button">Xóa & bắt đầu mới</button></div>`,
      "BẮT ĐẦU LẠI",
    );
  }
  document.addEventListener("click", (e) => {
    if (e.target.id === "confirm-reset") {
      try {
        replacingSave = true;
        localStorage.removeItem(KEY);
        location.reload();
      } catch {
        replacingSave = false;
        notify("Trình duyệt không cho phép xóa bản lưu.");
      }
    }
  });
  $("#start-game").textContent = s.started
    ? "Trở về khu vườn →"
    : "Bước vào thung lũng →";
  if (s.started)
    $("#welcome-save").textContent =
      `Tiếp tục ngày ${s.day} · ${s.coins} vàng · Tiến trình lưu tại máy.`;
  $("#start-game").addEventListener("click", () => {
    const first = !s.started;
    booted = true;
    s.started = true;
    $("#welcome").hidden = true;
    canvas.focus({ preventScroll: true });
    save();
    if (first)
      notify(
        "Mừng bạn về Ban Mai! Chọn cuốc (2), rồi chạm một ô đất bên trái để bắt đầu.",
      );
    if (badSave)
      notify(
        "Không đọc được bản lưu cũ. Chưa ghi đè tệp xuất của bạn; có thể nhập lại trong Hướng dẫn.",
      );
    if (!storageOK)
      notify(
        "Trình duyệt chặn lưu tự động. Bạn có thể xuất bản lưu trong Hướng dẫn.",
      );
  });
  syncPet();
  updateUI();
  pet.x = s.player.x + 25;
  pet.y = s.player.y - 8;
  target.x = pet.x;
  target.y = pet.y;
  function move(dx, dy) {
    const old = { x: s.player.x, y: s.player.y };
    if (walkable(s.player.x + dx, s.player.y)) s.player.x += dx;
    if (walkable(s.player.x, s.player.y + dy)) s.player.y += dy;
    moving = dist(old, s.player) > 0.01;
    if (moving) {
      stepTime += Math.hypot(dx, dy) * 0.12;
      s.player.facing =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? "right"
            : "left"
          : dy > 0
            ? "down"
            : "up";
    }
    return moving;
  }
  function step(dt) {
    if (modal.open || document.hidden || transitioning || !booted) return;
    actionTime = Math.max(0, actionTime - dt);
    let dx =
      Number(keys.has("KeyD") || keys.has("ArrowRight")) -
      Number(keys.has("KeyA") || keys.has("ArrowLeft"));
    let dy =
      Number(keys.has("KeyS") || keys.has("ArrowDown")) -
      Number(keys.has("KeyW") || keys.has("ArrowUp"));
    moving = false;
    if (dx || dy) {
      const n = Math.hypot(dx, dy);
      move((dx / n) * dt * 35, (dy / n) * dt * 35);
    } else if (route.length) {
      const p = route[0],
        d = dist(s.player, p),
        step = dt * 40;
      if (d <= step) {
        move(p.x - s.player.x, p.y - s.player.y);
        route.shift();
      } else if (
        !move(((p.x - s.player.x) / d) * step, ((p.y - s.player.y) / d) * step)
      ) {
        route = [];
        pending = null;
      }
      if (!route.length && pending) {
        const hit = pending;
        pending = null;
        if (dist(s.player, hit.approach || hit) < 14) interact(hit);
      }
    }
    if (mode !== "fly") {
      target.x = s.player.x + 25;
      target.y = s.player.y - 7;
    }
    world.tick(dt);
    night = s.minute >= 1140;
    if (s.minute >= 1439) {
      home();
      notify("Đã nửa đêm. Về nhà nghỉ để đón ngày mới nhé.");
    }
    hudTime += dt;
    autosave += dt;
    if (hudTime > 0.2) {
      hudTime = 0;
      updateHUD();
      updateUI();
    }
    if (autosave > 10) {
      autosave = 0;
      save();
    }
    if (sound && time - lastMelody > 5) {
      lastMelody = time;
      const notes = [262, 330, 392, 440, 392, 330, 294, 330];
      tone(notes[Math.floor(time / 5) % notes.length] * (night ? 0.5 : 1));
    }
  }
  function oval(c, x, y, rx, ry, color) {
    c.fillStyle = color;
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    c.fill();
  }
  function tinyText(c, text, x, y, color = "#fff3cd", size = 3.5) {
    c.font = `${size}px "Be Vietnam Pro",sans-serif`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#1b3429aa";
    c.fillRect(
      x - c.measureText(text).width / 2 - 2,
      y - 3,
      c.measureText(text).width + 4,
      6,
    );
    c.fillStyle = color;
    c.fillText(text, x, y);
  }
  function crop(c, x, y, key, stage, mature, variation = 0) {
    const colors = CROPS[key],
      h = stage === 0 ? 3 : stage === 1 ? 5 : 7;
    rect(c, x, y - h, 1, h, "#52754a");
    poly(
      c,
      [
        [x, y - 1],
        [x - 4, y - 3],
        [x - 3, y - 5],
        [x, y - 3],
      ],
      "#5b8747",
    );
    poly(
      c,
      [
        [x + 1, y - 2],
        [x + 4, y - 5],
        [x + 5, y - 3],
        [x + 1, y],
      ],
      "#83a656",
    );
    if (stage > 0) {
      poly(
        c,
        [
          [x, y - h + 2],
          [x - 3, y - h - 1],
          [x - 1, y - h - 2],
          [x + 1, y - h + 1],
        ],
        "#779d4b",
      );
      rect(c, x + 1, y - h - 2, 1, 3, "#a2be6a");
    }
    if (mature) {
      if (key === "radish") {
        oval(c, x + 0.5, y + 1, 2.5, 2.6, "#b65d73");
        rect(c, x - 1, y - 1, 3, 3, "#e99fa8");
        rect(c, x - 1, y - 1, 1, 1, "#f7c8b8");
        rect(c, x + 1, y + 3, 1, 2, "#e8c498");
      }
      if (key === "carrot") {
        poly(
          c,
          [
            [x - 2, y - 1],
            [x + 3, y - 1],
            [x, y + 5],
          ],
          "#bb713a",
        );
        poly(
          c,
          [
            [x - 1, y - 1],
            [x + 2, y],
            [x, y + 4],
          ],
          "#eda353",
        );
        rect(c, x, y + 1, 2, 0.5, "#be783c");
      }
      if (key === "pumpkin") {
        oval(c, x, y + 1, 4, 3, "#b87536");
        oval(c, x - 1, y, 2.4, 3, "#e6a34f");
        oval(c, x + 1.5, y, 1.7, 2.5, "#cf8941");
        rect(c, x, y - 4, 1, 2, "#617c43");
        rect(c, x - 2, y - 2, 1, 2, "#f0bf70");
      }
    } else if (stage === 0) {
      rect(c, x - 2, y - 3, 2, 1, "#b4c67e");
      rect(c, x + 1, y - 4, 2, 1, "#89ac58");
    }
  }
  function drawPlot(c, p, i, t) {
    const at = PLOTS[i],
      x = at.x - 11,
      y = at.y - 8;
    rect(c, x - 1, y - 1, 24, 18, "#a99562");
    rect(
      c,
      x,
      y,
      22,
      16,
      p.tilled ? (p.watered ? "#654e38" : "#8b6540") : "#8f754d",
    );
    if (!p.tilled) {
      for (let k = 0; k < 26; k++) {
        rect(
          c,
          x + ((k * 7 + 3) % 21),
          y + ((k * 3 + 2) % 15),
          k % 3 === 0 ? 1.4 : 0.6,
          0.5,
          k % 2 ? "#b69862" : "#775d3f",
        );
      }
      for (const [xx, yy] of [
        [4, 8],
        [15, 4],
        [10, 13],
      ]) {
        rect(c, x + xx, y + yy - 2, 0.6, 3, "#747a43");
        poly(
          c,
          [
            [x + xx, y + yy],
            [x + xx - 2, y + yy - 2],
            [x + xx - 2, y + yy - 3],
            [x + xx, y + yy - 1],
            [x + xx + 2, y + yy - 3],
            [x + xx + 1, y + yy],
          ],
          "#a2a15b",
        );
      }
      rect(c, x + 18, y + 11, 2, 1, "#b3a77c");
      rect(c, x + 18, y + 10, 1.5, 0.7, "#d1bd90");
    } else {
      for (let row = 0; row < 4; row++) {
        rect(
          c,
          x + 1,
          y + 2 + row * 4,
          20,
          1,
          p.watered ? "#483c30" : "#6e4e33",
        );
        rect(
          c,
          x + 2,
          y + 1 + row * 4,
          19,
          0.6,
          p.watered ? "#806145" : "#a77a4d",
        );
      }
      for (let k = 0; k < 8; k++)
        rect(
          c,
          x + ((k * 7 + 2) % 20),
          y + ((k * 3 + 1) % 14),
          1,
          0.5,
          p.watered ? "#a17d55" : "#c29562",
        );
    }
    if (p.crop) {
      const mature = p.growth >= CROPS[p.crop].days,
        stage = mature ? 2 : p.growth > 0 ? 1 : 0;
      crop(c, at.x - 5, at.y + 2, p.crop, stage, mature);
      crop(c, at.x + 5, at.y + 2, p.crop, stage, mature, 1);
      if (mature && !reducedMotion) {
        const a = 0.3 + Math.sin(t * 3 + i) * 0.3;
        c.globalAlpha = a;
        rect(c, at.x + 8, at.y - 6, 1, 3, "#fff2b5");
        rect(c, at.x + 7, at.y - 5, 3, 1, "#fff2b5");
        c.globalAlpha = 1;
      }
      if (p.watered) {
        oval(c, at.x + 8, at.y + 5, 1, 0.5, "#8eaca180");
      }
    }
    if (selectedPlot === i || (hovered?.id === "plot" && hovered.index === i)) {
      c.strokeStyle = "#fff2b5";
      c.lineWidth = 0.5;
      for (const [xx, yy, sx, sy] of [
        [x, y, 1, 1],
        [x + 22, y, -1, 1],
        [x, y + 16, 1, -1],
        [x + 22, y + 16, -1, -1],
      ]) {
        c.beginPath();
        c.moveTo(xx + sx * 3, yy);
        c.lineTo(xx, yy);
        c.lineTo(xx, yy + sy * 3);
        c.stroke();
      }
    }
  }
  function drawGround(c, t) {
    for (let i = 0; i < PLOTS.length; i++) drawPlot(c, s.plots[i], i, t);
    // The old altar becomes a physical landmark with an evolving flame.
    const x = 329,
      y = 267;
    oval(c, x, y + 7, 10, 3, "#263b2944");
    rect(c, x - 8, y + 2, 16, 4, "#65715f");
    rect(c, x - 6, y - 1, 12, 4, "#a0a48a");
    rect(c, x - 4, y - 8, 8, 8, "#828b74");
    rect(c, x - 5, y - 9, 10, 2, "#bfc1a0");
    rect(c, x - 2, y - 7, 1, 5, "#c4be91");
    if (s.restored) {
      const glow = c.createRadialGradient(x, y - 10, 0, x, y - 10, 20);
      glow.addColorStop(0, "#ffce6c66");
      glow.addColorStop(1, "#ffce6c00");
      c.fillStyle = glow;
      c.fillRect(x - 20, y - 30, 40, 40);
      poly(
        c,
        [
          [x - 4, y - 9],
          [x - 3, y - 15],
          [x, y - 21 - Math.sin(t * 5) * 2],
          [x + 1, y - 14],
          [x + 4, y - 16],
          [x + 4, y - 10],
          [x, y - 7],
        ],
        "#dc8b42",
      );
      poly(
        c,
        [
          [x - 2, y - 9],
          [x, y - 16],
          [x + 2, y - 10],
          [x, y - 8],
        ],
        "#ffe0a0",
      );
    }
    // Collectibles sit on top of the painted map and disappear after gathering.
    for (let i = 0; i < GATHERS.length; i++)
      if (!s.gathered.includes(i)) {
        const p = GATHERS[i];
        oval(c, p.x, p.y + 2, 5, 1.5, "#2d432733");
        if (i < 2) {
          rect(c, p.x - 4, p.y - 2, 8, 5, "#9a6f42");
          rect(c, p.x - 4, p.y - 3, 8, 1, "#d3ae69");
          for (const d of [-2, 1, 3]) {
            rect(c, p.x + d - 1, p.y - 4, 2, 2, "#c86f49");
            rect(c, p.x + d, p.y - 5, 0.5, 1, "#73924e");
          }
        } else {
          poly(
            c,
            [
              [p.x - 5, p.y],
              [p.x + 3, p.y - 3],
              [p.x + 5, p.y],
              [p.x - 4, p.y + 3],
            ],
            "#825b3b",
          );
          rect(c, p.x - 4, p.y, 8, 1, "#c0975a");
          rect(c, p.x - 4, p.y + 1, 2, 1, "#e0be83");
        }
        const shimmer = reducedMotion ? 0.5 : 0.45 + Math.sin(t * 2 + i) * 0.25;
        c.globalAlpha = shimmer;
        rect(c, p.x + 4, p.y - 6, 0.6, 2, "#fff3be");
        rect(c, p.x + 3.3, p.y - 5.3, 2, 0.6, "#fff3be");
        c.globalAlpha = 1;
      }
    // Merchant's stall, cloth awning, stacked crates, and painted sign.
    rect(c, 244, 123, 16, 9, "#795236");
    rect(c, 244, 122, 16, 2, "#d2aa6c");
    rect(c, 243, 114, 2, 11, "#805b38");
    rect(c, 258, 114, 2, 11, "#805b38");
    poly(
      c,
      [
        [241, 115],
        [245, 107],
        [257, 107],
        [262, 115],
      ],
      "#ded1a0",
    );
    for (let i = 0; i < 4; i++)
      poly(
        c,
        [
          [244 + i * 4, 108],
          [246 + i * 4, 108],
          [248 + i * 4, 115],
          [244 + i * 4, 115],
        ],
        i % 2 ? "#dbbd83" : "#80925e",
      );
    rect(c, 244, 115, 16, 2, "#e9d4a1");
    rect(c, 246, 120, 3, 2, "#df9c5d");
    rect(c, 251, 120, 3, 2, "#9eae69");
    rect(c, 255, 120, 3, 2, "#b4bc77");
    // A few route dots make touch navigation easy to follow.
    if (route.length) {
      c.globalAlpha = 0.45;
      for (let i = 0; i < route.length; i += 3) {
        const p = route[i];
        oval(c, p.x, p.y, 0.7, 0.4, "#fff3bd");
      }
      const p = route.at(-1);
      c.strokeStyle = "#ffedb1";
      c.lineWidth = 0.6;
      c.beginPath();
      c.ellipse(p.x, p.y, 2.8, 1.4, 0, 0, Math.PI * 2);
      c.stroke();
      c.globalAlpha = 1;
    }
    if (hovered) {
      const p = hovered;
      if (p.id !== "plot") tinyText(c, p.name || p.label, p.x, p.y - 18);
    }
    const phase = s.minute;
    if (phase > 1000 && phase < 1170) {
      c.fillStyle = `rgba(240,151,69,${Math.sin(((phase - 1000) / 170) * Math.PI) * 0.09})`;
      c.fillRect(0, 0, W, H);
    }
  }
  // An original pixel farmer sprite with directional faces and a two-step walk cycle.
  function farmer(c, x, y, facing, t, isNPC = false) {
    x = Math.round(x);
    y = Math.round(y);
    const walk = isNPC
      ? 0
      : moving && !reducedMotion
        ? Math.sin(stepTime * 4)
        : 0;
    const bob = Math.abs(walk) > 0.7 ? -1 : 0;
    oval(c, x, y, 5, 1.5, "#213c3144");
    if (isNPC && anArt.complete && anArt.naturalWidth) {
      c.drawImage(anArt, 410, 100, 414, 1075, x - 5.4, y - 28, 10.8, 28);
      return;
    }
    if (!isNPC && farmerArt.complete && farmerArt.naturalWidth) {
      const row = { down: 0, left: 1, right: 2, up: 3 }[facing] ?? 0;
      const frame = moving && !reducedMotion ? Math.floor(stepTime * 2) % 4 : 1;
      const [sx, sy, sw, sh] = farmerFrames[row][frame],
        k = 27 / 290;
      c.drawImage(
        farmerArt,
        sx,
        sy,
        sw,
        sh,
        x - (sw * k) / 2,
        y - sh * k,
        sw * k,
        sh * k,
      );
      if (actionTime > 0) {
        c.save();
        c.translate(x + 5, y - 8);
        c.rotate(-0.7 + Math.sin(actionTime * 10) * 0.5);
        if (actionKind === "hoe") {
          rect(c, 0, -9, 1, 12, "#a78451");
          rect(c, -3, -9, 6, 2, "#788b8d");
          rect(c, -3, -9, 6, 0.5, "#d1d5be");
        }
        if (actionKind === "water") {
          rect(c, 0, -2, 5, 4, "#6c9599");
          rect(c, 1, -3, 3, 1, "#b5cbb7");
          poly(
            c,
            [
              [4, -1],
              [8, -3],
              [9, -2],
              [5, 2],
            ],
            "#91b0aa",
          );
        }
        if (actionKind === "seed") {
          rect(c, 0, -1, 4, 5, "#d8bd7f");
          rect(c, 1, 0, 2, 2, "#77964f");
        }
        c.restore();
      }
      return;
    }
    c.save();
    c.translate(x, y + bob);
    const coat = isNPC ? "#ba8172" : "#637e80",
      coatLight = isNPC ? "#dfaa8c" : "#91aaa1";
    const boot = "#5c4a3b",
      pants = isNPC ? "#797254" : "#405c65";
    rect(c, -3, -5, 3, 4 + Math.round(walk), pants);
    rect(c, 1, -5, 3, 4 - Math.round(walk), pants);
    rect(c, -3, -1 + Math.round(walk), 3, 1.5, boot);
    rect(c, 1, -1 - Math.round(walk), 3, 1.5, boot);
    rect(c, -4, -11, 8, 7, coat);
    rect(c, -3, -10, 2, 4, coatLight);
    rect(c, -3, -5, 6, 1, "#4f6052");
    rect(c, -5, -10, 2, 5, "#ddba8e");
    rect(c, 4, -10, 2, 5, "#d4ac80");
    const away = facing === "up";
    rect(c, -4, -17, 8, 7, "#5c4435");
    if (!away) {
      rect(c, -3, -16, 6, 5, "#eac79c");
      rect(c, -3, -16, 6, 1, "#b98b61");
      if (facing === "left") {
        rect(c, -4, -14, 2, 2, "#eac79c");
        rect(c, -3, -14, 1, 1, "#514b3c");
      } else if (facing === "right") {
        rect(c, 3, -14, 2, 2, "#eac79c");
        rect(c, 2, -14, 1, 1, "#514b3c");
      } else {
        rect(c, -2, -14, 1, 1, "#4b4b3c");
        rect(c, 2, -14, 1, 1, "#4b4b3c");
        rect(c, 0, -12, 1, 0.5, "#bc8c70");
      }
    } else {
      rect(c, -3, -15, 6, 3, "#755440");
    }
    // Broad straw brim, woven highlights and green ribbon.
    rect(c, -6, -18, 12, 2, "#9a7647");
    rect(c, -5, -19, 10, 1, "#e8ca88");
    rect(c, -4, -22, 8, 4, "#cbad6d");
    rect(c, -3, -22, 5, 1, "#efda9a");
    rect(c, -4, -19, 8, 1, isNPC ? "#b47766" : "#6a8054");
    rect(c, -2, -21, 0.6, 1, "#b49359");
    rect(c, 1, -21, 0.6, 1, "#b49359");
    if (isNPC) {
      rect(c, 4, -20, 2, 2, "#f2d1b2");
      rect(c, 4, -20, 1, 1, "#dba767");
    } else {
      rect(c, -2, -9, 4, 3, "#536f75");
      rect(c, -2, -8, 4, 0.7, "#b4b999");
      rect(c, -2, -11, 1, 5, "#b3bc98");
      rect(c, 2, -11, 1, 5, "#b3bc98");
    }
    if (!isNPC && actionTime > 0) {
      c.save();
      c.translate(5, -7);
      c.rotate(-0.8 + Math.sin(actionTime * 10) * 0.6);
      if (actionKind === "hoe") {
        rect(c, 0, -9, 1, 12, "#a78452");
        rect(c, -3, -9, 6, 2, "#758689");
        rect(c, -3, -9, 6, 0.5, "#bfd0b8");
      }
      if (actionKind === "water") {
        rect(c, 0, -2, 5, 4, "#719a9e");
        rect(c, 1, -3, 3, 1, "#adc3b1");
        poly(
          c,
          [
            [4, -1],
            [8, -3],
            [9, -2],
            [5, 2],
          ],
          "#8baaad",
        );
        for (let i = 0; i < 3; i++)
          rect(c, 9 + i * 1.5, -1 + i, 1, 1, "#bee1d9");
      }
      if (actionKind === "seed") {
        rect(c, 0, -1, 4, 5, "#d3bb80");
        rect(c, 1, 0, 2, 2, "#74904d");
      }
      c.restore();
    }
    c.restore();
  }
  function drawActors(c, t) {
    // Depth order is consistent with the feet of actors, not their heads.
    if (s.player.y < 142) {
      farmer(c, s.player.x, s.player.y, s.player.facing, t);
      farmer(c, 274, 142, "down", t, true);
    } else {
      farmer(c, 274, 142, "down", t, true);
      farmer(c, s.player.x, s.player.y, s.player.facing, t);
    }
    const near = nearestTarget();
    if (
      near &&
      dist(s.player, near.approach || near) < 23 &&
      near.id !== "plot"
    ) {
      const name = near.id === "gather" ? near.name : near.name;
      tinyText(c, name, near.x, near.y - 27, "#fff1c9", 3.2);
    }
    if (actionTime > 0 && actionKind === "water" && selectedPlot >= 0) {
      const at = PLOTS[selectedPlot];
      for (let i = 0; i < 8; i++) {
        const a = i * 2.4 + time * 8,
          r = 4 + (i % 3);
        rect(
          c,
          at.x + Math.cos(a) * r,
          at.y + Math.sin(a) * r * 0.5,
          1,
          1,
          "#b5d9c7",
        );
      }
    }
    if (!booted) return;
    // A quiet marker always identifies the player's straw hat.
    if (!moving) {
      c.fillStyle = "#fff0bb";
      c.beginPath();
      c.moveTo(s.player.x, s.player.y - 26);
      c.lineTo(s.player.x - 1.3, s.player.y - 28);
      c.lineTo(s.player.x + 1.3, s.player.y - 28);
      c.fill();
    }
  }
  function drawAtmosphere(c, t) {
    const darkness =
      s.minute < 420
        ? 0.28
        : s.minute > 1080
          ? Math.min(0.5, ((s.minute - 1080) / 360) * 0.5)
          : 0;
    if (darkness) {
      c.fillStyle = `rgba(19,35,66,${darkness})`;
      c.fillRect(0, 0, W, H);
      for (const [x, y, r] of [
        [148, 84, 15],
        [167, 83, 12],
        [243, 78, 9],
        [320, 133, 8],
        [319, 260, 9],
      ]) {
        const glow = c.createRadialGradient(x, y, 0, x, y, r);
        glow.addColorStop(0, "#ffd68533");
        glow.addColorStop(1, "#ffd68500");
        c.fillStyle = glow;
        c.fillRect(x - r, y - r, r * 2, r * 2);
      }
      if (!reducedMotion) {
        for (let i = 0; i < 24; i++) {
          c.globalAlpha = Math.max(0, Math.sin(t * 1.4 + i)) * 0.6;
          rect(
            c,
            65 + ((i * 43) % 350) + Math.sin(t * 0.3 + i) * 4,
            90 + ((i * 31) % 200),
            1,
            1,
            "#fff1aa",
          );
        }
        c.globalAlpha = 1;
      }
    }
    if (world.weather === "rain") {
      rect(c, 0, 0, W, H, "#294b641f");
      c.strokeStyle = "#d0e6d256";
      c.lineWidth = 0.4;
      for (let i = 0; i < 95; i++) {
        const x = (i * 37 - (reducedMotion ? 0 : t * 12)) % W,
          y = (i * 23 + (reducedMotion ? 0 : t * 75)) % H;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x - 1.5, y + 4);
        c.stroke();
      }
      if (!reducedMotion)
        for (let i = 0; i < 9; i++) {
          const phase = (t * 0.7 + i * 0.23) % 1;
          c.globalAlpha = (1 - phase) * 0.3;
          c.strokeStyle = "#deeee0";
          c.beginPath();
          c.ellipse(
            345 + ((i * 17) % 74),
            180 + ((i * 13) % 48),
            phase * 3,
            phase,
            0,
            0,
            Math.PI * 2,
          );
          c.stroke();
        }
      c.globalAlpha = 1;
    }
    if (world.season === "Thu") rect(c, 0, 0, W, H, "#bb7f2d12");
    if (world.season === "Đông") {
      rect(c, 0, 0, W, H, "#a9c9d41c");
      if (!reducedMotion) {
        for (let i = 0; i < 50; i++) {
          c.globalAlpha = 0.4;
          rect(
            c,
            (i * 43 + Math.sin(t * 0.4 + i) * 7) % W,
            (i * 29 + t * 8) % H,
            0.7,
            0.7,
            "#ffffee",
          );
        }
        c.globalAlpha = 1;
      }
    }
    if (hovered?.id === "plot") {
      const p = s.plots[hovered.index],
        at = PLOTS[hovered.index];
      const text = p.crop
        ? `${CROPS[p.crop].name} · ${p.growth >= CROPS[p.crop].days ? "Thu hoạch" : p.watered ? "Đã tưới" : "Cần nước"}`
        : p.tilled
          ? "Đất đã cuốc"
          : "Ô đất trống";
      tinyText(c, text, at.x, at.y - 15, "#fff4d0", 3.1);
    }
  }
  window.FarmGame = {
    running: () => booted && !modal.open && !document.hidden && !transitioning,
    player: () => s.player,
    step,
    drawGround,
    drawActors,
    drawAtmosphere,
    // Read-only snapshots are useful for diagnostics and browser regression tests.
    snapshot: () => JSON.parse(JSON.stringify(s)),
    assetsReady: () =>
      farmerArt.complete &&
      farmerArt.naturalWidth > 0 &&
      anArt.complete &&
      anArt.naturalWidth > 0,
    map: { plots: PLOTS, places: PLACES, gathers: GATHERS, walkable, pathTo },
  };
})();
