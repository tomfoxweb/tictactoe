import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game';
import { HardAIPlayer } from './hard-ai/hard-ai-player';
import { LocalPlayer } from './local-player';
import { NormalAIPlayer } from './normal-ai/normal-ai-player';
import { PlayerFigure } from './player';
import { RandomAIPlayer } from './random-ai/random-ai-player';
import { TicTacToeRandomizer } from './randomizer/TicTacToeRandomizer';
import { Viewable } from './viewable';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  private game: Game | undefined;
  private playerHumanX: LocalPlayer | undefined;
  private playerHumanO: LocalPlayer | undefined;
  private playerRandomAI: RandomAIPlayer | undefined;
  private playerNormalAI: NormalAIPlayer | undefined;
  private playerHardAI: HardAIPlayer | undefined;

  constructor() {}

  setViewAndObservable(view: Viewable, observable: Observable<Event>) {
    this.game = new Game(view);
    this.playerHumanX = new LocalPlayer(PlayerFigure.X, observable);
    this.playerHumanO = new LocalPlayer(PlayerFigure.O, observable);
  }

  newGameHumanVsHuman() {
    this.game!.start(this.playerHumanX!, this.playerHumanO!);
  }

  newGameHumanVsRandomAI(playerFigure: PlayerFigure) {
    this.playerRandomAI = new RandomAIPlayer(new TicTacToeRandomizer());
    if (playerFigure === PlayerFigure.X) {
      this.game!.start(this.playerHumanX!, this.playerRandomAI);
    } else {
      this.game!.start(this.playerRandomAI, this.playerHumanO!);
    }
  }

  newGameHumanVsNormalAI(playerFigure: PlayerFigure) {
    this.playerNormalAI = new NormalAIPlayer(new TicTacToeRandomizer());
    if (playerFigure === PlayerFigure.X) {
      this.game!.start(this.playerHumanX!, this.playerNormalAI);
    } else {
      this.game!.start(this.playerNormalAI, this.playerHumanO!);
    }
  }

  newGameHumanVsHardAI(playerFigure: PlayerFigure) {
    this.playerHardAI = new HardAIPlayer(new TicTacToeRandomizer());
    if (playerFigure === PlayerFigure.X) {
      this.game!.start(this.playerHumanX!, this.playerHardAI);
    } else {
      this.game!.start(this.playerHardAI, this.playerHumanO!);
    }
  }
}
