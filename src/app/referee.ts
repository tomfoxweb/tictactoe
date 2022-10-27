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
  awaitPlayerX,
  awaitPlayerO,
  incorrectMap,
  incorrectPositionPlayerX,
  incorrectPositionPlayerO,
  winPlayerX,
  winPlayerO,
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
    this.gameStatus = GameStatus.awaitPlayerX;
    this.emptyCellsCount = 9;
  }

  newGame(
    gameMap: GameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ]
  ): boolean {
    this.gameStatus = this.calcStatusOnNewGame(gameMap);
    if (this.gameStatus === GameStatus.incorrectMap) {
      return false;
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

  private calcStatusOnNewGame(gameMap: GameMap): GameStatus {
    const flatMap = gameMap.flat();
    const countX = flatMap.reduce((c, x) => (x === Cell.X ? c + 1 : c), 0);
    const countO = flatMap.reduce((c, x) => (x === Cell.O ? c + 1 : c), 0);
    const countDiff = countX - countO;
    if (countDiff < 0 || countDiff > 1) {
      return GameStatus.incorrectMap;
    }
    if (countDiff === 0) {
      return GameStatus.awaitPlayerX;
    } else {
      return GameStatus.awaitPlayerO;
    }
  }

  getStatus(): GameStatus {
    return this.gameStatus;
  }

  getMap(): Readonly<GameMap> {
    return this.gameMap;
  }

  acceptPosition(playerFigure: PlayerFigure, position: Position): boolean {
    const { row, column } = position;
    if (this.gameMap[row][column] !== Cell.EMPTY) {
      this.setIncorrectPositionStatus(playerFigure);
      return false;
    }
    const cell: Cell = playerFigure === PlayerFigure.X ? Cell.X : Cell.O;
    this.gameMap[row][column] = cell;
    this.emptyCellsCount--;
    this.view.showCell(row, column, cell);
    if (this.matchedSomeLine(row, column, cell)) {
      this.setWinStatus(playerFigure);
      this.view.showWin(playerFigure);
    } else if (this.emptyCellsCount <= 0) {
      this.gameStatus = GameStatus.draw;
      this.view.showDraw();
    } else {
      this.setAwaitStatus(playerFigure);
    }
    return true;
  }

  private setIncorrectPositionStatus(playerFigure: PlayerFigure): void {
    if (playerFigure === PlayerFigure.X) {
      this.gameStatus = GameStatus.incorrectPositionPlayerX;
    } else {
      this.gameStatus = GameStatus.incorrectPositionPlayerO;
    }
  }

  private setWinStatus(playerFigure: PlayerFigure): void {
    if (playerFigure === PlayerFigure.X) {
      this.gameStatus = GameStatus.winPlayerX;
    } else {
      this.gameStatus = GameStatus.winPlayerO;
    }
  }

  private setAwaitStatus(playerFigure: PlayerFigure): void {
    if (playerFigure === PlayerFigure.X) {
      this.gameStatus = GameStatus.awaitPlayerO;
    } else {
      this.gameStatus = GameStatus.awaitPlayerX;
    }
  }

  private matchedSomeLine(
    row: Row,
    column: Column,
    matchedCell: Cell
  ): boolean {
    return (
      this.matchedHorizontalLine(row, matchedCell) ||
      this.matchedVerticalLine(column, matchedCell) ||
      this.matchedDownDiagonalLine(matchedCell) ||
      this.matchedUpDiagonalLine(matchedCell)
    );
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
