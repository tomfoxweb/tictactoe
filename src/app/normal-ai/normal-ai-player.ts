import { Cell, Column, GameMap, Position, Row } from '../game-map';
import { Player, PlayerFigure } from '../player';
import { Randomizer } from '../randomizer/randomizer';

export class NormalAIPlayer implements Player {
  private randomizer: Randomizer;
  private playerCell: Cell | undefined;
  private opponentCell: Cell | undefined;

  constructor(randomizer: Randomizer) {
    this.randomizer = randomizer;
  }

  setFigure(figure: PlayerFigure): void {
    this.playerCell = figure === PlayerFigure.X ? Cell.X : Cell.O;
    this.opponentCell = figure === PlayerFigure.X ? Cell.O : Cell.X;
  }

  selectPosition(gameMap: GameMap): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      let position = this.selectPositionImpl(gameMap);
      if (position) {
        resolve(position);
      } else {
        reject(new Error('No empty position on map'));
      }
    });
  }

  private selectPositionImpl(gameMap: GameMap): Position | null {
    let position = this.findLastPlaceOnHorizontalLines(gameMap);
    if (position) {
      return position;
    }
    position = this.findLastPlaceOnVerticalLines(gameMap);
    if (position) {
      return position;
    }
    if (this.isEmptyMap(gameMap)) {
      return { row: 1, column: 1 };
    }
    if (this.isCenterEmptyAndPlacedOneCell(gameMap)) {
      return { row: 1, column: 1 };
    }
    position = this.findRandomCornerIfCenterPlaced(gameMap);
    if (position) {
      return position;
    }
    position = this.findNextPlaceOnHorizontalLines(gameMap);
    if (position) {
      return position;
    }
    position = this.findNextPlaceOnVerticalLines(gameMap);
    if (position) {
      return position;
    }
    position = this.findNextPlaceOnDiagonalDownLine(gameMap);
    if (position) {
      return position;
    }
    position = this.findNextPlaceOnDiagonalUpLine(gameMap);
    if (position) {
      return position;
    }
    position = this.randomizer.randomEmptyPosition(gameMap);
    return position;
  }

  private isEmptyMap(gameMap: GameMap): boolean {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (gameMap[row][column] !== Cell.EMPTY) {
          return false;
        }
      }
    }
    return true;
  }

  private isCenterEmptyAndPlacedOneCell(gameMap: GameMap): boolean {
    if (gameMap[1][1] !== Cell.EMPTY) {
      return false;
    }
    let placedCount = 0;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (gameMap[row][column] !== Cell.EMPTY) {
          placedCount++;
          if (placedCount > 1) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private findRandomCornerIfCenterPlaced(gameMap: GameMap): Position | null {
    if (gameMap[1][1] === Cell.EMPTY) {
      return null;
    }
    let placedCount = 0;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (gameMap[row][column] !== Cell.EMPTY) {
          placedCount++;
          if (placedCount > 2) {
            return null;
          }
        }
      }
    }
    return this.randomizer.randomCornerPosition(gameMap);
  }

  private findLastPlaceOnHorizontalLines(gameMap: GameMap): Position | null {
    for (let row = 0; row < 3; row++) {
      const position = this.isHorizontalLineHasLastPlace(gameMap, row);
      if (position) {
        return position;
      }
    }
    return null;
  }

  private isHorizontalLineHasLastPlace(
    gameMap: GameMap,
    row: number
  ): Position | null {
    let hasPlayerCell = false;
    let selectedLastPosition = false;
    let lastPosition: Position = { row: row as Row, column: 0 };
    for (let column = 0; column < 3; column++) {
      if (gameMap[row][column] === this.opponentCell) {
        return null;
      } else if (gameMap[row][column] === this.playerCell) {
        hasPlayerCell = true;
      } else {
        if (!selectedLastPosition) {
          selectedLastPosition = true;
          lastPosition = { row: row as Row, column: column as Column };
        } else {
          return null;
        }
      }
    }
    return hasPlayerCell ? lastPosition : null;
  }

  private findNextPlaceOnHorizontalLines(gameMap: GameMap): Position | null {
    for (let row = 0; row < 3; row++) {
      const position = this.isHorizontalLineHasNextPlace(gameMap, row);
      if (position) {
        return position;
      }
    }
    return null;
  }

  private isHorizontalLineHasNextPlace(
    gameMap: GameMap,
    row: number
  ): Position | null {
    let hasPlayerCell = false;
    let selectedNextPosition = false;
    let nextPosition: Position = { row: row as Row, column: 0 };
    for (let column = 0; column < 3; column++) {
      if (gameMap[row][column] === this.opponentCell) {
        return null;
      } else if (gameMap[row][column] === this.playerCell) {
        hasPlayerCell = true;
      } else {
        if (!selectedNextPosition) {
          selectedNextPosition = true;
          nextPosition = { row: row as Row, column: column as Column };
        }
      }
    }
    return hasPlayerCell ? nextPosition : null;
  }

  private findNextPlaceOnVerticalLines(gameMap: GameMap): Position | null {
    for (let column = 0; column < 3; column++) {
      const position = this.isVerticalLineHasNextPlace(gameMap, column);
      if (position) {
        return position;
      }
    }
    return null;
  }

  private isVerticalLineHasNextPlace(
    gameMap: GameMap,
    column: number
  ): Position | null {
    let hasPlayerCell = false;
    let selectedNextPosition = false;
    let nextPosition: Position = { row: 0, column: column as Column };
    for (let row = 0; row < 3; row++) {
      if (gameMap[row][column] === this.opponentCell) {
        return null;
      } else if (gameMap[row][column] === this.playerCell) {
        hasPlayerCell = true;
      } else {
        if (!selectedNextPosition) {
          selectedNextPosition = true;
          nextPosition = { row: row as Row, column: column as Column };
          selectedNextPosition = true;
        }
      }
    }
    return hasPlayerCell ? nextPosition : null;
  }

  private findLastPlaceOnVerticalLines(gameMap: GameMap): Position | null {
    for (let column = 0; column < 3; column++) {
      const position = this.isVerticalLineHasLastPlace(gameMap, column);
      if (position) {
        return position;
      }
    }
    return null;
  }

  private isVerticalLineHasLastPlace(
    gameMap: GameMap,
    column: number
  ): Position | null {
    let hasPlayerCell = false;
    let selectedLastPosition = false;
    let lastPosition: Position = { row: 0, column: column as Column };
    for (let row = 0; row < 3; row++) {
      if (gameMap[row][column] === this.opponentCell) {
        return null;
      } else if (gameMap[row][column] === this.playerCell) {
        hasPlayerCell = true;
      } else {
        if (!selectedLastPosition) {
          selectedLastPosition = true;
          lastPosition = { row: row as Row, column: column as Column };
          selectedLastPosition = true;
        } else {
          return null;
        }
      }
    }
    return hasPlayerCell ? lastPosition : null;
  }

  private findNextPlaceOnDiagonalDownLine(gameMap: GameMap): Position | null {
    let hasPlayerCell = false;
    let selectedNextPosition = false;
    let nextPosition: Position = { row: 0, column: 0 };
    for (let index = 0; index < 3; index++) {
      if (gameMap[index][index] === this.opponentCell) {
        return null;
      } else if (gameMap[index][index] === this.playerCell) {
        hasPlayerCell = true;
      } else {
        if (!selectedNextPosition) {
          selectedNextPosition = true;
          nextPosition = { row: index as Row, column: index as Column };
          selectedNextPosition = true;
        }
      }
    }
    return hasPlayerCell ? nextPosition : null;
  }

  private findNextPlaceOnDiagonalUpLine(gameMap: GameMap): Position | null {
    let hasPlayerCell = false;
    let selectedNextPosition = false;
    let nextPosition: Position = { row: 2, column: 0 };
    for (let index = 0; index < 3; index++) {
      if (gameMap[2 - index][index] === this.opponentCell) {
        return null;
      } else if (gameMap[2 - index][index] === this.playerCell) {
        hasPlayerCell = true;
      } else {
        if (!selectedNextPosition) {
          selectedNextPosition = true;
          nextPosition = { row: (2 - index) as Row, column: index as Column };
          selectedNextPosition = true;
        }
      }
    }
    return hasPlayerCell ? nextPosition : null;
  }
}
