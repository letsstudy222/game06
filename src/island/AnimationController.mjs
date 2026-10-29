export const PHOENIX_ANIMATIONS = Object.freeze({
  idle: { row: 0, frames: 4, fps: 4, loop: true },
  move: { row: 1, frames: 4, fps: 8, loop: true },
  fly: { row: 2, frames: 4, fps: 8, loop: true },
  attack: { row: 3, frames: 4, fps: 14, loop: false },
  fire: { row: 4, frames: 4, fps: 10, loop: false },
  hurt: { row: 5, frames: 4, fps: 12, loop: false },
});
export class AnimationController {
  constructor(animations = PHOENIX_ANIMATIONS) {
    this.animations = animations;
    this.name = "idle";
    this.elapsed = 0;
  }
  set(name, restart = false) {
    if (!this.animations[name]) throw new Error(`Unknown animation: ${name}`);
    if (name !== this.name || restart) {
      this.name = name;
      this.elapsed = 0;
    }
  }
  update(dt) {
    this.elapsed += dt;
  }
  get frame() {
    const a = this.animations[this.name],
      index = Math.floor(this.elapsed * a.fps);
    return a.loop ? index % a.frames : Math.min(a.frames - 1, index);
  }
  get row() {
    return this.animations[this.name].row;
  }
  get complete() {
    const a = this.animations[this.name];
    return !a.loop && this.elapsed >= a.frames / a.fps;
  }
}
