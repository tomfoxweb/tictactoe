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
  {
    title: 'should select corner 0 0 player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 2, column: 2 },
    randomCornerPosition: { row: 0, column: 0 },
    selectedPosition: { row: 0, column: 0 },
  },
  {
    title: 'should select corner 0 2 player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 0, column: 2 },
    selectedPosition: { row: 0, column: 2 },
  },
  {
    title: 'should select corner 2 2 player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 1, column: 0 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 2, column: 2 },
  },
  {
    title: 'should select corner 2 0 player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: false,
    returnCorner: true,
    randomPosition: { row: 2, column: 1 },
    randomCornerPosition: { row: 2, column: 0 },
    selectedPosition: { row: 2, column: 0 },
  },
  {
    title: 'should select next horizontal cell player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 2, column: 2 },
    randomCornerPosition: { row: 1, column: 2 },
    selectedPosition: { row: 0, column: 1 },
  },
  {
    title: 'should select next horizontal cell player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 2, column: 2 },
    randomCornerPosition: { row: 1, column: 2 },
    selectedPosition: { row: 2, column: 1 },
  },
  {
    title: 'should select last horizontal cell player O',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 2, column: 1 },
    randomCornerPosition: { row: 1, column: 0 },
    selectedPosition: { row: 0, column: 2 },
  },
  {
    title: 'should select last horizontal cell player X',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.X],
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 2, column: 2 },
    randomCornerPosition: { row: 2, column: 1 },
    selectedPosition: { row: 0, column: 1 },
  },
  {
    title: 'should select last horizontal cell player X bottom line',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.O],
      [Cell.X, Cell.X, Cell.O],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 2, column: 1 },
  },
  {
    title: 'should select last horizontal cell player X center line',
    figure: PlayerFigure.X,
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 1, column: 2 },
  },
  {
    title: 'should select last horizontal cell player O center line',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.X, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.O],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 1, column: 0 },
  },
  {
    title: 'should select last horizontal cell player O top line',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 0, column: 2 },
  },
  {
    title: 'should select last horizontal cell player O bottom line',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.X],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.O, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 2, column: 2 },
  },
  {
    title: 'should select vertical cell player O left line',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.O, Cell.X, Cell.X],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 1, column: 0 },
  },
  {
    title: 'should select vertical cell player O center line',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.O, Cell.EMPTY],
      [Cell.X, Cell.O, Cell.X],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 0, column: 1 },
  },
  {
    title: 'should select vertical cell player O right line',
    figure: PlayerFigure.O,
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.X, Cell.O, Cell.O],
    ],
    returnPosition: true,
    returnCorner: false,
    randomPosition: { row: 0, column: 1 },
    randomCornerPosition: { row: 2, column: 2 },
    selectedPosition: { row: 1, column: 2 },
  },
];
