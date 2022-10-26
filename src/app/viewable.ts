import { Cell, Column, Row } from './game-map';
import { Player } from './player';

export interface Viewable {
  showCell(row: Row, column: Column, cell: Cell): void;
  showWin(player: Player): void;
  showDraw(): void;
}
