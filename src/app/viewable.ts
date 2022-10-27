import { Cell, Column, Row } from './game-map';
import { Player, PlayerFigure } from './player';

export interface Viewable {
  showCell(row: Row, column: Column, cell: Cell): void;
  showWin(playerFigure: PlayerFigure): void;
  showDraw(): void;
}
