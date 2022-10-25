import { GameMap, Position } from './game-map';

export const enum PlayerFigure {
  X,
  O,
}

export interface Player {
  selectPosition(gameMap: GameMap): Promise<Position>;
}
