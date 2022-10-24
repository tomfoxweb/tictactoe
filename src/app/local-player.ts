import { Observable } from 'rxjs';
import { CellType, GameMap, Position } from './game-map';
import { PlayerFigure } from './player';

export class LocalPlayer {
  private observable: Observable<Position>;

  constructor(figure: PlayerFigure, observable: Observable<Position>) {
    this.observable = observable;
  }

  async selectPosition(gameMap: GameMap): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      this.observable.subscribe((position: Position) => {
        if (gameMap[position.row][position.column] !== CellType.EMPTY) {
          reject(new Error('Not empty cell position'));
        } else {
          resolve(position);
        }
      });
    });
  }
}
