import { SKILLS } from "./SkillSystem.mjs";
export class ActionButtons {
  constructor(input, scene) {
    this.input = input;
    this.scene = scene;
    this.pointers = new Map();
    for (const name of ["attack", "fire", "hover", "interaction"]) {
      const b = document.getElementById(name);
      b.addEventListener("pointerdown", (e) => {
        if (input.state.paused) return;
        e.preventDefault();
        this.pointers.set(e.pointerId, name);
        b.setPointerCapture(e.pointerId);
        b.classList.add("pressed");
        if (name === "hover") input.hoverHeld = true;
        else input.action(name === "interaction" ? "interact" : name);
        input.focus();
      });
      const release = (e) => {
        if (this.pointers.get(e.pointerId) !== name) return;
        this.pointers.delete(e.pointerId);
        b.classList.remove("pressed");
        if (name === "hover")
          input.hoverHeld = [...this.pointers.values()].includes("hover");
      };
      for (const type of ["pointerup", "pointercancel", "lostpointercapture"])
        b.addEventListener(type, release);
      b.addEventListener("click", (e) => {
        if (e.detail !== 0) return;
        if (name === "hover") input.hoverLatched = !input.hoverLatched;
        else input.action(name === "interaction" ? "interact" : name);
        input.focus();
      });
    }
    input.resetters.push(() => {
      this.pointers.clear();
      for (const b of document.querySelectorAll(".hotbar button"))
        b.classList.remove("pressed");
    });
    this.drawIcons();
  }
  drawIcons() {
    this.scene.portrait(document.querySelector("#hover canvas"));
    const colors = {
      ".": "",
      "#": "#9e452d",
      o: "#f4983b",
      "+": "#ffdb7d",
      w: "#fff2c5",
    };
    const art = {
      attack: [
        "...........++...",
        ".........++w+...",
        ".......++ww+....",
        ".....++ww+......",
        "....+www+.......",
        "...+ow+.........",
        "..+oo+..........",
        "...##...........",
        "..#oo#..........",
        ".#o#............",
        "..#.............",
      ],
      fire: [
        ".......o........",
        "......owo.......",
        "......owoo......",
        "...o.owwwo......",
        "..ooowwwwwo.....",
        "..owwwwwwoo.....",
        ".owwww+wwwwo....",
        ".owww+++wwwo....",
        "..ow+++++wo.....",
        "...ow+++wo......",
        "....ooooo.......",
      ],
    };
    for (const name of ["attack", "fire"]) {
      const c = document.querySelector("#" + name + " canvas").getContext("2d");
      c.clearRect(0, 0, 16, 16);
      art[name].forEach((row, y) =>
        [...row].forEach((p, x) => {
          if (colors[p]) {
            c.fillStyle = colors[p];
            c.fillRect(x, y + 2, 1, 1);
          }
        }),
      );
    }
  }
  update() {
    const s = this.input.state;
    document
      .getElementById("hover")
      .setAttribute("aria-pressed", String(s.player.hovering));
    for (const name of ["attack", "fire"]) {
      const b = document.getElementById(name),
        left = s.skills.cooldowns[name];
      b.querySelector(".cooldown-mask").style.transform =
        `scaleY(${left / SKILLS[name].cooldown})`;
      b.querySelector(".cooldown-label").textContent =
        left > 0.05 ? left.toFixed(1) : "";
      b.setAttribute("aria-disabled", String(left > 0.05));
    }
    document.getElementById("interaction").hidden = !(
      s.snapshot().nearShrine && !s.paused
    );
  }
}
