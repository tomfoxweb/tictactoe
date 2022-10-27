import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { ControllerService } from './controller.service';
import { Row, Column, Cell } from './game-map';
import { PlayerFigure } from './player';
import { Viewable } from './viewable';

interface ViewCell {
  row: Row;
  column: Column;
  cell: Cell;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, Viewable {
  title = 'Tic Tac Toe';
  viewCells: ViewCell[] = [];

  constructor(private controller: ControllerService) {
    this.viewCells = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x: ViewCell = {
          row: row as Row,
          column: col as Column,
          cell: Cell.EMPTY,
        };
        this.viewCells.push(x);
      }
    }
  }
  ngAfterViewInit(): void {
    const buttonsCell = document.querySelectorAll('.button-cell');
    console.log(buttonsCell);
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
