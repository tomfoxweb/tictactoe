import { Component, OnInit } from '@angular/core';

interface Cell {
  row: number;
  col: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Tic Tac Toe';
  cells: Cell[] = [];

  ngOnInit(): void {
    this.cells = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell: Cell = { row, col };
        this.cells.push(cell);
      }
    }
  }
}
