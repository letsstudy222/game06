(function (root) {
  "use strict";
  const app = root.TinyFarm;
  class GameplayHUD {
    constructor({ companion, viewport, art, onMapTarget }) {
      this.companion = companion;
      this.viewport = viewport;
      this.art = art;
      this.onMapTarget = onMapTarget;
      this.drawer = document.querySelector(".journal");
      this.drawer.hidden = true;
      this.map = document.querySelector("#minimap");
      this.map.width = 96;
      this.map.height = 64;
      document
        .querySelector("#journal-toggle")
        .addEventListener("click", () => this.setDrawer(this.drawer.hidden));
      document
        .querySelector("#journal-close")
        .addEventListener("click", () => this.setDrawer(false));
      this.map.addEventListener("pointerdown", (e) => {
        const r = this.map.getBoundingClientRect();
        onMapTarget({
          x: ((e.clientX - r.left) / r.width) * 480,
          y: ((e.clientY - r.top) / r.height) * 320,
        });
      });
      document.addEventListener("tinyfarm:settings", () =>
        this.applySettings(),
      );
      this.applySettings();
      app.PixelIcons.upgrade();
    }
    setDrawer(open) {
      this.drawer.hidden = !open;
      document
        .querySelector("#journal-toggle")
        .setAttribute("aria-expanded", String(open));
      if (open)
        document.querySelector('[role="tab"][aria-selected="true"]').focus();
    }
    update(s, world) {
      const q = (x) => document.querySelector(x),
        level =
          1 +
          Math.floor(
            (s.stats.harvested + s.stats.fish + s.stats.friendship) / 10,
          ),
        ready = s.petDay !== s.day;
      q("#hud-level").textContent = "Lv. " + level;
      q("#skill-value").textContent = ready ? "1 / 1" : "0 / 1";
      q("#skill-fill").style.width = ready ? "100%" : "0%";
      q("#pet-shortcut").setAttribute(
        "aria-label",
        ready
          ? "Nhờ Nhật Diệm gọi sương, sẵn sàng"
          : "Phép sương đã dùng hôm nay",
      );
      q("#hud-energy").textContent = s.energy + "/100";
      q("#hud-energy-fill").style.width = s.energy + "%";
      for (const el of document.querySelectorAll("[data-count]"))
        el.textContent =
          el.dataset.count === "seed"
            ? s.seeds[s.chosenSeed]
            : s.bag[el.dataset.count];
      this.companion.portrait(q("#hud-pet"));
      this.companion.portrait(q("#portrait"));
      const c = this.map.getContext("2d");
      c.imageSmoothingEnabled = false;
      c.fillStyle = "#52784b";
      c.fillRect(0, 0, 96, 64);
      if (this.art.complete && this.art.naturalWidth)
        c.drawImage(this.art, 0, 0, 96, 64);
      c.lineWidth = 1;
      c.strokeStyle = "#f8e4ad";
      c.strokeRect(0.5, Math.round(this.viewport.camera.y / 5) + 0.5, 95, 53);
      for (const [x, y, color] of [
        [s.player.x, s.player.y, "#fff4c2"],
        [this.companion.position.x, this.companion.position.y, "#f3a24a"],
      ]) {
        c.fillStyle = "#3b2b26";
        c.fillRect(Math.round(x / 5) - 1, Math.round(y / 5) - 1, 3, 3);
        c.fillStyle = color;
        c.fillRect(Math.round(x / 5), Math.round(y / 5), 1, 1);
      }
      q("#map-caption").textContent = world.season + " · Ban Mai";
    }
    applySettings() {
      document.querySelector(".minimap-panel").hidden =
        !app.Settings.get("showMinimap");
    }
  }
  app.GameplayHUD = GameplayHUD;
})(window);
