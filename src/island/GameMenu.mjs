export class GameMenu {
  constructor(state, input, settings, layout) {
    Object.assign(this, { state, input, settings, layout });
    this.dialog = document.getElementById("game-menu");
    this.help = document.getElementById("help-dialog");
    this.editing = false;
    document.getElementById("menu").onclick = () => this.open();
    document.getElementById("pause").onclick = () => this.toggle();
    document.getElementById("resume-game").onclick = () => this.close();
    document.getElementById("open-settings").onclick = () =>
      this.show("settings");
    document.getElementById("settings-back").onclick = () => this.show("menu");
    document.getElementById("help").onclick = () => {
      this.close();
      this.openHelp();
    };
    for (const d of [this.dialog, this.help])
      d.addEventListener("cancel", (e) => {
        e.preventDefault();
        this.close();
      });
    for (const id of ["close-help", "resume"])
      document.getElementById(id).onclick = () => this.close();
    for (const field of document.querySelectorAll("[data-setting]"))
      field.addEventListener("input", () => {
        settings.update({ [field.dataset.setting]: Number(field.value) });
        this.sync();
      });
    settings.subscribe(() => this.sync());
    document.getElementById("reset-layout").onclick = () => {
      settings.reset();
      this.sync();
    };
    document.getElementById("edit-layout").onclick = () => this.edit();
    document.getElementById("finish-layout").onclick = () => this.finishEdit();
    // A completed drag can suppress the browser's compatibility click on touch.
    // Finish from the actual pointer release; the method is idempotent for clicks.
    document
      .getElementById("finish-layout")
      .addEventListener("pointerup", (e) => {
        if (e.pointerType === "touch") {
          e.preventDefault();
          this.finishEdit();
        }
      });
    this.bindDrag();
    this.sync();
  }
  sync() {
    for (const field of document.querySelectorAll("[data-setting]")) {
      const value = this.settings.value[field.dataset.setting];
      field.value = value;
      const out = document.querySelector(
        `[data-value="${field.dataset.setting}"]`,
      );
      if (out)
        out.textContent =
          field.dataset.setting === "opacity"
            ? Math.round(value * 100) + "%"
            : field.dataset.setting === "uiScale"
              ? Math.round(value * 100) + "%"
              : value + "px";
    }
    document.getElementById("save-status").textContent = this.settings.saved
      ? "Tự động lưu trên thiết bị này."
      : "Không thể lưu trên trình duyệt này; cài đặt vẫn dùng trong phiên.";
    document.getElementById("edit-layout").disabled =
      this.layout.mode !== "touch";
  }
  show(view) {
    document.getElementById("menu-view").hidden = view !== "menu";
    document.getElementById("settings-view").hidden = view !== "settings";
    document.getElementById("menu-title").textContent =
      view === "settings" ? "Cài đặt giao diện" : "Nhật Diệm";
    this.dialog.scrollTop = 0;
  }
  open() {
    if (this.editing) {
      this.finishEdit();
      return;
    }
    if (this.help.open) this.help.close();
    this.state.paused = true;
    this.input.clear();
    this.show("menu");
    this.sync();
    if (!this.dialog.open) this.dialog.showModal();
  }
  close() {
    this.dialog.close();
    this.help.close();
    this.state.paused = false;
    this.input.clear();
    this.input.focus();
  }
  toggle() {
    this.dialog.open || this.help.open ? this.close() : this.open();
  }
  openHelp() {
    if (this.editing) this.finishEdit();
    if (this.help.open) {
      this.close();
      return;
    }
    this.dialog.close();
    this.state.paused = true;
    this.input.clear();
    this.help.showModal();
  }
  edit() {
    this.dialog.close();
    this.editing = true;
    this.state.paused = true;
    this.input.clear();
    document.querySelector(".game-frame").dataset.editing = "true";
    document.getElementById("layout-editor").hidden = false;
  }
  finishEdit() {
    if (!this.editing) return;
    this.editing = false;
    delete document.querySelector(".game-frame").dataset.editing;
    document.getElementById("layout-editor").hidden = true;
    this.open();
    this.show("settings");
  }
  bindDrag() {
    for (const handle of document.querySelectorAll("[data-drag]")) {
      let drag = null;
      handle.addEventListener("pointerdown", (e) => {
        if (!this.editing) return;
        e.preventDefault();
        const group = handle.parentElement;
        drag = {
          id: e.pointerId,
          x: e.clientX,
          y: e.clientY,
          left: parseFloat(group.style.left),
          top: parseFloat(group.style.top),
        };
        handle.setPointerCapture(e.pointerId);
      });
      handle.addEventListener("pointermove", (e) => {
        if (drag?.id !== e.pointerId) return;
        this.layout.savePosition(
          handle.dataset.drag,
          drag.left + e.clientX - drag.x,
          drag.top + e.clientY - drag.y,
        );
      });
      const end = (e) => {
        if (drag?.id === e.pointerId) drag = null;
      };
      for (const event of ["pointerup", "pointercancel", "lostpointercapture"])
        handle.addEventListener(event, end);
    }
  }
}
