import { randomAIPlayerTests } from './random-ai-player-tests';
import { TestRandomizer } from '../randomizer/test-randomizer';
import { RandomAIPlayer } from './random-ai-player';

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
      randomizer.returnCorner = test.returnCorner;
      if (test.returnPosition) {
        randomizer.position = test.randomPosition;
      } else if (test.returnCorner) {
        randomizer.corner = test.randomCornerPosition;
      }
      player.setFigure(test.figure);
      const promise = player.selectPosition(test.gameMap);
      if (test.returnPosition) {
        await expectAsync(promise).toBeResolvedTo(test.selectedPosition!);
      } else if (test.returnCorner) {
        await expectAsync(promise).toBeResolvedTo(test.selectedPosition!);
      } else {
        await expectAsync(promise).toBeRejected();
      }
    });
  });
});
