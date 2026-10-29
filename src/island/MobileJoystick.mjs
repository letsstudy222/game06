export function joystickVector(dx, dy, radius, deadZone = 0.16) {
  const n = Math.hypot(dx, dy);
  if (n < radius * deadZone) return { x: 0, y: 0 };
  const angle = (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * Math.PI) / 4;
  return { x: Math.cos(angle), y: Math.sin(angle) };
}
export class MobileJoystick {
  constructor(element, input) {
    this.element = element;
    this.input = input;
    this.pointer = null;
    this.knob = element.querySelector("i");
    input.resetters.push(() => this.reset());
    element.addEventListener("pointerdown", (e) => {
      if (input.state.paused || this.pointer !== null) return;
      e.preventDefault();
      this.pointer = e.pointerId;
      element.setPointerCapture(e.pointerId);
      this.move(e);
      input.focus();
    });
    element.addEventListener("pointermove", (e) => {
      if (e.pointerId === this.pointer) this.move(e);
    });
    for (const event of ["pointerup", "pointercancel", "lostpointercapture"])
      element.addEventListener(event, (e) => {
        if (e.pointerId === this.pointer) this.reset();
      });
  }
  move(e) {
    const r = this.element.getBoundingClientRect(),
      dx = e.clientX - r.left - r.width / 2,
      dy = e.clientY - r.top - r.height / 2,
      radius = r.width * 0.32,
      n = Math.hypot(dx, dy);
    this.input.pad = joystickVector(dx, dy, radius);
    this.knob.style.transform = `translate(${dx / Math.max(1, n / radius)}px,${dy / Math.max(1, n / radius)}px)`;
  }
  reset() {
    const id = this.pointer;
    this.pointer = null;
    this.input.pad = { x: 0, y: 0 };
    this.knob.style.transform = "translate(0,0)";
    if (id !== null && this.element.hasPointerCapture(id))
      this.element.releasePointerCapture(id);
  }
}
