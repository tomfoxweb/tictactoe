import { Game } from './game';
import { Row, Column, CellType, GameMap, Position } from './game-map';
import { Player } from './player';
import { Viewable } from './viewable';

class TestView implements Viewable {
  showCell(row: Row, column: Column, cell: CellType): void {}
  showWin(player: Player): void {}
  showDraw(): void {}
}

class TestPlayer implements Player {
  selectPosition(gameMap: GameMap): Promise<Position> {
    return Promise.resolve({ row: 0, column: 0 });
  }
}

describe('Game constructor', () => {
  it('should accept view parameter', () => {
    const view = new TestView();
    const game = new Game(view);
    expect(game).toBeDefined();
  });
});
