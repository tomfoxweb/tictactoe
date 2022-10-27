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
  firstPlayerWin,
  secondPlayerWin,
  draw,
}

export class Referee {
  private view: Viewable;
  private gameMap: GameMap;
  private gameStatus: GameStatus;
  private emptyCellsCount: number;

  constructor(view: Viewable) {
    this.view = view;
    this.gameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ];
    this.gameStatus = GameStatus.awaitFirstPlayer;
    this.emptyCellsCount = 9;
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
    this.emptyCellsCount = 0;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const cell = this.gameMap[row][column];
        if (cell === Cell.EMPTY) {
          this.emptyCellsCount++;
        }
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
    this.gameMap[position.row][position.column] = cell;
    this.emptyCellsCount--;
    this.view.showCell(position.row, position.column, cell);
    const matched =
      this.matchedHorizontalLine(position.row, cell) ||
      this.matchedVerticalLine(position.column, cell) ||
      this.matchedDownDiagonalLine(cell) ||
      this.matchedUpDiagonalLine(cell);
    if (matched) {
      if (playerFigure === PlayerFigure.X) {
        this.gameStatus = GameStatus.firstPlayerWin;
      } else {
        this.gameStatus = GameStatus.secondPlayerWin;
      }
    } else if (this.emptyCellsCount <= 0) {
      this.gameStatus = GameStatus.draw;
    } else if (playerFigure === PlayerFigure.X) {
      this.gameStatus = GameStatus.awaitSecondPlayer;
    } else {
      this.gameStatus = GameStatus.awaitFirstPlayer;
    }
    return true;
  }

  private matchedHorizontalLine(row: Row, matchedCell: Cell): boolean {
    const line: Cell[] = [
      this.gameMap[row][0],
      this.gameMap[row][1],
      this.gameMap[row][2],
    ];
    return line.every((cell) => cell === matchedCell);
  }

  private matchedVerticalLine(column: Column, matchedCell: Cell): boolean {
    const line: Cell[] = [
      this.gameMap[0][column],
      this.gameMap[1][column],
      this.gameMap[2][column],
    ];
    return line.every((cell) => cell === matchedCell);
  }

  private matchedDownDiagonalLine(matchedCell: Cell): boolean {
    const line: Cell[] = [
      this.gameMap[0][0],
      this.gameMap[1][1],
      this.gameMap[2][2],
    ];
    return line.every((cell) => cell === matchedCell);
  }

  private matchedUpDiagonalLine(matchedCell: Cell): boolean {
    const line: Cell[] = [
      this.gameMap[2][0],
      this.gameMap[1][1],
      this.gameMap[0][2],
    ];
    return line.every((cell) => cell === matchedCell);
  }
}
