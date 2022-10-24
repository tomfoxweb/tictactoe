import { Observable } from 'rxjs';
import { PlayerFigure, Position } from './player';

export class LocalPlayer {
  constructor(figure: PlayerFigure, observable: Observable<Position>) {}
}
