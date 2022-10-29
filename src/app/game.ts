import { Position } from './game-map';
import { Player, PlayerFigure } from './player';
import { GameStatus, Referee } from './referee';
import { Viewable } from './viewable';

export class Game {
  private view: Viewable;
  private referee: Referee;
  private playerX: Player | undefined;
  private playerO: Player | undefined;
  private activePlayer: Player | undefined;
  private activePlayerFigure: PlayerFigure;
  private timeBetweenTurns = 300;

  constructor(view: Viewable) {
    this.view = view;
    this.referee = new Referee(this.view);
    this.activePlayerFigure = PlayerFigure.X;
  }

  async start(playerX: Player, playerO: Player, timeBetweenTurns = 300) {
    this.timeBetweenTurns = timeBetweenTurns;
    this.playerX = playerX;
    this.playerO = playerO;
    this.playerX.setFigure(PlayerFigure.X);
    this.playerO.setFigure(PlayerFigure.O);
    this.activePlayer = this.playerX;
    this.activePlayerFigure = PlayerFigure.X;
    this.referee.newGame();
    while (!this.isGameOver(this.referee.getStatus())) {
      const gameMap = this.referee.getMap();
      let position: Position;
      try {
        position = await this.activePlayer.selectPosition(gameMap);
      } catch (e) {
        continue;
      }
      if (!this.referee.acceptPosition(this.activePlayerFigure, position)) {
        continue;
      }
      this.switchActivePlayer(this.referee.getStatus());
      if (this.timeBetweenTurns > 0) {
        await this.wait(this.timeBetweenTurns);
      }
    }
  }

  private switchActivePlayer(gameStatus: GameStatus): void {
    if (gameStatus === GameStatus.awaitPlayerX) {
      this.activePlayer = this.playerX;
      this.activePlayerFigure = PlayerFigure.X;
    } else if (gameStatus === GameStatus.awaitPlayerO) {
      this.activePlayer = this.playerO;
      this.activePlayerFigure = PlayerFigure.O;
    }
  }

  private isGameOver(gameStatus: GameStatus) {
    if (gameStatus === GameStatus.winPlayerX) {
      return true;
    }
    if (gameStatus === GameStatus.winPlayerO) {
      return true;
    }
    if (gameStatus === GameStatus.draw) {
      return true;
    }
    return false;
  }

  private wait(time: number) {
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
