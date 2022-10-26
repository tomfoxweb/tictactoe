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
];
