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
  {
    title: 'should select cell for block opponent last on horiz line player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.X],
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 0 },
  },
  {
    title: 'should select cell for block opponent last on horiz line player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.O, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 2 },
  },
];
