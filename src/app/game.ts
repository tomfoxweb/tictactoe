import { Observable } from 'rxjs';
import { Position } from './game-map';
import { Player, PlayerFigure } from './player';
import { GameStatus, Referee } from './referee';
import { Viewable } from './viewable';

export class Game {
  private view: Viewable;
  private referee: Referee;
  private localPlayerObservable: Observable<Event>;

  constructor(view: Viewable, observable: Observable<Event>) {
    this.view = view;
    this.referee = new Referee(this.view);
    this.localPlayerObservable = observable;
  }

  async start(playerX: Player, playerO: Player) {
    this.referee.newGame();
    playerX.setFigure(PlayerFigure.X);
    playerO.setFigure(PlayerFigure.O);
    let figure: PlayerFigure = PlayerFigure.X;
    while (true) {
      const gameMap = this.referee.getMap();
      let position: Position;
      try {
        if (figure === PlayerFigure.X) {
          position = await playerX.selectPosition(gameMap);
        } else {
          position = await playerO.selectPosition(gameMap);
        }
      } catch (e) {
        continue;
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
