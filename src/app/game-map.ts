export type Row = 0 | 1 | 2;
export type Column = 0 | 1 | 2;

export const ROW_COUNT = 3;
export const COLUMN_COUNT = 3;

export interface Position {
  row: Row;
  column: Column;
}

export const enum Cell {
  EMPTY,
  X,
  O,
}

export type GameMap = [
  [Cell, Cell, Cell],
  [Cell, Cell, Cell],
  [Cell, Cell, Cell]
];
