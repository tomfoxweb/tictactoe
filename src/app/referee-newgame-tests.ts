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
];
