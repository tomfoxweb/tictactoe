import { Position } from './game-map';
import { Player, PlayerFigure } from './player';
import { GameStatus, Referee } from './referee';
import { Viewable } from './viewable';

export class Game {
  private view: Viewable;
  private referee: Referee;

  constructor(view: Viewable) {
    this.view = view;
    this.referee = new Referee(this.view);
  }

  async start(playerX: Player, playerO: Player) {
    this.referee.newGame();
    playerX.setFigure(PlayerFigure.X);
    playerO.setFigure(PlayerFigure.O);
    let figure: PlayerFigure = PlayerFigure.X;
    while (true) {
      const gameMap = this.referee.getMap();
      let position: Position;
      if (figure === PlayerFigure.X) {
        position = await playerX.selectPosition(gameMap);
      } else {
        position = await playerO.selectPosition(gameMap);
      }
      const accepted = this.referee.acceptPosition(figure, position);
      if (!accepted) {
        continue;
      }
      const status = this.referee.getStatus();
      if (status === GameStatus.awaitPlayerX) {
        figure = PlayerFigure.X;
      } else if (status === GameStatus.awaitPlayerO) {
        figure = PlayerFigure.O;
      } else {
        break;
      }
    }
  }
}
