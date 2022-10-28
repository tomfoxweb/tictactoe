import { Cell, GameMap, Position } from './game-map';
import { PlayerFigure } from './player';
import { RandomAIPlayer } from './random-ai-player';
import { Randomizer } from './randomizer';

class TestRandomizer implements Randomizer {
  public position: Position = { row: 0, column: 0 };
  public returnPosition = true;

  randomEmptyPosition(gameMap: GameMap): Position | null {
    if (this.returnPosition) {
      return this.position;
    }
    return null;
  }
}

describe('RandomAIPlayer', () => {
  it('should select random free position for player X', async () => {
    const randomizer = new TestRandomizer();
    const expectedPosition: Position = { row: 2, column: 1 };
    randomizer.position = expectedPosition;
    randomizer.returnPosition = true;
    const player = new RandomAIPlayer(randomizer);
    player.setFigure(PlayerFigure.X);
    const gameMap: GameMap = [
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ];
    const actualPosition = await player.selectPosition(gameMap);
    expect(actualPosition).toEqual(expectedPosition);
  });
});
