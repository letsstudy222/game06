const test = require("node:test");
const assert = require("node:assert/strict");
const { World, CROPS, QUESTS, KEY } = require("../world.js");

test("complete crop lifecycle: till, plant, water, sleep, harvest, sell", () => {
  const w = new World();
  const coins = w.s.coins;
  assert.match(w.plot(0, "seed"), /cuốc/);
  assert.equal(w.s.seeds.radish, 6);
  w.plot(0, "hoe");
  w.plot(0, "seed");
  assert.equal(w.s.seeds.radish, 5);
  w.sleep();
  assert.equal(w.s.plots[0].growth, 0, "unwatered plants do not grow");
  w.plot(0, "water");
  const energy = w.s.energy;
  w.plot(0, "water");
  assert.equal(w.s.energy, energy, "watering twice costs nothing");
  w.sleep();
  assert.equal(w.s.plots[0].growth, 1);
  assert.equal(w.s.energy, 100);
  w.plot(0, "hand");
  assert.equal(w.s.bag.radish, 1);
  assert.equal(w.s.plots[0].crop, null);
  assert.equal(w.s.stats.harvested, 1);
  w.s.bag.fruit = 0;
  w.sell();
  assert.equal(w.s.coins, coins + CROPS.radish.price);
});
test("rain irrigates existing and newly planted crops; growth pauses without water", () => {
  const w = new World();
  w.plot(0, "hoe");
  w.plot(0, "seed");
  w.sleep();
  w.sleep();
  w.sleep();
  assert.equal(w.s.day, 4);
  assert.equal(w.weather, "rain");
  assert.equal(w.s.plots[0].watered, true);
  w.plot(1, "hoe");
  w.plot(1, "seed");
  assert.equal(w.s.plots[1].watered, true);
  w.sleep();
  assert.equal(w.s.plots[0].growth, 1);
  assert.equal(w.s.plots[1].growth, 1);
});
test("different crops require their documented number of watered nights", () => {
  for (const key of Object.keys(CROPS)) {
    const w = new World();
    w.s.seeds[key] = 1;
    w.s.chosenSeed = key;
    w.plot(0, "hoe");
    w.plot(0, "seed");
    for (let d = 0; d < CROPS[key].days; d++) {
      w.plot(0, "water");
      w.sleep();
    }
    w.plot(0, "hand");
    assert.equal(w.s.bag[key], 1, key);
  }
});
test("economy cannot buy without funds; selling preserves building wood", () => {
  const w = new World();
  w.s.coins = 0;
  const before = w.s.seeds.pumpkin;
  w.buy("pumpkin");
  assert.equal(w.s.seeds.pumpkin, before);
  assert.equal(w.s.coins, 0);
  w.s.bag.wood = 8;
  w.s.bag.carrot = 2;
  w.s.bag.fruit = 0;
  w.sell();
  assert.equal(w.s.coins, 130);
  assert.equal(w.s.bag.wood, 8);
  w.sell();
  assert.equal(w.s.coins, 130);
});
test("energy, food, upgraded watering and once-per-day phoenix spell", () => {
  const w = new World();
  w.s.energy = 0;
  w.plot(0, "hoe");
  assert.equal(w.s.plots[0].tilled, false);
  w.eat();
  assert.equal(w.s.energy, 25);
  assert.equal(w.s.bag.fruit, 1);
  w.plot(0, "hoe");
  w.plot(0, "seed");
  w.s.coins = 180;
  w.upgrade();
  const e = w.s.energy;
  w.plot(0, "water");
  assert.equal(w.s.energy, e - 1);
  w.s.energy = 30;
  w.pet();
  assert.equal(w.s.energy, 40);
  w.pet();
  assert.equal(w.s.energy, 40);
  w.sleep();
  w.s.energy = 30;
  w.pet();
  assert.equal(w.s.energy, 40);
});
test("forage, friendship and daily rewards cannot be duplicated", () => {
  const w = new World();
  w.forage(2);
  w.forage(2);
  assert.equal(w.s.bag.wood, 3);
  w.talk();
  w.talk();
  assert.equal(w.s.stats.friendship, 1);
  w.gift();
  w.gift();
  assert.equal(w.s.stats.friendship, 2);
  w.sleep();
  w.forage(2);
  assert.equal(w.s.bag.wood, 6);
  w.talk();
  assert.equal(w.s.stats.friendship, 3);
});
test("quest claims and restoration are idempotent and spend only valid resources", () => {
  const w = new World();
  const c = w.s.coins;
  w.claim("first");
  assert.equal(w.s.coins, c);
  w.s.stats.planted = 3;
  w.s.stats.watered = 3;
  w.claim("first");
  assert.equal(w.s.coins, c + 60);
  w.claim("first");
  assert.equal(w.s.coins, c + 60);
  w.restore();
  assert.equal(w.s.restored, false);
  w.s.coins = 400;
  w.s.bag.wood = 8;
  w.restore();
  assert.equal(w.s.coins, 50);
  assert.equal(w.s.bag.wood, 0);
  assert.equal(w.s.restored, true);
  w.restore();
  assert.equal(w.s.coins, 50);
  w.claim("village");
  assert.equal(w.s.coins, 250);
});
test("full chapter can be completed by normal farming, fishing, friendship and foraging", () => {
  const w = new World();
  for (let d = 0; d < 3; d++) {
    w.talk();
    for (const i of [2, 3, 4, 5]) w.forage(i);
    for (let i = 0; i < 6; i++) {
      if (!w.s.plots[i].tilled) w.plot(i, "hoe");
      if (w.s.plots[i].crop) w.plot(i, "hand");
      if (!w.s.plots[i].crop && w.s.seeds.radish === 0) w.buy("radish");
      if (!w.s.plots[i].crop) w.plot(i, "seed");
      w.plot(i, "water");
    }
    w.sleep();
    for (let i = 0; i < 6; i++) w.plot(i, "hand");
    w.sell();
    for (const q of QUESTS) w.claim(q.id);
  }
  for (let i = 0; i < 3; i++) {
    assert.equal(w.spend(3), true);
    w.fish(true);
  }
  w.claim("fish");
  w.sell();
  w.restore();
  w.claim("village");
  assert.equal(w.s.restored, true);
  assert.equal(w.s.claims.length, 5);
  assert(w.s.coins >= 0);
  assert(w.s.energy >= 0);
});
test("save round trip and defensive import ignore malformed data and untrusted fields", () => {
  const data = new Map(),
    storage = {
      setItem: (k, v) => data.set(k, v),
      getItem: (k) => data.get(k) || null,
    };
  const w = new World();
  w.talk();
  w.plot(0, "hoe");
  w.plot(0, "seed");
  w.save(storage);
  const copy = World.load(storage);
  assert.deepEqual(copy.s, w.s);
  const raw = JSON.parse(data.get(KEY));
  raw.coins = -90;
  raw.energy = Infinity;
  raw.player.x = 99999;
  raw.bag.wood = -4;
  raw.claims = ["evil", "first", "first"];
  raw.seeds.radish = "Infinity";
  raw.plots[0].crop = "<script>";
  const cleaned = new World(raw).s;
  assert.equal(cleaned.coins, 0);
  assert.equal(cleaned.energy, 100);
  assert.equal(cleaned.player.x, 430);
  assert.equal(cleaned.bag.wood, 0);
  assert.deepEqual(cleaned.claims, ["first"]);
  assert.equal(cleaned.plots[0].crop, null);
  assert.throws(() => new World({ version: 99 }));
});
test("season calendar advances without allowing a runaway clock", () => {
  const w = new World();
  w.s.day = 29;
  assert.equal(w.season, "Hạ");
  assert.equal(w.seasonDay, 1);
  w.tick(1e8);
  assert.equal(w.s.minute, 1439);
  w.sleep();
  assert.equal(w.s.minute, 420);
});
