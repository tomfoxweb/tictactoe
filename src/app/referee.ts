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
  ): void {
    this.gameMap = gameMap;
    this.gameStatus = GameStatus.awaitFirstPlayer;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const cell = this.gameMap[row][column];
        this.view.showCell(row as Row, column as Column, cell);
      }
    }
  }

  getStatus(): GameStatus {
    return this.gameStatus;
  }

  acceptPosition(playerFigure: PlayerFigure, position: Position): void {
    this.view.showCell(position.row, position.column, Cell.X);
    this.gameStatus = GameStatus.awaitSecondPlayer;
  }
}
