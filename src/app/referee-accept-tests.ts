import { Cell, Column, GameMap, Position, Row } from './game-map';
import { PlayerFigure } from './player';
import { GameStatus } from './referee';

export interface RefereeAcceptTest {
  title: string;
  gameMap?: GameMap;
  args: { playerFigure: PlayerFigure; position: Position };
  accepted: boolean;
  showPosition?: { row: Row; column: Column; cell: Cell };
  status: GameStatus;
}

export const refereeAcceptTests: RefereeAcceptTest[] = [
  {
    title: 'should call showCell and switch game status',
    args: { playerFigure: PlayerFigure.X, position: { row: 1, column: 1 } },
    accepted: true,
    showPosition: { row: 1, column: 1, cell: Cell.X },
    status: GameStatus.awaitSecondPlayer,
  },
  {
    title: 'should call showCell for cell o',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.X],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 1, column: 1 } },
    accepted: true,
    showPosition: { row: 1, column: 1, cell: Cell.O },
    status: GameStatus.awaitFirstPlayer,
  },
  {
    title: 'should not accept position for O on same place as X',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 1, column: 0 } },
    accepted: false,
    status: GameStatus.incorrectPlayerOPosition,
  },
  {
    title: 'should not accept position for X on same place as O',
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 2, column: 1 } },
    accepted: false,
    status: GameStatus.incorrectPlayerXPosition,
  },
  {
    title: 'should not accept position for X on same place as X',
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.EMPTY, Cell.X],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 2, column: 2 } },
    accepted: false,
    status: GameStatus.incorrectPlayerXPosition,
  },
  {
    title: 'should not accept position for O on same place as O',
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.O, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 1, column: 0 } },
    accepted: false,
    status: GameStatus.incorrectPlayerOPosition,
  },
  {
    title: 'should accept position for X after multiple turns',
    gameMap: [
      [Cell.X, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 1, column: 2 } },
    accepted: true,
    status: GameStatus.awaitSecondPlayer,
  },
  {
    title: 'should accept position for O after multiple turns',
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.O, Cell.X, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 2, column: 2 } },
    accepted: true,
    status: GameStatus.awaitFirstPlayer,
  },
  {
    title: 'should accept position for X win horizontal row 1',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
      [Cell.X, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 1, column: 2 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win horizontal row 0',
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 0, column: 1 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win horizontal row 2',
    gameMap: [
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.X],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 2, column: 0 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win vertical column 0',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.O, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 0, column: 0 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win vertical column 1',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.EMPTY, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 1, column: 1 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win vertical column 2',
    gameMap: [
      [Cell.EMPTY, Cell.O, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.X],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 2, column: 2 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win down diagonal',
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 2, column: 2 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for X win up diagonal',
    gameMap: [
      [Cell.O, Cell.O, Cell.X],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 1, column: 1 } },
    accepted: true,
    status: GameStatus.firstPlayerWin,
  },
  {
    title: 'should accept position for O win row 0',
    gameMap: [
      [Cell.O, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.X],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 0, column: 2 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win row 1',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.O, Cell.EMPTY, Cell.O],
      [Cell.X, Cell.X, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 1, column: 1 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win row 2',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 2, column: 0 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win column 0',
    gameMap: [
      [Cell.O, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.X],
      [Cell.O, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 1, column: 0 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win column 1',
    gameMap: [
      [Cell.X, Cell.O, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 2, column: 1 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win column 2',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 0, column: 2 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win down diagonal',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.O],
      [Cell.X, Cell.EMPTY, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 0, column: 0 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for O win up diagonal',
    gameMap: [
      [Cell.X, Cell.EMPTY, Cell.O],
      [Cell.X, Cell.O, Cell.X],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    args: { playerFigure: PlayerFigure.O, position: { row: 2, column: 0 } },
    accepted: true,
    status: GameStatus.secondPlayerWin,
  },
  {
    title: 'should accept position for X draw',
    gameMap: [
      [Cell.X, Cell.X, Cell.O],
      [Cell.O, Cell.X, Cell.X],
      [Cell.EMPTY, Cell.O, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 2, column: 0 } },
    accepted: true,
    status: GameStatus.draw,
  },
  {
    title: 'should accept position for X draw #2',
    gameMap: [
      [Cell.X, Cell.O, Cell.O],
      [Cell.O, Cell.X, Cell.EMPTY],
      [Cell.X, Cell.X, Cell.O],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 1, column: 2 } },
    accepted: true,
    status: GameStatus.draw,
  },
  {
    title: 'should accept position for X draw #3',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.O, Cell.O, Cell.O],
      [Cell.X, Cell.X, Cell.X],
    ],
    args: { playerFigure: PlayerFigure.X, position: { row: 0, column: 0 } },
    accepted: true,
    status: GameStatus.draw,
  },
];
