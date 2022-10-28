import { GameMap, Position } from './game-map';
import { RandomAIPlayer } from './random-ai-player';
import { randomAIPlayerTests } from './random-ai-player-tests';
import { Randomizer } from './randomizer';

class TestRandomizer implements Randomizer {
  public position?: Position;
  public returnPosition = true;

  randomEmptyPosition(gameMap: GameMap): Position | null {
    if (this.returnPosition && this.position) {
      return this.position;
    }
    return null;
  }
}

describe('RandomAIPlayer', () => {
  let randomizer: TestRandomizer;
  let player: RandomAIPlayer;
  beforeEach(() => {
    randomizer = new TestRandomizer();
    player = new RandomAIPlayer(randomizer);
  });

  const tests = randomAIPlayerTests;
  tests.forEach((test) => {
    it(test.title, async () => {
      randomizer.returnPosition = test.returnPosition;
      if (test.returnPosition) {
        randomizer.position = test.position;
      }
      player.setFigure(test.figure);
      const promise = player.selectPosition(test.gameMap);
      if (test.returnPosition) {
        await expectAsync(promise).toBeResolvedTo(test.position!);
      } else {
        await expectAsync(promise).toBeRejected();
      }
    });
  });
});
