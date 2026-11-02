import { canOccupy } from "./maps.mjs";
export const SAVE_PREFIX = "hai-uyen.vs.v1.slot.";
export class SaveStore {
  constructor(storage, slot = 1) {
    this.storage = storage;
    this.slot = slot;
    this.revision = 0;
    this.error = "";
    this.readOnly = false;
  }
  load(maps) {
    const key = SAVE_PREFIX + this.slot;
    let raw;
    try {
      raw = this.storage.getItem(key);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (s?.version !== 1) {
        this.readOnly = true;
        throw Error("Phiên bản save chưa hỗ trợ; giữ nguyên dữ liệu.");
      }
      if (
        !Number.isInteger(s.revision) ||
        s.revision < 1 ||
        !Number.isFinite(s.savedAt) ||
        !s.flags ||
        Array.isArray(s.flags) ||
        typeof s.flags !== "object" ||
        !Array.isArray(s.receipts) ||
        s.receipts.some((v) => typeof v !== "string" || !v.startsWith("vs.")) ||
        !Number.isFinite(s.tokens) ||
        s.tokens < 0
      )
        throw Error("Save không hợp lệ");
      if (
        Object.entries(s.flags).some(
          ([k, v]) => !k.startsWith("vs.") || v !== true,
        )
      )
        throw Error("Flag không hợp lệ");
      if (s.flags["vs.lab.valve_b_stable"] && !s.flags["vs.lab.valve_a_primed"])
        throw Error("Trạng thái van không hợp lệ");
      if (
        s.flags["vs.arena.boss_defeated"] &&
        !s.receipts.includes("vs.encounter.cua_giap_thuy.defeat.v1")
      )
        throw Error("Thiếu biên nhận chiến thắng");
      if (
        !maps[s.room] ||
        !s.checkpoint ||
        !maps[s.checkpoint.room] ||
        !canOccupy(maps[s.checkpoint.room], s.checkpoint, s.flags) ||
        !Number.isFinite(s.hp) ||
        s.hp <= 0 ||
        s.hp > 100 ||
        !s.cooldowns ||
        Object.values(s.cooldowns).some(
          (v) => !Number.isFinite(v) || v < 0 || v > 30,
        ) ||
        !Number.isFinite(s.buff) ||
        s.buff < 0 ||
        s.buff > 8
      )
        throw Error("Vị trí/HP/thời gian không hợp lệ");
      if (!canOccupy(maps[s.room], s.position, s.flags)) {
        s.room = s.checkpoint.room;
        s.position = { x: s.checkpoint.x, y: s.checkpoint.y };
        this.error = "Vị trí cũ không an toàn; trở về checkpoint.";
      }
      this.revision = s.revision;
      return s;
    } catch (e) {
      this.error = `Không tải save: ${e.message}`;
      this.readOnly = true;
      return null;
    }
  }
  save(data) {
    if (this.readOnly) throw Error(this.error || "Save chỉ đọc");
    const key = SAVE_PREFIX + this.slot;
    try {
      const current = this.storage.getItem(key),
        revision = current ? JSON.parse(current).revision : 0;
      if (revision !== this.revision) {
        this.readOnly = true;
        throw Error("Save đã đổi ở tab khác. Tải lại trước khi tiếp tục lưu.");
      }
      const next = {
        ...data,
        version: 1,
        revision: this.revision + 1,
        savedAt: Date.now(),
      };
      // Flags, receipt journal and inventory are committed by one atomic setItem.
      this.storage.setItem(key, JSON.stringify(next));
      this.revision = next.revision;
      this.error = "";
      return true;
    } catch (e) {
      this.error = `Chưa lưu được: ${e.message}`;
      throw e;
    }
  }
}
