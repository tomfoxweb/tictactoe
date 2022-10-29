import { GameMap, Position } from './game-map';
import { Randomizer } from './randomizer';

export class TestRandomizer implements Randomizer {
  public position?: Position;
  public returnPosition = true;

  randomEmptyPosition(gameMap: GameMap): Position | null {
    if (this.returnPosition && this.position) {
      return this.position;
    }
    return null;
  }
}
