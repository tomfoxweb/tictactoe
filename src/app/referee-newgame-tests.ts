import { Cell, GameMap } from './game-map';
import { GameStatus } from './referee';

export interface RefereeNewGameTest {
  title: string;
  gameMap: GameMap;
  started: boolean;
  status: GameStatus;
}

export const refereeNewGameTests: RefereeNewGameTest[] = [
  {
    title: 'should call start with status await first show all empty',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    started: true,
    status: GameStatus.awaitFirstPlayer,
  },
  {
    title: 'should start with status await second show all empty but first',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    started: true,
    status: GameStatus.awaitSecondPlayer,
  },
];
