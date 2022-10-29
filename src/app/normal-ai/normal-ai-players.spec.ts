import { TestRandomizer } from '../randomizer/test-randomizer';
import { NormalAIPlayer } from './normal-ai-player';
import { normalAIPlayerTests } from './normal-ai-player-tests';

describe('NormalAIPlayer', () => {
  let randomizer: TestRandomizer;
  let player: NormalAIPlayer;
  beforeEach(() => {
    randomizer = new TestRandomizer();
    player = new NormalAIPlayer(randomizer);
  });

  const tests = normalAIPlayerTests;
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
