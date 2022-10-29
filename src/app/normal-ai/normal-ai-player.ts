import { Cell, GameMap, Position } from '../game-map';
import { Player, PlayerFigure } from '../player';
import { Randomizer } from '../randomizer';

export class NormalAIPlayer implements Player {
  private randomizer: Randomizer;

  constructor(randomizer: Randomizer) {
    this.randomizer = randomizer;
  }

  setFigure(figure: PlayerFigure): void {}

  selectPosition(gameMap: GameMap): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      let position: Position | null;
      if (this.isEmptyMap(gameMap)) {
        position = { row: 1, column: 1 };
      } else {
        position = this.randomizer.randomEmptyPosition(gameMap);
        if (!position) {
          reject(new Error('No empty position on map'));
        }
      }
      resolve(position!);
    });
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
}
