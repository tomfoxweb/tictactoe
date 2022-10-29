import { GameMap, Position } from '../game-map';
import { Randomizer } from './randomizer';

export class TestRandomizer implements Randomizer {
  public position?: Position;
  public corner?: Position;
  public returnPosition = true;
  public returnCorner = true;

  randomEmptyPosition(gameMap: GameMap): Position | null {
    if (this.returnPosition && this.position) {
      return this.position;
    }
    return null;
  }

  randomCornerPosition(gameMap: GameMap): Position | null {
    if (this.returnCorner && this.corner) {
      return this.corner;
    }
    return null;
  }
}
