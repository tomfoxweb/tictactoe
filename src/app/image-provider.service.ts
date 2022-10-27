import { Injectable } from '@angular/core';
import { Cell } from './game-map';

export interface ImageInfo {
  cell: Cell;
  src: string;
  alt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private images: ImageInfo[] = [
    {
      cell: Cell.EMPTY,
      src: 'assets/images/empty.svg',
      alt: 'empty',
    },
    {
      cell: Cell.X,
      src: 'assets/images/x.svg',
      alt: 'X',
    },
    {
      cell: Cell.O,
      src: 'assets/images/o.svg',
      alt: 'O',
    },
  ];

  constructor() {}

  getImageInfo(cell: Cell): ImageInfo {
    return this.images.find((image) => image.cell === cell)!;
  }
}
