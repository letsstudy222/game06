import test from "node:test";
import assert from "node:assert/strict";
import { viewportPlan } from "../src/island/ResponsiveLayout.mjs";
import { joystickVector } from "../src/island/MobileJoystick.mjs";
import {
  sanitizeSettings,
  UISettings,
  SETTINGS_KEY,
} from "../src/island/UISettings.mjs";
import { Camera } from "../src/island/Camera.mjs";
const world = { width: 960, height: 640 };
test("integer zoom covers portrait/landscape/desktop without world overscan at every setting", () => {
  for (const [w, h] of [
    [390, 844],
    [360, 800],
    [844, 390],
    [1920, 1080],
    [320, 844],
    [2560, 1440],
  ])
    for (const zoom of [0, 1, 2, 3, 4]) {
      const p = viewportPlan(w, h, world, zoom);
      assert(Number.isInteger(p.scale));
      assert(p.width <= 960 && p.height <= 640);
      assert(p.width * p.scale >= w && p.height * p.scale >= h);
    }
  assert.equal(viewportPlan(390, 844, world).scale, 2);
});
test("8-way joystick dead zone and normalized diagonal retain keyboard movement speed", () => {
  assert.deepEqual(joystickVector(1, 2, 40), { x: 0, y: 0 });
  for (let a = 0; a < 8; a++) {
    const p = joystickVector(
      Math.cos((a * Math.PI) / 4) * 100,
      Math.sin((a * Math.PI) / 4) * 100,
      40,
    );
    assert(Math.abs(Math.hypot(p.x, p.y) - 1) < 1e-9);
    assert(
      Math.abs(
        Math.atan2(p.y, p.x) -
          Math.atan2(Math.sin((a * Math.PI) / 4), Math.cos((a * Math.PI) / 4)),
      ) < 1e-9,
    );
  }
});
test("settings validate corrupt values, bound positions, persist and reset without touching farm saves", () => {
  const values = new Map([["farm", "keep"]]),
    storage = {
      getItem: (k) => values.get(k),
      setItem: (k, v) => values.set(k, v),
    };
  storage.setItem(SETTINGS_KEY, "broken JSON");
  const s = new UISettings(storage);
  s.update({
    joystickSize: 130,
    opacity: 0.7,
    positions: { portrait: { actions: { x: -4, y: 7 } } },
  });
  const restored = new UISettings(storage);
  assert.equal(restored.value.opacity, 0.7);
  assert.deepEqual(restored.value.positions.portrait.actions, { x: 0, y: 1 });
  assert.equal(values.get("farm"), "keep");
  s.reset();
  assert.equal(s.value.joystickSize, 112);
  assert.deepEqual(s.value.positions, {});
  assert.equal(
    sanitizeSettings({ zoom: Infinity, actionSize: 900 }).actionSize,
    80,
  );
});
test("unavailable persistent storage does not prevent settings working for current session", () => {
  const s = new UISettings({
    getItem() {
      throw Error("denied");
    },
    setItem() {
      throw Error("quota");
    },
  });
  s.update({ opacity: 0.6 });
  assert.equal(s.value.opacity, 0.6);
  assert.equal(s.saved, false);
});
test("camera reaches bounds at shore and stays within original map across rotation", () => {
  const c = new Camera(world);
  for (const [w, h] of [
    [195, 422],
    [422, 195],
    [640, 360],
  ]) {
    c.resize(w, h, { x: 455, y: 320 });
    for (const player of [
      { x: 500, y: 460 },
      { x: 0, y: 0 },
      { x: 960, y: 640 },
    ]) {
      for (let i = 0; i < 200; i++) c.follow(player, 0.05);
      assert(c.renderX >= 0 && c.renderY >= 0);
      assert(c.renderX + w <= world.width && c.renderY + h <= world.height);
    }
  }
});
