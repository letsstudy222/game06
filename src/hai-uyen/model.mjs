import {
  TILE,
  center,
  distance,
  canOccupy,
  move,
  inTrigger,
  navigation,
} from "./maps.mjs";
export const SKILLS = {
  basic: { cd: 0.45, name: "Vây kích" },
  k1: { cd: 3, name: "Thủy Kích" },
  k2: { cd: 10, name: "Hồi Lưu Toàn" },
  k3: { cd: 24, name: "Thủy Mạch Ấn" },
  k4: { cd: 18, name: "Trấn Hải Ba" },
  guard: { cd: 7, name: "Thủ Mai" },
};
export const ROOM_NAMES = {
  "VS-A1": "Buồng Thức Mai Cổ",
  "VS-B1": "Rạn Ánh Dịu",
  "VS-LAB": "Phòng Thử Thủy Lưu",
  "VS-ARENA": "Sân Thủ Hộ",
};
const BOSS_FLAG = "vs.arena.boss_defeated",
  DEFEAT_RECEIPT = "vs.encounter.cua_giap_thuy.defeat.v1";
const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
export class HaiUyenGame {
  constructor(maps, store = null) {
    this.maps = maps;
    this.store = store;
    this.time = 0;
    this.flags = {};
    this.receipts = [];
    this.tokens = 0;
    this.cooldowns = Object.fromEntries(Object.keys(SKILLS).map((k) => [k, 0]));
    this.buffUntil = 0;
    this.guardUntil = 0;
    this.guardStart = -100;
    this.guardEmpowered = false;
    this.guardHeal = 0;
    this.empowered = false;
    this.globalUntil = 0;
    this.hitLedger = new Map();
    this.invulnerableUntil = 0;
    this.room = "VS-A1";
    this.player = {
      ...center(maps[this.room].entities.find((e) => e.id === "spawn_quy")),
      hp: 100,
      angle: -Math.PI / 2,
      moving: false,
    };
    this.checkpoint = { room: this.room, x: this.player.x, y: this.player.y };
    this.restEpoch = 0;
    this.roomEnemies = {};
    this.paused = false;
    this.environment = "underwater";
    this.message = "Quy đã thức. Đến trụ ◆ và nhấn E để ghi checkpoint.";
    this.messageUntil = 8;
    this.saveWarning = "";
    this.metrics = {
      transitions: 0,
      hits: 0,
      prevented: 0,
      healed: 0,
      casts: {},
    };
    this.effects = [];
    this.projectiles = [];
    this.portalArmed = false;
    this.portalUntil = 0;
    this.encounter = false;
    this.bossLock = null;
    this.lastAutosave = 0;
    const saved = store?.load(maps);
    if (saved) {
      this.flags = saved.flags;
      this.receipts = [...new Set(saved.receipts)];
      this.tokens = saved.tokens;
      this.checkpoint = saved.checkpoint;
      this.room = saved.room;
      this.player = { ...this.player, ...saved.position, hp: saved.hp };
      const elapsed = Math.max(0, (Date.now() - saved.savedAt) / 1000);
      for (const k in this.cooldowns)
        this.cooldowns[k] = Math.max(0, (saved.cooldowns[k] || 0) - elapsed);
      this.buffUntil = Math.max(0, (saved.buff || 0) - elapsed);
      this.say("Tiếp tục hành trình đã lưu.");
    }
    if (store?.error) this.saveWarning = store.error;
    this.spawnEnemies();
  }
  get map() {
    return this.maps[this.room];
  }
  get buffed() {
    return this.time < this.buffUntil;
  }
  get guarding() {
    return this.time < this.guardUntil;
  }
  get inCombat() {
    return this.encounter || this.enemies.some((e) => e.hp > 0 && e.engaged);
  }
  get enemies() {
    return this.roomEnemies[this.room]?.actors || [];
  }
  say(s, seconds = 5) {
    this.message = s;
    this.messageUntil = this.time + seconds;
  }
  serialize(
    flags = this.flags,
    receipts = this.receipts,
    tokens = this.tokens,
  ) {
    const unsafe = this.inCombat || !canOccupy(this.map, this.player, flags);
    return {
      flags: { ...flags },
      receipts: [...receipts],
      tokens,
      room: unsafe ? this.checkpoint.room : this.room,
      position: unsafe
        ? { x: this.checkpoint.x, y: this.checkpoint.y }
        : { x: this.player.x, y: this.player.y, angle: this.player.angle },
      hp: Math.max(1, this.player.hp),
      checkpoint: { ...this.checkpoint },
      cooldowns: Object.fromEntries(
        Object.entries(this.cooldowns).map(([k, v]) => [
          k,
          Math.max(0, v - this.time),
        ]),
      ),
      buff: Math.max(0, this.buffUntil - this.time),
    };
  }
  save() {
    if (!this.store) return true;
    try {
      this.store.save(this.serialize());
      this.saveWarning = "";
      return true;
    } catch {
      this.saveWarning = this.store.error;
      return false;
    }
  }
  commit(flags, receipt = null, amount = 0) {
    if (receipt && this.receipts.includes(receipt)) return false;
    const next = { ...this.flags, ...flags },
      receipts = receipt ? [...this.receipts, receipt] : this.receipts,
      tokens = this.tokens + amount;
    if (this.store) {
      try {
        this.store.save(this.serialize(next, receipts, tokens));
        this.saveWarning = "";
      } catch {
        this.saveWarning = this.store.error;
        this.say("Chưa ghi nhận thao tác: bộ nhớ lưu không khả dụng.");
        return false;
      }
    }
    this.flags = next;
    this.receipts = receipts;
    this.tokens = tokens;
    return true;
  }
  spawnEnemies(force = false) {
    if (!force && this.roomEnemies[this.room]?.epoch === this.restEpoch) return;
    const actors = this.map.entities
      .filter(
        (e) =>
          e.type === "enemy_spawn" ||
          (e.type === "boss_spawn" && !this.flags[e.defeat_flag]),
      )
      .map((e) => ({
        id: e.id,
        archetype: e.archetype,
        boss: e.type === "boss_spawn",
        home: center(e),
        ...center(e),
        radius: e.type === "boss_spawn" ? 22 : 10,
        hp:
          e.type === "boss_spawn"
            ? 280
            : e.archetype === "ca_kem_ran"
              ? 48
              : 40,
        maxHp:
          e.type === "boss_spawn"
            ? 280
            : e.archetype === "ca_kem_ran"
              ? 48
              : 40,
        engaged: false,
        state: "idle",
        timer: 1,
        cycle: 0,
        attackId: 0,
        angle: 0,
        phase: 1,
        navKey: "",
        nav: null,
        leash: (e.leash_radius_tiles || 15) * TILE,
        aggro: (e.aggro_radius_tiles || 0) * TILE,
      }));
    this.roomEnemies[this.room] = { epoch: this.restEpoch, actors };
  }
  interact() {
    const near = this.map.entities
      .filter(
        (e) =>
          [
            "checkpoint",
            "rest_marker",
            "lore_shrine",
            "optional_lore",
            "secret_cache",
            "guidance_marker",
            "future_portal_stub",
          ].includes(e.type) &&
          e.x !== undefined &&
          distance(this.player, center(e)) <=
            (e.interact_radius_tiles || 2) * TILE,
      )
      .sort(
        (a, b) =>
          distance(this.player, center(a)) - distance(this.player, center(b)),
      );
    const e = near[0];
    if (!e) {
      this.say("Đến gần vật thể viền vàng rồi nhấn E.");
      return false;
    }
    if (e.type === "checkpoint" || e.type === "rest_marker") {
      if (this.inCombat) {
        this.say("Cần thoát giao tranh trước khi nghỉ.");
        return false;
      }
      const prior = { ...this.checkpoint },
        hp = this.player.hp;
      this.checkpoint = { room: this.room, ...center(e) };
      this.player.hp = 100;
      if (!this.commit({ [e.state_flag]: true })) {
        this.checkpoint = prior;
        this.player.hp = hp;
        return false;
      }
      this.restEpoch++;
      this.say(
        "Đã ghi checkpoint • Sinh lực phục hồi • Quái rạn trở lại sau khi rời phòng.",
      );
      return true;
    }
    if (e.type === "secret_cache") {
      if (
        this.room === "VS-ARENA" &&
        (!this.flags[BOSS_FLAG] || !this.receipts.includes(DEFEAT_RECEIPT))
      ) {
        this.say("Cần chiến thắng Cua Giáp Thủy.");
        return false;
      }
      if (this.flags[e.state_flag] || this.receipts.includes(e.receipt_id)) {
        this.say("Rương đã nhận; biên nhận được giữ.");
        return false;
      }
      if (this.commit({ [e.state_flag]: true }, e.receipt_id, 1)) {
        this.say("Nhận một mảnh lưu ký • Đã lưu biên nhận một lần.");
        return true;
      }
      return false;
    }
    if (e.type === "future_portal_stub") {
      this.say("Cửa cổ chưa nối tuyến. Quay về LAB bằng lối Tây.");
      return false;
    }
    if (e.type === "guidance_marker") {
      this.say(
        this.room === "VS-LAB"
          ? "K1 bắn van A phía Bắc → K2 đặt tâm ở bộ ổn định phía Nam."
          : "Đọc dấu càng, tránh đường lao; chặn đúng nhịp để nhận Hồi Thủy.",
      );
      return true;
    }
    const lore = {
      shrine_shell: "Dư âm: Một dòng đi vào. Một dòng cần trở về.",
      lore_fragment_a: "Mảnh văn: Mai giữ nhịp nước, không giữ nước đứng yên.",
      optional_lore_north:
        "Rạn sáng nhờ dòng hồi lưu. Dấu tích này chưa giải đáp nguồn nhiễu động.",
      lore_pressure_log:
        "Nhật ký áp: Nạp van phía Bắc bằng xung nước; ổn định bộ hồi phía Nam bằng tâm hút.",
      memorial_tablet:
        "Bảng lưu ký thử nghiệm: Áp đã lắng. Đường quay về vẫn mở.",
    };
    if (
      e.state_flag &&
      !this.flags[e.state_flag] &&
      !this.commit({ [e.state_flag]: true })
    )
      return false;
    this.say(lore[e.id] || "Dấu dẫn lưu hướng về phía Đông.", 8);
    return true;
  }
  cast(key, aim = null) {
    if (
      this.paused ||
      !(key in SKILLS) ||
      this.player.hp <= 0 ||
      this.time < this.cooldowns[key] ||
      this.time < this.globalUntil
    )
      return false;
    if (aim) {
      const d = distance(this.player, aim);
      if (d > 1)
        this.player.angle = Math.atan2(
          aim.y - this.player.y,
          aim.x - this.player.x,
        );
    }
    const empowered =
      this.empowered && ["k1", "k2", "k4", "guard"].includes(key);
    if (empowered) this.empowered = false;
    this.cooldowns[key] = this.time + SKILLS[key].cd;
    this.globalUntil = this.time + 0.16;
    this.metrics.casts[key] = (this.metrics.casts[key] || 0) + 1;
    const enhanced = this.buffed || empowered,
      angle = this.player.angle,
      origin = { x: this.player.x, y: this.player.y };
    if (key === "k3") {
      this.buffUntil = this.time + 8;
      this.say("Thủy Mạch • 8 giây • Vân sáng bám trên mai.");
    }
    if (key === "guard") {
      this.guardUntil = this.time + 1;
      this.guardStart = this.time;
      this.guardEmpowered = enhanced;
      this.guardHeal = 0;
    }
    if (key === "basic") {
      this.effects.push({
        type: "basic",
        ...origin,
        angle,
        age: 0,
        duration: 0.22,
      });
      for (const e of this.enemies)
        if (
          e.hp > 0 &&
          distance(origin, e) <= 64 + e.radius &&
          Math.abs(
            angleDiff(Math.atan2(e.y - origin.y, e.x - origin.x), angle),
          ) < 1.15
        )
          this.hurtEnemy(e, 12);
    }
    if (key === "k1")
      this.projectiles.push({
        ...origin,
        angle,
        speed: 420,
        range: 320,
        travel: 0,
        enhanced,
        damage: enhanced ? 30 : 22,
        hits: new Set(),
        radius: enhanced ? 10 : 6,
      });
    if (key === "k2") {
      const desired = aim || {
        x: origin.x + Math.cos(angle) * 130,
        y: origin.y + Math.sin(angle) * 130,
      };
      let d = distance(origin, desired),
        scale = Math.min(1, 190 / Math.max(1, d));
      let c = {
        x: origin.x + (desired.x - origin.x) * scale,
        y: origin.y + (desired.y - origin.y) * scale,
      };
      // Receiver must be in range and line-of-sight. Ground target cannot tunnel through a wall.
      const endpoint = move(
        this.map,
        origin,
        c.x - origin.x,
        c.y - origin.y,
        this.flags,
        2,
      );
      if (distance(endpoint, c) > 4) c = endpoint;
      this.effects.push({
        type: "vortex",
        ...c,
        age: 0,
        duration: 3,
        radius: 82,
        enhanced,
        tick: 0,
        hits: new Set(),
        pulse: false,
      });
      for (const e of this.map.entities.filter(
        (e) => e.required_action === "quy.k2.area_center_over_target",
      ))
        if (distance(c, center(e)) <= 24) {
          if (!this.flags[e.requires_flag])
            this.say("Van A cần nhận K1 trước.");
          else if (
            !this.flags[e.state_flag] &&
            this.commit({ [e.state_flag]: true })
          ) {
            this.say("Hồi lưu ổn định • Cổng áp lực đã mở.");
            for (const a of this.enemies) a.navKey = "";
          }
        }
    }
    if (key === "k4")
      this.effects.push({
        type: "radial",
        ...origin,
        age: 0,
        duration: 1.2,
        radius: 145,
        enhanced,
        hits: new Set(),
        hits2: new Set(),
      });
    this.save();
    return true;
  }
  hurtEnemy(e, damage) {
    if (e.hp <= 0 || (e.boss && !this.encounter)) return;
    e.hp = Math.max(0, e.hp - damage);
    this.effects.push({ type: "hit", x: e.x, y: e.y, age: 0, duration: 0.25 });
    if (e.boss && e.hp === 0) {
      if (!this.commit({ [BOSS_FLAG]: true }, DEFEAT_RECEIPT)) {
        e.hp = 1;
        return;
      }
      this.encounter = false;
      this.bossLock = null;
      this.say(
        "Cua Giáp Thủy đã lùi • Cổng Đông mở • Nhận lưu ký rồi trở về.",
        9,
      );
    }
  }
  damage(amount, source) {
    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      typeof source !== "string" ||
      !source ||
      this.player.hp <= 0 ||
      this.time < this.invulnerableUntil ||
      this.hitLedger.has(source)
    )
      return 0;
    this.hitLedger.set(source, this.time);
    this.metrics.hits++;
    const baseline = amount * 0.85,
      prevented = this.guarding ? baseline * 0.8 : 0;
    if (prevented > 0) {
      this.metrics.prevented += prevented;
      if (this.time - this.guardStart <= 0.25) {
        this.empowered = true;
        this.say("Hồi Thủy • Kỹ năng kế tiếp được cường hóa.");
      }
    }
    this.player.hp = Math.max(0, this.player.hp - (baseline - prevented));
    if (prevented > 0 && this.guardEmpowered) {
      const heal = Math.min(
        prevented * 0.4,
        8 - this.guardHeal,
        100 - this.player.hp,
      );
      this.player.hp += heal;
      this.guardHeal += heal;
      this.metrics.healed += heal;
    }
    this.invulnerableUntil = this.time + 0.5;
    if (this.player.hp <= 0) this.respawn();
    else this.save();
    return baseline - prevented;
  }
  respawn() {
    this.player.hp = 100;
    this.encounter = false;
    this.bossLock = null;
    this.room = this.checkpoint.room;
    Object.assign(this.player, { x: this.checkpoint.x, y: this.checkpoint.y });
    this.buffUntil = 0;
    this.guardUntil = 0;
    this.empowered = false;
    this.projectiles = [];
    this.effects = [];
    this.restEpoch++;
    this.spawnEnemies(true);
    this.portalArmed = false;
    this.portalUntil = this.time + 0.3;
    this.say(
      "Trở về checkpoint • Tiến trình van, ký ức và phần thưởng được giữ.",
    );
    this.save();
  }
  transition(e) {
    if (this.time < this.portalUntil || !this.portalArmed) return false;
    const exit = this.map.exits.find((x) => x.id === e.id);
    if (exit?.requires_flag && !this.flags[exit.requires_flag]) {
      this.say("Ổn định hồi lưu trước khi đi tiếp.");
      return false;
    }
    const target = this.maps[e.target],
      a = target?.entities.find((a) => a.id === e.entry_anchor);
    if (!a || !canOccupy(target, center(a), this.flags)) {
      this.say("Cửa chưa sẵn sàng; vị trí đích không an toàn.");
      return false;
    }
    // Retreat resets the attempt, never its cooldown obligations or completed flags.
    if (this.encounter) {
      this.encounter = false;
      this.bossLock = null;
      delete this.roomEnemies[this.room];
    }
    for (const enemy of this.enemies) {
      enemy.engaged = false;
      enemy.state = "idle";
      enemy.timer = 1;
    }
    this.room = e.target;
    Object.assign(this.player, center(a), {
      angle:
        { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[a.facing] ?? 0,
    });
    this.effects = [];
    this.projectiles = [];
    this.guardUntil = 0;
    this.portalArmed = false;
    this.portalUntil = this.time + 0.25;
    this.spawnEnemies();
    this.metrics.transitions++;
    this.say(ROOM_NAMES[this.room]);
    this.save();
    return true;
  }
  update(dt, input = {}) {
    if (this.paused) return;
    dt = Math.min(Math.max(dt, 0), 0.05);
    this.time += dt;
    for (const [id, t] of this.hitLedger)
      if (this.time - t > 10) this.hitLedger.delete(id);
    let dx = input.x || 0,
      dy = input.y || 0,
      len = Math.hypot(dx, dy);
    if (len > 1) {
      dx /= len;
      dy /= len;
    }
    this.player.moving = len > 0.01;
    const speed = this.guarding ? 52 : 145;
    Object.assign(
      this.player,
      move(this.map, this.player, dx * speed * dt, dy * speed * dt, this.flags),
    );
    if (input.aim && distance(this.player, input.aim) > 3)
      this.player.angle = Math.atan2(
        input.aim.y - this.player.y,
        input.aim.x - this.player.x,
      );
    else if (len > 0.01) this.player.angle = Math.atan2(dy, dx);
    for (const key of input.actions || []) this.cast(key, input.aim);
    if (input.interact) this.interact();
    this.updateProjectiles(dt);
    this.updateEffects(dt);
    this.updateEnemies(dt);
    const trigger = this.map.entities.find(
      (e) => e.type === "encounter_trigger",
    );
    if (trigger && !this.flags[BOSS_FLAG] && !this.encounter) {
      const [x, y, w, h] = trigger.rect,
        p = this.player;
      if (
        p.x >= x * TILE &&
        p.x < (x + w) * TILE &&
        p.y >= y * TILE &&
        p.y < (y + h) * TILE
      ) {
        this.encounter = true;
        this.bossLock = { active: "quy", membership: ["quy", null] };
        const b = this.enemies.find((e) => e.boss);
        if (b) {
          b.engaged = true;
          b.state = "idle";
          b.timer = 1;
        }
        this.say("Cua Giáp Thủy • Đọc cảnh báo trên sàn • Lối Tây luôn mở.");
      }
    }
    const portals = this.map.entities.filter((e) => e.type === "transition"),
      inside = portals.find((e) => inTrigger(this.player, e));
    if (!inside && this.time >= this.portalUntil) this.portalArmed = true;
    if (inside) this.transition(inside);
    if (this.time - this.lastAutosave >= 2) {
      this.lastAutosave = this.time;
      this.save();
    }
  }
  updateProjectiles(dt) {
    for (const p of this.projectiles) {
      let removed = false;
      const n = Math.ceil((p.speed * dt) / 2),
        step = (p.speed * dt) / n;
      for (let i = 0; i < n && !removed; i++) {
        p.x += Math.cos(p.angle) * step;
        p.y += Math.sin(p.angle) * step;
        p.travel += step;
        if (
          !canOccupy(this.map, p, this.flags, p.radius) ||
          p.travel > p.range
        ) {
          removed = true;
          break;
        }
        for (const v of this.map.entities.filter(
          (e) => e.required_action === "quy.k1.water_impact",
        ))
          if (
            !this.flags[v.state_flag] &&
            distance(p, center(v)) < 20 + p.radius
          ) {
            if (this.commit({ [v.state_flag]: true }))
              this.say("Van A đã nạp • Đặt tâm K2 lên bộ ổn định phía Nam.");
            removed = true;
          }
        for (const e of this.enemies)
          if (
            e.hp > 0 &&
            !p.hits.has(e.id) &&
            distance(p, e) < e.radius + p.radius
          ) {
            p.hits.add(e.id);
            this.hurtEnemy(e, p.damage);
            if (!p.enhanced || p.hits.size >= 3) removed = true;
          }
      }
      p.dead = removed;
    }
    this.projectiles = this.projectiles.filter((p) => !p.dead);
  }
  updateEffects(dt) {
    for (const f of this.effects) {
      f.age += dt;
      if (f.type === "vortex") {
        f.tick += dt;
        for (const e of this.enemies)
          if (e.hp > 0 && distance(f, e) < f.radius + e.radius) {
            if (!e.boss) {
              const d = distance(f, e);
              if (d > 5)
                Object.assign(
                  e,
                  move(
                    this.map,
                    e,
                    ((f.x - e.x) / d) * 55 * dt,
                    ((f.y - e.y) / d) * 55 * dt,
                    this.flags,
                    e.radius,
                  ),
                );
            }
            if (f.tick >= 0.5 - 1e-9) this.hurtEnemy(e, f.enhanced ? 6 : 4);
          }
        if (f.tick >= 0.5 - 1e-9) f.tick = Math.max(0, f.tick - 0.5);
        if (f.enhanced && !f.pulse && f.age >= 2.6) {
          f.pulse = true;
          for (const e of this.enemies)
            if (distance(f, e) < f.radius + e.radius) this.hurtEnemy(e, 14);
        }
      }
      if (f.type === "radial") {
        const waves = [
          { delay: 0, hits: f.hits },
          ...(f.enhanced ? [{ delay: 0.4, hits: f.hits2 }] : []),
        ];
        for (const w of waves) {
          const age = f.age - w.delay;
          if (age < 0 || age > 0.8) continue;
          const r = Math.min(f.radius, (age / 0.8) * f.radius);
          for (const e of this.enemies)
            if (
              e.hp > 0 &&
              !w.hits.has(e.id) &&
              Math.abs(distance(f, e) - r) < e.radius + 12
            ) {
              w.hits.add(e.id);
              this.hurtEnemy(e, 24);
            }
        }
      }
    }
    this.effects = this.effects.filter((f) => f.age < f.duration);
  }
  updateEnemies(dt) {
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      if (e.boss) {
        if (!this.encounter) continue;
        e.phase = e.hp / e.maxHp <= 0.55 ? 2 : 1;
      } else if (
        distance(this.player, e.home) < e.aggro &&
        distance(this.player, e) < e.aggro
      )
        e.engaged = true;
      if (!e.boss && distance(this.player, e.home) > e.leash) {
        e.engaged = false;
        e.state = "return";
        e.timer = 1;
      }
      if (e.state === "return") {
        this.navigateEnemy(e, e.home, dt, 65);
        if (distance(e, e.home) < 12) {
          e.hp = e.maxHp;
          e.state = "idle";
        }
        continue;
      }
      if (!e.engaged) continue;
      e.timer -= dt;
      if (e.state === "windup" && e.timer <= 0) {
        e.state = "strike";
        e.timer = e.kind === "charge" ? 0.65 : 0.2;
        e.attackId++;
      }
      if (e.state === "strike") {
        if (e.kind === "charge")
          Object.assign(
            e,
            move(
              this.map,
              e,
              Math.cos(e.angle) * 280 * dt,
              Math.sin(e.angle) * 280 * dt,
              this.flags,
              e.radius,
            ),
          );
        if (this.attackHits(e, this.player))
          this.damage(
            e.boss ? 22 : 12,
            `${this.room}:${e.id}:${e.cycle}:${e.attackId}`,
          );
        if (e.timer <= 0) {
          e.state = "recover";
          e.timer = e.boss ? 1.4 : 1;
        }
        continue;
      }
      if (e.state === "recover") {
        if (e.timer <= 0) {
          e.state = "idle";
          e.timer = 0.4;
        }
        continue;
      }
      if (e.state === "windup") continue;
      const d = distance(e, this.player),
        reach = e.boss ? 230 : e.archetype === "sua_hoi_luu" ? 155 : 65;
      if (d > reach) this.navigateEnemy(e, this.player, dt, e.boss ? 60 : 72);
      if (d <= reach && e.timer <= 0) {
        e.cycle++;
        e.angle = Math.atan2(this.player.y - e.y, this.player.x - e.x);
        e.kind = e.boss
          ? ["sweep", "charge", ...(e.phase === 2 ? ["ring"] : [])][
              (e.cycle - 1) % (e.phase === 2 ? 3 : 2)
            ]
          : e.archetype === "sua_hoi_luu"
            ? "pool"
            : "sweep";
        e.target = { x: this.player.x, y: this.player.y };
        e.state = "windup";
        e.timer = e.boss ? 1.05 : 0.8;
      }
    }
  }
  navigateEnemy(e, goal, dt, speed) {
    const key = `${Math.floor(goal.x / TILE)},${Math.floor(goal.y / TILE)}:${!!this.flags["vs.lab.valve_b_stable"]}:${!!this.flags[BOSS_FLAG]}`;
    if (e.navKey !== key) {
      e.navKey = key;
      e.nav = navigation(this.map, goal, this.flags, e.radius);
    }
    const currentCell = {
        x: Math.floor(e.x / TILE),
        y: Math.floor(e.y / TILE),
      },
      cellCenter = center(currentCell);
    // Reach the cell center before following a cardinal edge, avoiding diagonal wall corners.
    let target =
      distance(e, cellCenter) > 2
        ? cellCenter
        : e.nav.get(`${currentCell.x},${currentCell.y}`) || goal;
    // If already on the path to next center, don't oscillate back to current center.
    if (e.navTarget && distance(e, e.navTarget) > 2 && e.navTargetKey === key)
      target = e.navTarget;
    else {
      e.navTarget = target;
      e.navTargetKey = key;
    }
    const d = distance(e, target);
    if (d > 1) {
      const amount = Math.min(d, speed * dt);
      Object.assign(
        e,
        move(
          this.map,
          e,
          ((target.x - e.x) / d) * amount,
          ((target.y - e.y) / d) * amount,
          this.flags,
          e.radius,
        ),
      );
    }
  }
  attackHits(e, p) {
    const d = distance(e, p);
    if (e.kind === "pool") return distance(e.target, p) <= 56 + 10;
    if (e.kind === "ring") return d >= 72 - 10 && d <= 135 + 10;
    if (e.kind === "charge") return d <= e.radius + 20;
    return (
      d < (e.boss ? 100 : 58) + 10 &&
      Math.abs(angleDiff(Math.atan2(p.y - e.y, p.x - e.x), e.angle)) < 1.05
    );
  }
  objective() {
    if (this.room === "VS-A1")
      return "Trụ ◆: E ghi checkpoint • Cổng Đông Bắc → Rạn";
    if (this.room === "VS-B1")
      return "Theo dòng Đông → LAB • Nhánh phụ có ký ức và lưu ký";
    if (this.room === "VS-LAB")
      return !this.flags["vs.lab.valve_a_primed"]
        ? "Van A phía Bắc: ngắm rồi bắn K1 (1)"
        : !this.flags["vs.lab.valve_b_stable"]
          ? "Bộ ổn định phía Nam: đặt tâm K2 (2) lên cơ cấu"
          : "Cổng áp đã mở • Checkpoint ◆ trước cổng → ARENA";
    return this.flags[BOSS_FLAG]
      ? "Nhận lưu ký phía Đông • Quay lại LAB ở cửa Tây"
      : "Cua Giáp Thủy • Né vùng báo đòn • Space chặn đúng nhịp";
  }
  snapshot() {
    return {
      room: this.room,
      player: { ...this.player },
      flags: { ...this.flags },
      receipts: [...this.receipts],
      tokens: this.tokens,
      checkpoint: { ...this.checkpoint },
      cooldowns: Object.fromEntries(
        Object.entries(this.cooldowns).map(([k, v]) => [
          k,
          Math.max(0, v - this.time),
        ]),
      ),
      buff: this.buffed,
      guard: this.guarding,
      empowered: this.empowered,
      encounter: this.encounter,
      bossLock: this.bossLock,
      portalArmed: this.portalArmed,
      environment: this.environment,
      enemies: this.enemies.map((e) => ({
        id: e.id,
        x: e.x,
        y: e.y,
        hp: e.hp,
        state: e.state,
        kind: e.kind,
        phase: e.phase,
      })),
      metrics: structuredClone(this.metrics),
      saveWarning: this.saveWarning,
    };
  }
}
