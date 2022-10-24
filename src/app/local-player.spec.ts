import { of } from 'rxjs';
import { CellType, Column, GameMap, Position, Row } from './game-map';
import { LocalPlayer } from './local-player';
import { PlayerFigure } from './player';

describe('Local player', () => {
  it('should accept observable and Figure X in constructor', () => {
    const playerFigure = PlayerFigure.X;
    const observable = of<Position>({ row: 0, column: 0 });
    const localPlayer = new LocalPlayer(playerFigure, observable);
    expect(localPlayer).toBeDefined();
  });

  it('should accept observable and Figure O in constructor', () => {
    const playerFigure = PlayerFigure.O;
    const observable = of<Position>({ row: 1, column: 1 });
    const localPlayer = new LocalPlayer(playerFigure, observable);
    expect(localPlayer).toBeDefined();
  });

  it('should use observable position in selectPosition', async () => {
    const playerFigure = PlayerFigure.X;
    const row = Math.trunc(Math.random() * 3) as Row;
    const column = Math.trunc(Math.random() * 3) as Column;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.EMPTY, CellType.EMPTY, CellType.EMPTY],
      [CellType.EMPTY, CellType.EMPTY, CellType.EMPTY],
      [CellType.EMPTY, CellType.EMPTY, CellType.EMPTY],
    ];
    const actualPosition = await localPlayer.selectPosition(gameMap);
    expect(actualPosition).toEqual(expectedPosition);
  });
});
