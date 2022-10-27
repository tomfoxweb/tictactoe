import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { ControllerService } from './controller.service';
import { Row, Column, Cell } from './game-map';
import { ImageProviderService } from './image-provider.service';
import { PlayerFigure } from './player';
import { Viewable } from './viewable';

interface ViewCell {
  row: Row;
  column: Column;
  cell: Cell;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, Viewable {
  title = 'Tic Tac Toe';
  viewCells: ViewCell[] = [];

  constructor(
    private controller: ControllerService,
    private imageProvider: ImageProviderService
  ) {
    this.viewCells = [];
    const src = this.imageProvider.getImage(Cell.EMPTY);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x: ViewCell = {
          row: row as Row,
          column: col as Column,
          cell: Cell.EMPTY,
          src: src,
          alt: 'empty',
        };
        this.viewCells.push(x);
      }
    }
  }

  ngAfterViewInit(): void {
    const buttonsCell = document.querySelectorAll('.button-cell');
    const observable = fromEvent(buttonsCell, 'click');
    this.controller.setViewAndObservable(this, observable);
    this.newGame();
  }

  ngOnInit(): void {}

  newGame() {
    this.controller.newGame();
  }

  showCell(row: Row, column: Column, cell: Cell): void {
    const index = row * 3 + column;
    this.viewCells[index].cell = cell;
    this.viewCells[index].src = this.imageProvider.getImage(cell);
    let alt = 'empty';
    if (cell === Cell.X) {
      alt = 'X';
    } else if (cell === Cell.O) {
      alt = 'O';
    }
    this.viewCells[index].alt = alt;
  }

  showWin(playerFigure: PlayerFigure): void {
    window.setTimeout(() => {
      const figureText = playerFigure === PlayerFigure.X ? 'X' : 'O';
      alert(`Player ${figureText} win!`);
    }, 100);
  }

  showDraw(): void {
    window.setTimeout(() => {
      alert('Draw!');
    }, 100);
  }
}
