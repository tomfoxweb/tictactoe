import { Game } from './game';
import { Row, Column, CellType, GameMap, Position } from './game-map';
import { Player, PlayerFigure } from './player';
import { Viewable } from './viewable';

class TestView implements Viewable {
  showCell(row: Row, column: Column, cell: CellType): void {}
  showWin(player: Player): void {}
  showDraw(): void {}
}

class TestPlayer implements Player {
  setFigure(figure: PlayerFigure): void {}

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

describe('Game start', () => {
  let game: Game;
  let view: TestView;
  let firstPlayer: TestPlayer;
  let secondPlayer: TestPlayer;
  let spyFirstPlayerSetFigure: any;
  let spySecondPlayerSetFigure: any;

  beforeEach(() => {
    view = new TestView();
    game = new Game(view);
    firstPlayer = new TestPlayer();
    secondPlayer = new TestPlayer();
    spyFirstPlayerSetFigure = spyOn(firstPlayer, 'setFigure');
    spySecondPlayerSetFigure = spyOn(secondPlayer, 'setFigure');
    game.start(firstPlayer, secondPlayer);
  });

  it('should call setFigure for first and second players', () => {
    expect(spyFirstPlayerSetFigure).toHaveBeenCalledWith(PlayerFigure.X);
    expect(spySecondPlayerSetFigure).toHaveBeenCalledWith(PlayerFigure.O);
  });
});
