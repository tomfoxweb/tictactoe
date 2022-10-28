import { GameMap, Position } from './game-map';
import { Player, PlayerFigure } from './player';
import { Randomizer } from './randomizer';

export class RandomAIPlayer implements Player {
  private randomizer: Randomizer;

  constructor(randomizer: Randomizer) {
    this.randomizer = randomizer;
  }

  setFigure(figure: PlayerFigure): void {}

  selectPosition(gameMap: GameMap): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      const position = this.randomizer.randomEmptyPosition(gameMap);
      if (!position) {
        reject(new Error('No empty position on map'));
      } else {
        resolve(position);
      }
    });
  }
}
