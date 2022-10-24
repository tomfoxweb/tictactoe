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

  it('should reject position if already used player x, cell = x', async () => {
    const playerFigure = PlayerFigure.X;
    const row: Row = 1;
    const column: Column = 1;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.EMPTY, CellType.X, CellType.EMPTY],
      [CellType.EMPTY, CellType.X, CellType.O],
      [CellType.O, CellType.EMPTY, CellType.EMPTY],
    ];
    await expectAsync(localPlayer.selectPosition(gameMap)).toBeRejected();
  });

  it('should reject position if already used player x, cell = o', async () => {
    const playerFigure = PlayerFigure.X;
    const row: Row = 0;
    const column: Column = 2;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.EMPTY, CellType.EMPTY, CellType.O],
      [CellType.EMPTY, CellType.X, CellType.X],
      [CellType.O, CellType.EMPTY, CellType.EMPTY],
    ];
    await expectAsync(localPlayer.selectPosition(gameMap)).toBeRejected();
  });

  it('should reject position if already used player o, cell = x', async () => {
    const playerFigure = PlayerFigure.X;
    const row: Row = 1;
    const column: Column = 0;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.EMPTY, CellType.EMPTY, CellType.O],
      [CellType.X, CellType.O, CellType.X],
      [CellType.O, CellType.X, CellType.EMPTY],
    ];
    await expectAsync(localPlayer.selectPosition(gameMap)).toBeRejected();
  });

  it('should reject position if already used player o, cell = o', async () => {
    const playerFigure = PlayerFigure.O;
    const row: Row = 2;
    const column: Column = 1;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.EMPTY, CellType.EMPTY, CellType.O],
      [CellType.X, CellType.O, CellType.EMPTY],
      [CellType.X, CellType.O, CellType.X],
    ];
    await expectAsync(localPlayer.selectPosition(gameMap)).toBeRejected();
  });

  it('should reject position if full map player x', async () => {
    const playerFigure = PlayerFigure.X;
    const row: Row = 1;
    const column: Column = 2;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.O, CellType.X, CellType.X],
      [CellType.X, CellType.O, CellType.X],
      [CellType.X, CellType.O, CellType.O],
    ];
    await expectAsync(localPlayer.selectPosition(gameMap)).toBeRejected();
  });

  it('should reject position if full map player o', async () => {
    const playerFigure = PlayerFigure.O;
    const row: Row = 2;
    const column: Column = 2;
    const expectedPosition: Position = { row, column };
    const observable = of<Position>(expectedPosition);
    const localPlayer = new LocalPlayer(playerFigure, observable);
    const gameMap: GameMap = [
      [CellType.X, CellType.O, CellType.O],
      [CellType.X, CellType.X, CellType.X],
      [CellType.O, CellType.X, CellType.O],
    ];
    await expectAsync(localPlayer.selectPosition(gameMap)).toBeRejected();
  });
});
