import { Player, PlayerFigure } from './player';
import { Viewable } from './viewable';

export class Game {
  constructor(view: Viewable) {}

  start(firstPlayer: Player, secondPlayer: Player) {
    firstPlayer.setFigure(PlayerFigure.X);
    secondPlayer.setFigure(PlayerFigure.O);
  }
}
