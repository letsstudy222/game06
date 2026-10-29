/** Float follow + integer render coordinates: smooth motion without subpixel art. */
export class Camera {
  constructor(world, width = 640, height = 360) {
    this.world = world;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }
  resize(width, height, player) {
    this.width = Math.min(width, this.world.width);
    this.height = Math.min(height, this.world.height);
    this.follow(player, 0, true);
  }
  follow(player, dt, snap = false) {
    const tx = Math.max(
        0,
        Math.min(
          Math.max(0, this.world.width - this.width),
          player.x - this.width / 2,
        ),
      ),
      ty = Math.max(
        0,
        Math.min(
          Math.max(0, this.world.height - this.height),
          player.y - this.height / 2 - 18,
        ),
      );
    const a = snap ? 1 : 1 - Math.exp(-9 * dt);
    this.x += (tx - this.x) * a;
    this.y += (ty - this.y) * a;
  }
  get renderX() {
    return Math.round(this.x);
  }
  get renderY() {
    return Math.round(this.y);
  }
  snapshot() {
    return {
      x: this.renderX,
      y: this.renderY,
      width: this.width,
      height: this.height,
    };
  }
}
