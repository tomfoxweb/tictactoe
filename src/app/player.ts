import { GameMap, Position } from './game-map';

export const enum PlayerFigure {
  X,
  O,
}

export interface Player {
  setFigure(figure: PlayerFigure): void;
  selectPosition(gameMap: Readonly<GameMap>): Promise<Position>;
}
