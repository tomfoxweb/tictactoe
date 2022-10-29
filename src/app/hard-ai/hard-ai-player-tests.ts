import { AIPlayerTest } from '../ai-player-test';
import { Cell } from '../game-map';
import { PlayerFigure } from '../player';

export const hardAIPlayerTests: AIPlayerTest[] = [
  {
    title: 'should select cell for block opponent last on horiz line',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.O, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 0, column: 2 },
  },
];
