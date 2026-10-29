import { SKILLS } from "./SkillSystem.mjs";
export class UIHud {
  constructor(state, scene, actions) {
    this.state = state;
    this.scene = scene;
    this.actions = actions;
    this.dialog = document.querySelector("#help-dialog");
    this.pauseButton = document.querySelector("#pause");
    this.bind();
    this.drawIcons();
  }
  bind() {
    for (const action of ["attack", "fire"])
      document.querySelector("#" + action).addEventListener("click", () => {
        this.actions.use(action);
        this.actions.focus();
      });
    document.querySelector("#hover").addEventListener("click", () => {
      this.actions.hover();
      this.actions.focus();
    });
    this.pauseButton.addEventListener("click", () => {
      this.actions.pause();
      this.actions.focus();
    });
    document
      .querySelector("#help")
      .addEventListener("click", () => this.openHelp());
    for (const id of ["close-help", "resume"])
      document
        .querySelector("#" + id)
        .addEventListener("click", () => this.closeHelp());
    this.dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      this.closeHelp();
    });
  }
  openHelp() {
    this.wasPaused = this.state.paused;
    this.state.paused = true;
    this.actions.clear();
    this.dialog.showModal();
  }
  closeHelp() {
    this.dialog.close();
    this.state.paused = this.wasPaused;
    this.actions.clear();
    this.actions.focus();
  }
  drawIcons() {
    const hover = document.querySelector("#hover canvas").getContext("2d");
    hover.fillStyle = "#6c8b59";
    hover.fillRect(2, 7, 4, 2);
    hover.fillRect(5, 5, 3, 2);
    hover.fillRect(9, 5, 3, 2);
    hover.fillRect(12, 7, 3, 2);
    hover.fillRect(7, 7, 2, 6);
    hover.fillStyle = "#bd9c4e";
    hover.fillRect(6, 3, 4, 2);
    const attack = document.querySelector("#attack canvas").getContext("2d");
    for (let i = 0; i < 8; i++) {
      attack.fillStyle = i % 2 ? "#a17d46" : "#e0b960";
      attack.fillRect(3 + i, 12 - i, 2, 2);
    }
    attack.fillStyle = "#5e704f";
    attack.fillRect(2, 11, 2, 3);
    const fire = document.querySelector("#fire canvas").getContext("2d");
    fire.fillStyle = "#a55b3c";
    fire.fillRect(3, 7, 10, 7);
    fire.fillRect(5, 4, 7, 8);
    fire.fillRect(7, 1, 2, 8);
    fire.fillStyle = "#dda44e";
    fire.fillRect(5, 8, 6, 5);
    fire.fillRect(7, 5, 3, 6);
    fire.fillStyle = "#f8df96";
    fire.fillRect(7, 9, 2, 4);
  }
  update() {
    const p = this.state.player;
    document.querySelector("#hp-value").textContent =
      `${Math.ceil(p.hp)} / ${p.maxHp}`;
    document.querySelector("#hp-fill").style.width =
      (p.hp / p.maxHp) * 100 + "%";
    document
      .querySelector(".hp-track")
      .setAttribute("aria-valuenow", String(Math.ceil(p.hp)));
    document.querySelector("#island-index").textContent =
      this.state.island.label;
    document.querySelector("#island-name").textContent = this.state.island.name;
    document
      .querySelector("#hover")
      .setAttribute("aria-pressed", String(p.hovering));
    for (const name of ["attack", "fire"]) {
      const left = this.state.skills.cooldowns[name],
        button = document.querySelector("#" + name);
      button.querySelector(".cooldown-mask").style.transform =
        `scaleY(${left / SKILLS[name].cooldown})`;
      button.querySelector(".cooldown-label").textContent =
        left > 0.05 ? left.toFixed(1) : "";
      button.setAttribute(
        "aria-label",
        name === "attack"
          ? `Vũ kích${left > 0.05 ? ", đang hồi chiêu" : ""}`
          : `Nhật diệm${left > 0.05 ? ", đang hồi chiêu" : ""}`,
      );
    }
    const message = this.state.messageTime > 0 ? this.state.message : "";
    if (document.querySelector("#message").textContent !== message)
      document.querySelector("#message").textContent = message;
    document.querySelector("#paused-banner").hidden =
      !this.state.paused || this.dialog.open;
    this.pauseButton.setAttribute("aria-pressed", String(this.state.paused));
    this.pauseButton.setAttribute(
      "aria-label",
      this.state.paused ? "Tiếp tục" : "Tạm dừng",
    );
    this.pauseButton.textContent = this.state.paused ? ">" : "II";
    const c = document.querySelector("#portrait").getContext("2d");
    c.imageSmoothingEnabled = false;
    c.clearRect(0, 0, 32, 32);
    if (this.scene.ready())
      c.drawImage(this.scene.sprite, 0, 0, 32, 32, 0, 0, 32, 32);
  }
}
