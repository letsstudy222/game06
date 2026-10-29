export class PlayerHUD {
  constructor(state, scene) {
    this.state = state;
    scene.portrait(document.getElementById("portrait"));
    document.getElementById("collapse-hud").addEventListener("click", () => {
      const el = document.querySelector(".player-hud"),
        collapsed = el.classList.toggle("collapsed");
      document
        .getElementById("collapse-hud")
        .setAttribute("aria-expanded", String(!collapsed));
      document.getElementById("island").focus({ preventScroll: true });
    });
  }
  update() {
    const p = this.state.player;
    document.getElementById("hp-value").textContent =
      `${Math.ceil(p.hp)} / ${p.maxHp}`;
    document.getElementById("hp-fill").style.width =
      (p.hp / p.maxHp) * 100 + "%";
    document
      .querySelector(".hp-track")
      .setAttribute("aria-valuenow", String(Math.ceil(p.hp)));
  }
}
