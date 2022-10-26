import { Cell, Column, GameMap, Row } from './game-map';
import { Player } from './player';
import { GameStatus, Referee } from './referee';
import { Viewable } from './viewable';

class TestView implements Viewable {
  showCell(row: Row, column: Column, cell: Cell): void {}
  showWin(player: Player): void {}
  showDraw(): void {}
}

describe('Referee newGame with empty map', () => {
  let spyViewShowCell: any;
  let referee: Referee;

  beforeEach(() => {
    const view = new TestView();
    referee = new Referee(view);
    spyViewShowCell = spyOn(view, 'showCell');
    referee.newGame();
  });
  it('should call view showCell with empty for all cells', () => {
    const cell = Cell.EMPTY;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        expect(spyViewShowCell).toHaveBeenCalledWith(row, column, cell);
      }
    }
  });

  it('should set game status to await first player', () => {
    const status = referee.getStatus();
    expect(status).toBe(GameStatus.awaitFirstPlayer);
  });
});

describe('Referee newGame with map', () => {
  let spyViewShowCell: any;
  let referee: Referee;
  const gameMap: GameMap = [
    [Cell.EMPTY, Cell.X, Cell.EMPTY],
    [Cell.EMPTY, Cell.X, Cell.EMPTY],
    [Cell.O, Cell.O, Cell.EMPTY],
  ];

  beforeEach(() => {
    const view = new TestView();
    referee = new Referee(view);
    spyViewShowCell = spyOn(view, 'showCell');
    referee.newGame(gameMap);
  });
  it('should call correct view showCell for all cells', () => {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const cell = gameMap[row][column];
        expect(spyViewShowCell).toHaveBeenCalledWith(row, column, cell);
      }
    }
  });

  it('should set game status to await first player', () => {
    const status = referee.getStatus();
    expect(status).toBe(GameStatus.awaitFirstPlayer);
  });
});
