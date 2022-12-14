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
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 2 },
  },
  {
    title: 'should select cell for block opponent last on vert line player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.X, Cell.X],
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 2, column: 0 },
  },
  {
    title: 'should select cell for block opponent last on vert line player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 2, column: 1 },
  },
  {
    title: 'should select cell for block opponent last on vert line player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 2 },
  },
  {
    title:
      'should select cell for block opponent last on diag down line player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.O],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 1, column: 1 },
  },
  {
    title:
      'should select cell for block opponent last on diag down line player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.O, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 2, column: 2 },
  },
  {
    title:
      'should select cell for block opponent last on diag up line player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.X, Cell.X, Cell.O],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 2, column: 0 },
  },
  {
    title:
      'should select cell for block opponent last on diag up line player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.O],
      [Cell.X, Cell.O, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 0, column: 2 },
  },
];
