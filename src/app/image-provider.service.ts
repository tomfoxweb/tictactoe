import { Injectable } from '@angular/core';
import { Cell } from './game-map';

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  constructor() {}

  getImage(cell: Cell): string {
    if (cell === Cell.X) {
      return 'assets/images/x.svg';
    } else if (cell === Cell.O) {
      return 'assets/images/o.svg';
    } else {
      return 'assets/images/empty.svg';
    }
  }
}
