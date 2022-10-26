import { Cell, Column, COLUMN_COUNT, Row, ROW_COUNT } from './game-map';
import { Viewable } from './viewable';

export const enum GameStatus {
  awaitFirstPlayer,
  awaitSecondPlayer,
}

export class Referee {
  private view: Viewable;

  constructor(view: Viewable) {
    this.view = view;
  }

  newGame(): void {
    const cell = Cell.EMPTY;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        this.view.showCell(row as Row, column as Column, cell);
      }
    }
  }

  getStatus(): GameStatus {
    return GameStatus.awaitFirstPlayer;
  }
}
