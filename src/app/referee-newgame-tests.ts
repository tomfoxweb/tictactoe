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
  {
    title: 'should not start if one cell O',
    gameMap: [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.O, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ],
    status: GameStatus.incorrectMap,
    started: false,
  },
  {
    title: 'should not start if 3 cell X',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.X, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.X],
    ],
    status: GameStatus.incorrectMap,
    started: false,
  },
  {
    title: 'should not start if X - O === 2',
    gameMap: [
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.EMPTY, Cell.X, Cell.O],
      [Cell.X, Cell.EMPTY, Cell.X],
    ],
    status: GameStatus.incorrectMap,
    started: false,
  },
];
