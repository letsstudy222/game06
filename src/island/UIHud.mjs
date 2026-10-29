import { PlayerHUD } from "./PlayerHUD.mjs";
import { WorldHUD } from "./WorldHUD.mjs";
import { ActionButtons } from "./ActionButtons.mjs";
export class UIHud {
  constructor(state, scene, input) {
    this.player = new PlayerHUD(state, scene);
    this.world = new WorldHUD(state);
    this.actions = new ActionButtons(input, scene);
  }
  update() {
    this.player.update();
    this.world.update();
    this.actions.update();
  }
}
