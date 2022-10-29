import { AIPlayerTest } from '../ai-player-test';
import { Cell } from '../game-map';
import { PlayerFigure } from '../player';

export const normalAIPlayerTests: AIPlayerTest[] = [
  {
    title: 'should select cell at center for player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 1 },
  },
];
