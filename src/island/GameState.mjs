import { getIsland, FIRST_ISLAND } from "./islands.mjs";
import { PlayerPhoenix } from "./PlayerPhoenix.mjs";
import { SkillSystem } from "./SkillSystem.mjs";
import { distance } from "./geometry.mjs";
export class GameState {
  constructor(id = FIRST_ISLAND) {
    this.time = 0;
    this.paused = false;
    this.message = "";
    this.messageTime = 0;
    this.setIsland(id);
  }
  setIsland(id) {
    this.island = getIsland(id);
    this.player = new PlayerPhoenix(this.island.spawn);
    this.skills = new SkillSystem();
    this.targets = this.island.targets.map((t) => ({
      ...t,
      hp: t.maxHp,
      flash: 0,
      respawnIn: 0,
    }));
    this.camera = { x: 0, y: 0 };
    this.followCamera();
  }
  announce(text) {
    this.message = text;
    this.messageTime = 3;
  }
  use(name) {
    if (this.paused) return false;
    return this.skills.use(name, this.player, this.targets);
  }
  update(dt, input) {
    if (this.paused) return;
    dt = Math.max(0, Math.min(dt, 0.05));
    this.time += dt;
    this.messageTime = Math.max(0, this.messageTime - dt);
    this.player.update(dt, input, this.island);
    this.skills.update(dt, this.island, this.targets);
    if (!this.player.hovering)
      for (const h of this.island.hazards)
        if (distance(this.player, h) < h.r && this.player.damage(12))
          this.announce("Gai đá! Giữ Shift để lướt phía trên.");
    if (this.player.hp === 0) {
      this.player.respawn(this.island.spawn);
      this.announce("Nhật Diệm hồi sinh tại bãi cỏ.");
    }
    this.followCamera();
  }
  followCamera() {
    this.camera.x = Math.round(
      Math.max(0, Math.min(this.island.width - 480, this.player.x - 240)),
    );
    this.camera.y = Math.round(
      Math.max(0, Math.min(this.island.height - 270, this.player.y - 135)),
    );
  }
  snapshot() {
    return {
      island: this.island.id,
      time: this.time,
      paused: this.paused,
      player: {
        x: this.player.x,
        y: this.player.y,
        hp: this.player.hp,
        hovering: this.player.hovering,
        animation: this.player.animation.name,
        frame: this.player.animation.frame,
        facing: { ...this.player.facing },
      },
      cooldowns: { ...this.skills.cooldowns },
      projectiles: this.skills.projectiles.length,
      targets: this.targets.map((t) => ({
        id: t.id,
        x: t.x,
        y: t.y,
        hp: t.hp,
      })),
      camera: { ...this.camera },
    };
  }
}
