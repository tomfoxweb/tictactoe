import { Cell, Column, GameMap, Position, Row } from './game-map';
import { Player, PlayerFigure } from './player';
import { Referee } from './referee';
import { Viewable } from './viewable';

class TestView implements Viewable {
  showCell(row: Row, column: Column, cell: Cell): void {}
  showWin(player: Player): void {}
  showDraw(): void {}
}

describe('Referee newGame', () => {
  let spyViewShowCell: any;

  beforeEach(() => {
    const view = new TestView();
    const referee = new Referee(view);
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
});
