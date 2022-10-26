import {
  Cell,
  Column,
  COLUMN_COUNT,
  GameMap,
  Row,
  ROW_COUNT,
} from './game-map';
import { Viewable } from './viewable';

export const enum GameStatus {
  awaitFirstPlayer,
  awaitSecondPlayer,
}

export class Referee {
  private view: Viewable;
  private gameMap: GameMap;

  constructor(view: Viewable) {
    this.view = view;
    this.gameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ];
  }

  newGame(
    gameMap: GameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ]
  ): void {
    this.gameMap = gameMap;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const cell = this.gameMap[row][column];
        this.view.showCell(row as Row, column as Column, cell);
      }
    }
  }

  getStatus(): GameStatus {
    return GameStatus.awaitFirstPlayer;
  }
}
