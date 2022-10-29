import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game';
import { LocalPlayer } from './local-player';
import { PlayerFigure } from './player';
import { RandomAIPlayer } from './random-ai/random-ai-player';
import { TicTacToeRandomizer } from './TicTacToeRandomizer';
import { Viewable } from './viewable';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  private game: Game | undefined;
  private playerHumanX: LocalPlayer | undefined;
  private playerHumanO: LocalPlayer | undefined;
  private playerRandomAI: RandomAIPlayer | undefined;

  constructor() {}

  setViewAndObservable(view: Viewable, observable: Observable<Event>) {
    this.game = new Game(view);
    this.playerHumanX = new LocalPlayer(PlayerFigure.X, observable);
    this.playerHumanO = new LocalPlayer(PlayerFigure.O, observable);
  }

  newGameHumanVsHuman() {
    this.game!.start(this.playerHumanX!, this.playerHumanO!);
  }

  newGameHumanVsRandomAI() {
    this.playerRandomAI = new RandomAIPlayer(new TicTacToeRandomizer());
    this.game!.start(this.playerHumanX!, this.playerRandomAI);
  }
}
