import { Cell, Column, GameMap, Position, Row } from './game-map';
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
}
