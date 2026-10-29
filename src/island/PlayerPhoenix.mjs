import { AnimationController } from "./AnimationController.mjs";
import { moveWithCollision } from "./geometry.mjs";
export class PlayerPhoenix {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.radius = 5;
    this.hp = 100;
    this.maxHp = 100;
    this.facing = { x: 1, y: 0 };
    this.hovering = false;
    this.moving = false;
    this.animation = new AnimationController();
    this.invulnerable = 0;
    this.sinceDamage = 0;
    this.recovery = 0;
    this.lastMove = 0;
  }
  update(dt, input, island) {
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    this.sinceDamage += dt;
    if (this.recovery > 0) {
      this.recovery = Math.max(0, this.recovery - dt);
      this.animation.set("idle");
      this.animation.update(dt);
      return;
    }
    this.hovering = !!input.hover;
    const length = Math.hypot(input.x, input.y),
      speed = this.hovering ? 84 : 64;
    const dx = length ? input.x / length : 0,
      dy = length ? input.y / length : 0;
    if (length) this.facing = { x: dx, y: dy };
    const next = moveWithCollision(
      island,
      this,
      dx * speed * dt,
      dy * speed * dt,
      this.radius,
    );
    this.moving = Math.hypot(next.x - this.x, next.y - this.y) > 0.001;
    this.lastMove = this.moving ? this.lastMove + dt : 0;
    this.x = next.x;
    this.y = next.y;
    if (
      this.animation.complete ||
      !["attack", "fire"].includes(this.animation.name)
    )
      this.animation.set(this.hovering ? "fly" : this.moving ? "move" : "idle");
    this.animation.update(dt);
    if (this.sinceDamage > 4) this.hp = Math.min(this.maxHp, this.hp + dt * 5);
  }
  damage(amount) {
    if (this.invulnerable > 0 || this.recovery > 0 || amount <= 0) return false;
    this.hp = Math.max(0, this.hp - amount);
    this.invulnerable = 1;
    this.sinceDamage = 0;
    return true;
  }
  respawn(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.hp = this.maxHp;
    this.hovering = false;
    this.moving = false;
    this.invulnerable = 2;
    this.recovery = 0.55;
    this.animation.set("idle");
  }
}
