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
    if (this.isEmptyMap(gameMap)) {
      return { row: 1, column: 1 };
    }
    if (this.isCenterEmptyAndPlacedOneCell(gameMap)) {
      return { row: 1, column: 1 };
    }
    let position = this.findRandomCornerIfCenterPlaced(gameMap);
    if (position) {
      return position;
    }
    position = this.findNextPlaceOnHorizontalLines(gameMap);
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
          selectedNextPosition = true;
        }
      }
    }
    return hasPlayerCell ? nextPosition : null;
  }
}
