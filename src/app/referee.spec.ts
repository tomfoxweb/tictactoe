import { Cell, Column, GameMap, Position, Row } from './game-map';
import { Player, PlayerFigure } from './player';
import { GameStatus, Referee } from './referee';
import { refereeAcceptTests } from './referee-accept-tests';
import { refereeNewGameTests } from './referee-newgame-tests';
import { Viewable } from './viewable';

class TestView implements Viewable {
  showCell(row: Row, column: Column, cell: Cell): void {}
  showWin(player: Player): void {}
  showDraw(): void {}
}

describe('Referee newGame', () => {
  let spyViewShowCell: any;
  let referee: Referee;

  beforeEach(() => {
    const view = new TestView();
    referee = new Referee(view);
    spyViewShowCell = spyOn(view, 'showCell');
  });

  const tests = refereeNewGameTests;

  tests.forEach((test) => {
    it(test.title, () => {
      const started = referee.newGame(test.gameMap);
      const status = referee.getStatus();
      expect(started).toBe(test.started);
      expect(status).toBe(test.status);
      if (test.started) {
        for (let row = 0; row < 3; row++) {
          for (let column = 0; column < 3; column++) {
            const cell = test.gameMap[row][column];
            expect(spyViewShowCell).toHaveBeenCalledWith(row, column, cell);
          }
        }
      } else {
        expect(spyViewShowCell).not.toHaveBeenCalled();
      }
    });
  });
});

describe('Referee acceptPosition', () => {
  let spyViewShowCell: any;
  let referee: Referee;

  beforeEach(() => {
    const view = new TestView();
    referee = new Referee(view);
    spyViewShowCell = spyOn(view, 'showCell');
  });

  const tests = refereeAcceptTests;
  tests.forEach((test) => {
    it(test.title, () => {
      referee.newGame(test.gameMap);
      const accepted = referee.acceptPosition(
        test.args.playerFigure,
        test.args.position
      );
      expect(accepted).toBe(test.accepted);
      if (test.showPosition) {
        expect(spyViewShowCell).toHaveBeenCalledWith(
          test.showPosition.row,
          test.showPosition.column,
          test.showPosition.cell
        );
      }
      expect(referee.getStatus()).toBe(test.status);
    });
  });
});
