export class WorldHUD {
  constructor(state) {
    this.state = state;
    this.lastRegion = "";
    this.until = 0;
  }
  update() {
    const region = this.state.region();
    if (region !== this.lastRegion) {
      this.lastRegion = region;
      this.until = this.state.time + 4;
      document.getElementById("island-index").textContent = region;
    }
    document
      .querySelector(".island-hud")
      .classList.toggle("faded", this.state.time > this.until);
    const message = this.state.messageTime > 0 ? this.state.message : "";
    if (document.getElementById("message").textContent !== message)
      document.getElementById("message").textContent = message;
  }
}
