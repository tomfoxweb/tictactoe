import { CellType, Column, Row } from './game-map';
import { Player } from './player';

export interface Viewable {
  showCell(row: Row, column: Column, cell: CellType): void;
  showWin(player: Player): void;
  showDraw(): void;
}
