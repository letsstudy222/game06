import { distance, canOccupy } from "./geometry.mjs";
export const SKILLS = Object.freeze({
  attack: { cooldown: 0.38, damage: 1, range: 38 },
  fire: { cooldown: 1.8, damage: 3, range: 170, speed: 200 },
});
export class SkillSystem {
  constructor() {
    this.cooldowns = { attack: 0, fire: 0 };
    this.projectiles = [];
    this.effects = [];
    this.nextId = 1;
  }
  use(name, player, targets) {
    const skill = SKILLS[name];
    if (
      !skill ||
      this.cooldowns[name] > 0 ||
      player.recovery > 0 ||
      player.hp <= 0
    )
      return false;
    this.cooldowns[name] = skill.cooldown;
    player.animation.set(name, true);
    const direction = { ...player.facing };
    if (name === "attack") {
      this.effects.push({
        type: "slash",
        x: player.x,
        y: player.y - 7,
        direction,
        life: 0.22,
        maxLife: 0.22,
      });
      for (const target of targets) {
        const d = distance(player, target),
          dot = d
            ? ((target.x - player.x) * direction.x +
                (target.y - player.y) * direction.y) /
              d
            : 1;
        if (target.hp > 0 && d <= skill.range && dot > 0.15)
          this.hit(target, skill.damage);
      }
    } else
      this.projectiles.push({
        id: this.nextId++,
        x: player.x + direction.x * 12,
        y: player.y + direction.y * 12,
        dx: direction.x,
        dy: direction.y,
        traveled: 0,
        charge: 0.16,
        owner: player,
        life: skill.range / skill.speed,
      });
    return true;
  }
  hit(target, damage) {
    if (target.hp <= 0) return;
    target.hp = Math.max(0, target.hp - damage);
    target.flash = 0.15;
    target.respawnIn = target.hp === 0 ? 9 : 0;
    this.effects.push({
      type: "burst",
      x: target.x,
      y: target.y - 8,
      life: 0.35,
      maxLife: 0.35,
    });
  }
  update(dt, island, targets) {
    for (const key of Object.keys(this.cooldowns))
      this.cooldowns[key] = Math.max(0, this.cooldowns[key] - dt);
    for (const target of targets) {
      target.flash = Math.max(0, target.flash - dt);
      if (target.hp === 0) {
        target.respawnIn -= dt;
        if (target.respawnIn <= 0) target.hp = target.maxHp;
      }
    }
    for (const p of this.projectiles) {
      let stepTime = dt;
      if (p.charge > 0) {
        const consumed = Math.min(p.charge, dt);
        p.charge -= consumed;
        stepTime -= consumed;
        p.x = p.owner.x + p.dx * 18;
        p.y = p.owner.y + p.dy * 18;
        if (stepTime <= 0) continue;
      }
      const amount = Math.min(
          SKILLS.fire.speed * stepTime,
          Math.max(0, SKILLS.fire.range - p.traveled),
        ),
        steps = Math.max(1, Math.ceil(amount / 3));
      for (let i = 0; i < steps && p.life > 0; i++) {
        p.x += (p.dx * amount) / steps;
        p.y += (p.dy * amount) / steps;
        p.traveled += amount / steps;
        const target = targets.find((t) => t.hp > 0 && distance(p, t) < 11);
        if (target) {
          this.hit(target, SKILLS.fire.damage);
          p.life = 0;
        } else if (!canOccupy(island, p, 2)) {
          this.effects.push({
            type: "burst",
            x: p.x,
            y: p.y - 7,
            life: 0.25,
            maxLife: 0.25,
          });
          p.life = 0;
        }
      }
      p.life -= stepTime;
      if (p.traveled >= SKILLS.fire.range) p.life = 0;
    }
    this.projectiles = this.projectiles.filter((p) => p.life > 0);
    for (const effect of this.effects) effect.life -= dt;
    this.effects = this.effects.filter((e) => e.life > 0);
  }
}
