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

  async preloadImages(): Promise<void> {
    const loadPromises = this.images.map((image) => this.loadImage(image.src));
    await Promise.all(loadPromises);
  }

  getImageInfo(cell: Cell): ImageInfo {
    return this.images.find((image) => image.cell === cell)!;
  }

  private loadImage(url: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => {
        resolve();
      });
    });
  }
}
