import { CellType, GameMap } from './game-map';
import { Player, PlayerFigure } from './player';
import { Viewable } from './viewable';

export class Game {
  private gameMap: GameMap;
  constructor(view: Viewable) {
    this.gameMap = [
      [CellType.EMPTY, CellType.EMPTY, CellType.EMPTY],
      [CellType.EMPTY, CellType.EMPTY, CellType.EMPTY],
      [CellType.EMPTY, CellType.EMPTY, CellType.EMPTY],
    ];
  }

  start(firstPlayer: Player, secondPlayer: Player) {
    firstPlayer.setFigure(PlayerFigure.X);
    secondPlayer.setFigure(PlayerFigure.O);
    firstPlayer.selectPosition(this.gameMap);
  }
}
