import { GameMap, Position } from './game-map';

export interface Randomizer {
  randomEmptyPosition(gameMap: GameMap): Position | null;
}
