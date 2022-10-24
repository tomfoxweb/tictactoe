import { of } from 'rxjs';
import { LocalPlayer } from './local-player';
import { PlayerFigure, Position } from './player';

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
});
