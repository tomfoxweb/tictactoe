import { Cell, GameMap, Position } from './game-map';
import { PlayerFigure } from './player';

export interface RandomAIPlayerTest {
  title: string;
  figure: PlayerFigure;
  gameMap: GameMap;
  returnPosition: boolean;
  position?: Position;
}

export const randomAIPlayerTests: RandomAIPlayerTest[] = [
  {
    title: 'should select random free position for player X start game',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    position: { row: 2, column: 1 },
  },
];
