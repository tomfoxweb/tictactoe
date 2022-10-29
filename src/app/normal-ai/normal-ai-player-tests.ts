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
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 1 },
  },
  {
    title: 'should select cell at center for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.X],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 1, column: 0 },
    selectedPosition: { row: 1, column: 1 },
  },
  {
    title: 'should select cell at corner 0 0 for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 1, column: 0 },
    randomCornerPosition: { row: 0, column: 0 },
    selectedPosition: { row: 0, column: 0 },
  },
  {
    title: 'should select cell at corner 2 2 for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 2, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 2, column: 2 },
  },
  {
    title: 'should select cell at corner 0 2 for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 0, column: 0 },
    randomCornerPosition: { row: 0, column: 2 },
    selectedPosition: { row: 0, column: 2 },
  },
  {
    title: 'should select cell at corner 2 0 for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 2, column: 2 },
    randomCornerPosition: { row: 2, column: 0 },
    selectedPosition: { row: 2, column: 0 },
  },
];
