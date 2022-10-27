import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './game';
import { LocalPlayer } from './local-player';
import { PlayerFigure } from './player';
import { Viewable } from './viewable';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  private game: Game | undefined;
  private playerX: LocalPlayer | undefined;
  private playerO: LocalPlayer | undefined;

  constructor() {}

  setViewAndObservable(view: Viewable, observable: Observable<Event>) {
    this.game = new Game(view);
    this.playerX = new LocalPlayer(PlayerFigure.X, observable);
    this.playerO = new LocalPlayer(PlayerFigure.O, observable);
  }

  newGame() {
    this.game!.start(this.playerX!, this.playerO!);
  }
}
