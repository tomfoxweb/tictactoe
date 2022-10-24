import { Observable } from 'rxjs';
import { GameMap, Position } from './game-map';
import { PlayerFigure } from './player';

export class LocalPlayer {
  private observable: Observable<Position>;

  constructor(figure: PlayerFigure, observable: Observable<Position>) {
    this.observable = observable;
  }

  async selectPosition(gameMap: GameMap): Promise<Position> {
    return new Promise<Position>((resolve) => {
      this.observable.subscribe((position: Position) => resolve(position));
    });
  }
}
