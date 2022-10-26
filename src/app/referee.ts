import {
  Cell,
  Column,
  COLUMN_COUNT,
  GameMap,
  Position,
  Row,
  ROW_COUNT,
} from './game-map';
import { PlayerFigure } from './player';
import { Viewable } from './viewable';

export const enum GameStatus {
  awaitFirstPlayer,
  awaitSecondPlayer,
  incorrectMap,
  incorrectPlayerXPosition,
  incorrectPlayerOPosition,
}

export class Referee {
  private view: Viewable;
  private gameMap: GameMap;
  private gameStatus: GameStatus;

  constructor(view: Viewable) {
    this.view = view;
    this.gameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ];
    this.gameStatus = GameStatus.awaitFirstPlayer;
  }

  newGame(
    gameMap: GameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ]
  ): boolean {
    const flatMap = gameMap.flat();
    const countX = flatMap.reduce((c, x) => (x === Cell.X ? c + 1 : c), 0);
    const countO = flatMap.reduce((c, x) => (x === Cell.O ? c + 1 : c), 0);
    const countDiff = countX - countO;
    if (countDiff < 0 || countDiff > 1) {
      this.gameStatus = GameStatus.incorrectMap;
      return false;
    }
    if (countDiff === 0) {
      this.gameStatus = GameStatus.awaitFirstPlayer;
    } else {
      this.gameStatus = GameStatus.awaitSecondPlayer;
    }
    this.gameMap = gameMap;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const cell = this.gameMap[row][column];
        this.view.showCell(row as Row, column as Column, cell);
      }
    }
    return true;
  }

  getStatus(): GameStatus {
    return this.gameStatus;
  }

  acceptPosition(playerFigure: PlayerFigure, position: Position): boolean {
    if (this.gameMap[position.row][position.column] !== Cell.EMPTY) {
      if (playerFigure === PlayerFigure.X) {
        this.gameStatus = GameStatus.incorrectPlayerXPosition;
      } else {
        this.gameStatus = GameStatus.incorrectPlayerOPosition;
      }
      return false;
    }
    const cell: Cell = playerFigure === PlayerFigure.X ? Cell.X : Cell.O;
    this.view.showCell(position.row, position.column, cell);
    if (playerFigure === PlayerFigure.X) {
      this.gameStatus = GameStatus.awaitSecondPlayer;
    } else {
      this.gameStatus = GameStatus.awaitFirstPlayer;
    }
    return true;
  }
}
