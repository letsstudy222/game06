/* Game rules are independent of rendering so saves and the full farm loop can be tested. */
(function (root) {
  "use strict";
  const CROPS = {
    radish: {
      name: "Củ cải",
      days: 1,
      seed: 12,
      price: 32,
      color: "#ef95a5",
      icon: "radish",
    },
    carrot: {
      name: "Cà rốt",
      days: 2,
      seed: 20,
      price: 65,
      color: "#f4a04c",
      icon: "carrot",
    },
    pumpkin: {
      name: "Bí ngô",
      days: 3,
      seed: 35,
      price: 115,
      color: "#e98b36",
      icon: "pumpkin",
    },
  };
  const ITEMS = {
    radish: "Củ cải",
    carrot: "Cà rốt",
    pumpkin: "Bí ngô",
    fish: "Cá suối",
    fruit: "Táo rừng",
    wood: "Gỗ",
  };
  const PRICES = {
    radish: 32,
    carrot: 65,
    pumpkin: 115,
    fish: 42,
    fruit: 15,
    wood: 6,
  };
  const SEASONS = ["Xuân", "Hạ", "Thu", "Đông"];
  const KEY = "nhat-diem.farm.v1";
  const fresh = () => ({
    version: 1,
    day: 1,
    minute: 420,
    coins: 100,
    energy: 100,
    player: { x: 230, y: 170, facing: "down" },
    seeds: { radish: 6, carrot: 2, pumpkin: 0 },
    bag: { radish: 0, carrot: 0, pumpkin: 0, fish: 0, fruit: 2, wood: 0 },
    plots: Array.from({ length: 12 }, () => ({
      tilled: false,
      crop: null,
      growth: 0,
      watered: false,
    })),
    stats: {
      tilled: 0,
      planted: 0,
      watered: 0,
      harvested: 0,
      fish: 0,
      sold: 0,
      talked: 0,
      friendship: 0,
      earned: 0,
    },
    claims: [],
    gathered: [],
    petDay: 0,
    talkDay: 0,
    giftDay: 0,
    upgraded: false,
    restored: false,
    chosenSeed: "radish",
    petForm: 3,
    started: false,
  });
  const bounded = (v, min, max, fallback) =>
    typeof v === "number" && Number.isFinite(v)
      ? Math.min(max, Math.max(min, v))
      : fallback;
  // Only known fields are accepted; malformed or old saves never get executed or inserted into HTML.
  function validate(raw) {
    if (!raw || raw.version !== 1)
      throw new Error("Bản lưu không tương thích.");
    const s = fresh();
    for (const k of ["day", "coins", "energy", "minute"])
      s[k] = bounded(
        raw[k],
        k === "day" ? 1 : 0,
        k === "day"
          ? 100000
          : k === "energy"
            ? 100
            : k === "minute"
              ? 1439
              : 1e9,
        s[k],
      );
    s.day = Math.floor(s.day);
    for (const k of Object.keys(s.seeds))
      s.seeds[k] = Math.floor(bounded(raw.seeds?.[k], 0, 1e6, s.seeds[k]));
    for (const k of Object.keys(s.bag))
      s.bag[k] = Math.floor(bounded(raw.bag?.[k], 0, 1e6, 0));
    for (const k of Object.keys(s.stats))
      s.stats[k] = Math.floor(bounded(raw.stats?.[k], 0, 1e9, 0));
    if (Array.isArray(raw.plots))
      s.plots = s.plots.map((_, i) => {
        const p = raw.plots[i] || {};
        const crop = Object.hasOwn(CROPS, p.crop) ? p.crop : null;
        return {
          tilled: p.tilled === true,
          crop,
          growth: Math.floor(
            bounded(p.growth, 0, crop ? CROPS[crop].days : 0, 0),
          ),
          watered: p.watered === true,
        };
      });
    s.player = {
      x: bounded(raw.player?.x, 50, 430, 230),
      y: bounded(raw.player?.y, 115, 307, 170),
      facing: ["up", "down", "left", "right"].includes(raw.player?.facing)
        ? raw.player.facing
        : "down",
    };
    for (const k of ["upgraded", "restored", "started"]) s[k] = raw[k] === true;
    for (const k of ["petDay", "talkDay", "giftDay"])
      s[k] = Math.floor(bounded(raw[k], 0, s.day, 0));
    s.gathered = Array.isArray(raw.gathered)
      ? [
          ...new Set(
            raw.gathered.filter((x) => Number.isInteger(x) && x >= 0 && x < 6),
          ),
        ]
      : [];
    s.claims = Array.isArray(raw.claims)
      ? [
          ...new Set(
            raw.claims.filter((x) =>
              ["first", "harvest", "fish", "friend", "village"].includes(x),
            ),
          ),
        ]
      : [];
    if (Object.hasOwn(CROPS, raw.chosenSeed)) s.chosenSeed = raw.chosenSeed;
    s.petForm = [1, 2, 3].includes(raw.petForm) ? raw.petForm : 3;
    return s;
  }
  const QUESTS = [
    {
      id: "first",
      title: "Những hạt mầm đầu tiên",
      text: "Gieo và tưới 3 hạt giống.",
      goal: 3,
      progress: (s) => Math.min(s.stats.planted, s.stats.watered),
      reward: 60,
    },
    {
      id: "harvest",
      title: "Hương vị của khu vườn",
      text: "Thu hoạch 6 cây trồng.",
      goal: 6,
      progress: (s) => s.stats.harvested,
      reward: 120,
    },
    {
      id: "fish",
      title: "Chuyện kể bên hồ",
      text: "Câu được 3 con cá.",
      goal: 3,
      progress: (s) => s.stats.fish,
      reward: 100,
    },
    {
      id: "friend",
      title: "Một người bạn mới",
      text: "Đạt 3 điểm thân thiết với An.",
      goal: 3,
      progress: (s) => s.stats.friendship,
      reward: 80,
    },
    {
      id: "village",
      title: "Thắp lại Đài Bình Minh",
      text: "Sửa đài cổ bằng 350 vàng và 8 gỗ.",
      goal: 1,
      progress: (s) => Number(s.restored),
      reward: 200,
    },
  ];
  class World {
    constructor(state) {
      this.s = state ? validate(state) : fresh();
    }
    get weather() {
      return this.s.day % 4 === 0 ? "rain" : "sun";
    }
    get season() {
      return SEASONS[Math.floor((this.s.day - 1) / 28) % 4];
    }
    get seasonDay() {
      return ((this.s.day - 1) % 28) + 1;
    }
    spend(n) {
      if (this.s.energy < n) return false;
      this.s.energy -= n;
      return true;
    }
    plot(index, tool) {
      const p = this.s.plots[index];
      if (!p) return "Không có ô đất này.";
      if (p.crop && p.growth >= CROPS[p.crop].days) {
        if (!this.spend(1)) return "Bạn đã mệt. Ăn táo hoặc về nhà nghỉ nhé.";
        const crop = p.crop;
        this.s.bag[crop]++;
        this.s.stats.harvested++;
        Object.assign(p, { crop: null, growth: 0, watered: false });
        return `Thu hoạch ${CROPS[crop].name.toLowerCase()}! Đã cất vào túi.`;
      }
      if (tool === "hoe") {
        if (p.tilled) return "Đất đã được cuốc. Chọn hạt giống để gieo.";
        if (!this.spend(2))
          return "Không đủ thể lực. Ăn táo hoặc ngủ để hồi phục.";
        p.tilled = true;
        this.s.stats.tilled++;
        return "Đất đã tơi xốp. Sẵn sàng đón hạt mầm.";
      }
      if (tool === "seed") {
        if (!p.tilled) return "Hãy cuốc đất trước khi gieo hạt.";
        if (p.crop) return "Ô đất đã có cây đang lớn.";
        const seed = this.s.chosenSeed;
        if (!this.s.seeds[seed])
          return "Hết hạt giống này. Ghé quầy của An để mua thêm.";
        if (!this.spend(1)) return "Bạn cần nghỉ ngơi trước khi gieo tiếp.";
        this.s.seeds[seed]--;
        p.crop = seed;
        p.growth = 0;
        p.watered = this.weather === "rain";
        this.s.stats.planted++;
        return `Đã gieo ${CROPS[seed].name.toLowerCase()}. Cần ${CROPS[seed].days} đêm được tưới để chín.`;
      }
      if (tool === "water") {
        if (!p.crop) return "Hãy gieo một hạt giống trước nhé.";
        if (p.watered) return "Đất vẫn còn ẩm. Hôm nay không cần tưới thêm.";
        if (!this.spend(this.s.upgraded ? 1 : 2))
          return "Không đủ thể lực để tưới. Hãy ăn táo hoặc ngủ.";
        p.watered = true;
        this.s.stats.watered++;
        return "Đã tưới nước. Cây sẽ lớn thêm sau một giấc ngủ.";
      }
      return p.crop
        ? `${CROPS[p.crop].name}: ${p.growth}/${CROPS[p.crop].days} đêm phát triển${p.watered ? " · đã tưới" : " · cần nước"}.`
        : "Ô đất trống. Chọn cuốc, rồi gieo và tưới.";
    }
    buy(seed) {
      const c = CROPS[seed];
      if (!c) return "Không có loại hạt này.";
      if (this.s.coins < c.seed)
        return "Bạn chưa đủ vàng. Bán nông sản để kiếm thêm nhé.";
      this.s.coins -= c.seed;
      this.s.seeds[seed]++;
      return `Đã mua 1 hạt ${c.name.toLowerCase()}.`;
    }
    sell() {
      let value = 0,
        count = 0;
      for (const k of ["radish", "carrot", "pumpkin", "fish", "fruit"]) {
        value += this.s.bag[k] * PRICES[k];
        count += this.s.bag[k];
        this.s.bag[k] = 0;
      }
      if (!count)
        return "Túi chưa có nông sản, cá hoặc táo để bán. Gỗ được giữ lại để sửa đài.";
      this.s.coins += value;
      this.s.stats.earned += value;
      this.s.stats.sold += count;
      return `Đã bán ${count} vật phẩm, nhận ${value} vàng. Gỗ vẫn được giữ trong túi.`;
    }
    eat() {
      if (!this.s.bag.fruit)
        return "Bạn chưa có táo. Tìm giỏ táo dưới cây bên phải.";
      if (this.s.energy >= 100) return "Thể lực đang đầy. Hãy để dành táo nhé.";
      this.s.bag.fruit--;
      this.s.energy = Math.min(100, this.s.energy + 25);
      return "Táo rừng ngọt lành. Hồi 25 thể lực.";
    }
    forage(i) {
      if (!Number.isInteger(i) || i < 0 || i > 5)
        return "Không thể nhặt ở đây.";
      if (this.s.gathered.includes(i))
        return "Đã nhặt ở đây hôm nay. Ngày mai sẽ có thêm.";
      if (!this.spend(3)) return "Bạn cần nghỉ trước khi nhặt thêm.";
      this.s.gathered.push(i);
      const item = i < 2 ? "fruit" : "wood";
      const count = i < 2 ? 2 : 3;
      this.s.bag[item] += count;
      return `Nhặt được ${count} ${ITEMS[item].toLowerCase()}.`;
    }
    talk() {
      if (this.s.talkDay === this.s.day)
        return "An: Cây chỉ lớn qua đêm khi đủ nước. Nếu trời mưa, khu vườn sẽ tự được tưới nhé!";
      this.s.talkDay = this.s.day;
      this.s.stats.talked++;
      this.s.stats.friendship++;
      const lines = [
        "Mừng bạn về thung lũng! Tôi để dành vài hạt cà rốt cho bạn. Hãy gieo, tưới rồi về nhà ngủ nhé.",
        "Nhật Diệm thích được vuốt ve. Thử nhờ bạn ấy gọi mưa sương cho khu vườn xem!",
        "Đài Bình Minh đã ngủ rất lâu. Nếu góp 350 vàng và 8 gỗ, chúng ta có thể thắp sáng nó lần nữa.",
      ];
      if (this.s.stats.talked === 1) this.s.seeds.carrot += 2;
      return `An: ${lines[(this.s.stats.talked - 1) % lines.length]} (+1 thân thiết)`;
    }
    gift() {
      if (this.s.giftDay === this.s.day)
        return "Bạn đã tặng quà cho An hôm nay rồi.";
      if (!this.s.bag.fruit) return "An thích táo rừng. Hãy mang theo một quả.";
      this.s.bag.fruit--;
      this.s.giftDay = this.s.day;
      this.s.stats.friendship++;
      return "An: Táo thơm quá! Cảm ơn bạn đã nhớ đến tôi. (+1 thân thiết)";
    }
    pet() {
      if (this.s.petDay === this.s.day)
        return "Nhật Diệm dụi đầu vào tay bạn. Phép sương sẽ hồi lại ngày mai.";
      this.s.petDay = this.s.day;
      let n = 0;
      for (const p of this.s.plots)
        if (p.crop && !p.watered) {
          p.watered = true;
          n++;
          this.s.stats.watered++;
        }
      this.s.energy = Math.min(100, this.s.energy + 10);
      return `Nhật Diệm gọi sương sớm: tưới ${n} cây và hồi 10 thể lực. Mỗi ngày dùng được một lần.`;
    }
    fish(success) {
      if (success) {
        this.s.bag.fish++;
        this.s.stats.fish++;
        return "Cắn câu rồi! Nhận 1 cá suối. Có thể bán với giá 42 vàng.";
      }
      return "Cá đã bơi đi. Hãy thả câu và thử lại nhé.";
    }
    upgrade() {
      if (this.s.upgraded) return "Bình tưới của bạn đã được nâng cấp.";
      if (this.s.coins < 180) return "Cần 180 vàng để nâng cấp bình tưới.";
      this.s.coins -= 180;
      this.s.upgraded = true;
      return "Đã nâng cấp! Mỗi lần tưới chỉ tốn 1 thể lực.";
    }
    restore() {
      if (this.s.restored)
        return "Đài Bình Minh đang tỏa sáng. Thung lũng lại tràn đầy sức sống.";
      if (this.s.coins < 350 || this.s.bag.wood < 8)
        return "Cần 350 vàng và 8 gỗ để phục hồi Đài Bình Minh.";
      this.s.coins -= 350;
      this.s.bag.wood -= 8;
      this.s.restored = true;
      return "Đài Bình Minh đã thức giấc! Cảm ơn bạn đã mang hơi ấm trở lại thung lũng.";
    }
    claim(id) {
      const q = QUESTS.find((q) => q.id === id);
      if (!q || this.s.claims.includes(id) || q.progress(this.s) < q.goal)
        return "Nhiệm vụ chưa hoàn thành hoặc đã nhận thưởng.";
      this.s.claims.push(id);
      this.s.coins += q.reward;
      return `Hoàn thành «${q.title}». Nhận ${q.reward} vàng!`;
    }
    sleep() {
      let grew = 0;
      for (const p of this.s.plots) {
        if (p.crop && p.watered && p.growth < CROPS[p.crop].days) {
          p.growth++;
          grew++;
        }
        p.watered = false;
      }
      this.s.day++;
      this.s.minute = 420;
      this.s.energy = 100;
      this.s.gathered = [];
      if (this.weather === "rain")
        for (const p of this.s.plots) if (p.crop) p.watered = true;
      return { grew, weather: this.weather, day: this.s.day };
    }
    tick(dt) {
      this.s.minute = Math.min(1439, this.s.minute + dt * 3);
    }
    save(storage) {
      storage.setItem(KEY, JSON.stringify(this.s));
    }
    static load(storage) {
      const v = storage.getItem(KEY);
      return v ? new World(JSON.parse(v)) : new World();
    }
  }
  const api = { World, CROPS, ITEMS, PRICES, QUESTS, KEY, validate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.FarmRules = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
