import { AIPlayerTest } from '../ai-player-test';
import { Cell } from '../game-map';
import { PlayerFigure } from '../player';

export const randomAIPlayerTests: AIPlayerTest[] = [
  {
    title: 'should select random free position for player X start game',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 2, column: 1 },
    selectedPosition: { row: 2, column: 1 },
  },
  {
    title: 'should select random free position for player O start game',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 2 },
    selectedPosition: { row: 0, column: 2 },
  },
  {
    title: 'should select random free position for player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.X],
      [Cell.X, Cell.O, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 2, column: 2 },
    selectedPosition: { row: 2, column: 2 },
  },
  {
    title: 'should select random free position for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.O, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    selectedPosition: { row: 0, column: 1 },
  },
  {
    title: 'should throw error no empty for player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.O, Cell.X],
      [Cell.X, Cell.X, Cell.O],
      [Cell.O, Cell.X, Cell.X],
    ],
    returnPosition: false,
    returnCorner: false,
    randomPosition: { row: 2, column: 2 },
  },
  {
    title: 'should throw error no empty for player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.X, Cell.X, Cell.O],
      [Cell.O, Cell.O, Cell.X],
      [Cell.X, Cell.O, Cell.X],
    ],
    returnPosition: false,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
  },
];
