(function (root) {
  "use strict";
  const app = root.TinyFarm;
  class TitleScreen {
    constructor({
      companion,
      art,
      canContinue,
      state,
      onStart,
      onContinue,
      onSettings,
      onQuit,
    }) {
      Object.assign(this, { companion, art, canContinue, state });
      this.root = document.querySelector("#welcome");
      this.canvas = document.querySelector("#title-scene");
      this.canvas.width = 480;
      this.canvas.height = 270;
      document.querySelector("#start-game").addEventListener("click", onStart);
      document
        .querySelector("#continue-game")
        .addEventListener("click", onContinue);
      document
        .querySelector("#title-settings")
        .addEventListener("click", onSettings);
      document.querySelector("#quit-game").addEventListener("click", onQuit);
      this.root.addEventListener("keydown", (e) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.code)) return;
        const buttons = [
            ...this.root.querySelectorAll(".title-menu button:not(:disabled)"),
          ],
          at = buttons.indexOf(document.activeElement);
        e.preventDefault();
        const n =
          e.code === "Home"
            ? 0
            : e.code === "End"
              ? buttons.length - 1
              : (at + (e.code === "ArrowDown" ? 1 : -1) + buttons.length) %
                buttons.length;
        buttons[n].focus();
      });
      this.fit = () => {
        const scale = Math.min(
            (innerWidth - 16) / 480,
            (innerHeight - 16) / 270,
            4,
          ),
          n = scale >= 1 ? Math.floor(scale) : scale;
        document
          .querySelector(".title-stage")
          .style.setProperty("--title-scale", n);
      };
      window.addEventListener("resize", this.fit);
      this.fit();
      this.tick = (t) => {
        if (!this.root.hidden) this.draw(t / 1000);
        requestAnimationFrame(this.tick);
      };
      requestAnimationFrame(this.tick);
      this.show(false);
    }
    refresh() {
      const save = this.canContinue(),
        s = this.state();
      document.querySelector("#continue-game").disabled = !save;
      document.querySelector("#welcome-save").textContent = save
        ? `Tiếp tục ngày ${s.day} · ${s.coins} G`
        : "Một khu vườn mới đang chờ bạn";
    }
    show(focus = true) {
      this.refresh();
      this.root.hidden = false;
      document.body.dataset.screen = "title";
      for (const e of document.querySelectorAll(
        ".masthead,.game-shell,.page-footer",
      ))
        e.inert = true;
      if (focus)
        (this.canContinue()
          ? document.querySelector("#continue-game")
          : document.querySelector("#start-game")
        ).focus();
    }
    hide() {
      this.root.hidden = true;
      document.body.dataset.screen = "game";
      for (const e of document.querySelectorAll(
        ".masthead,.game-shell,.page-footer",
      ))
        e.inert = false;
    }
    draw(time) {
      const c = this.canvas.getContext("2d");
      c.imageSmoothingEnabled = false;
      c.fillStyle = "#6eb9d3";
      c.fillRect(0, 0, 480, 270);
      // Independent scene layers, never the supplied mockup bitmap.
      c.fillStyle = "#a9d9de";
      for (const x of [18, 104, 335, 420]) {
        c.fillRect(x, 16, 40, 6);
        c.fillRect(x + 8, 10, 25, 6);
        c.fillRect(x + 13, 6, 13, 4);
      }
      c.fillStyle = "#638d96";
      c.beginPath();
      c.moveTo(0, 58);
      for (let x = 0; x < 490; x += 35) c.lineTo(x, 35 + ((x * 7) % 23));
      c.lineTo(480, 90);
      c.lineTo(0, 90);
      c.fill();
      if (this.art.complete && this.art.naturalWidth)
        c.drawImage(this.art, 0, 43, 480, 320);
      c.fillStyle = "#23391d1f";
      c.fillRect(0, 43, 480, 227);
      const p = document.querySelector("#title-phoenix"),
        pc = p.getContext("2d");
      pc.clearRect(0, 0, 48, 40);
      this.companion.drawSprite(pc, 24, 28, time, "fly");
    }
  }
  app.TitleScreen = TitleScreen;
})(window);
