import { TestRandomizer } from '../randomizer/test-randomizer';
import { HardAIPlayer } from './hard-ai-player';
import { hardAIPlayerTests } from './hard-ai-player-tests';

describe('HardAIPlayer', () => {
  let randomizer: TestRandomizer;
  let player: HardAIPlayer;
  beforeEach(() => {
    randomizer = new TestRandomizer();
    player = new HardAIPlayer(randomizer);
  });

  const tests = hardAIPlayerTests;
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
