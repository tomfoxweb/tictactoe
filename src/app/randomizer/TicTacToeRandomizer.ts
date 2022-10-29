import { Cell, Column, GameMap, Position, Row } from '../game-map';
import { Randomizer } from './randomizer';

export class TicTacToeRandomizer implements Randomizer {
  randomEmptyPosition(gameMap: GameMap): Position | null {
    const emptyPositions: Position[] = [];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (gameMap[row][column] === Cell.EMPTY) {
          emptyPositions.push({ row: row as Row, column: column as Column });
        }
      }
    }
    if (emptyPositions.length === 0) {
      return null;
    }
    const index = Math.trunc(Math.random() * emptyPositions.length);
    return emptyPositions[index];
  }

  randomCornerPosition(gameMap: GameMap): Position | null {
    const cornerPositions: Position[] = [];
    if (gameMap[0][0] === Cell.EMPTY) {
      cornerPositions.push({ row: 0, column: 0 });
    }
    if (gameMap[0][2] === Cell.EMPTY) {
      cornerPositions.push({ row: 0, column: 2 });
    }
    if (gameMap[2][0] === Cell.EMPTY) {
      cornerPositions.push({ row: 2, column: 0 });
    }
    if (gameMap[2][2] === Cell.EMPTY) {
      cornerPositions.push({ row: 2, column: 2 });
    }
    if (cornerPositions.length === 0) {
      return null;
    }
    const index = Math.trunc(Math.random() * cornerPositions.length);
    return cornerPositions[index];
  }
}
