import { GameMap, Position } from './game-map';
import { PlayerFigure } from './player';

export interface AIPlayerTest {
  title: string;
  figure: PlayerFigure;
  gameMap: GameMap;
  returnPosition: boolean;
  randomPosition: Position;
  selectedPosition?: Position;
}
