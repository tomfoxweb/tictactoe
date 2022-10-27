import { Observable } from 'rxjs';
import { Cell, Column, GameMap, Position, Row } from './game-map';
import { Player, PlayerFigure } from './player';

export class LocalPlayer implements Player {
  private observable: Observable<Event>;

  constructor(figure: PlayerFigure, observable: Observable<Event>) {
    this.observable = observable;
  }
  setFigure(figure: PlayerFigure): void {}

  async selectPosition(gameMap: GameMap): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      this.observable.subscribe((event: Event) => {
        const button = event.target as HTMLElement;
        const row = Number(button.dataset['row']!) as Row;
        const column = Number(button.dataset['column']!) as Column;
        if (gameMap[row][column] !== Cell.EMPTY) {
          reject(new Error('Not empty cell position'));
        } else {
          resolve({ row, column });
        }
      });
    });
  }
}
