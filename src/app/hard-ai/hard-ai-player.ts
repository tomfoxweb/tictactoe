import { Column, GameMap, Position, Row } from '../game-map';
import { NormalAIPlayer } from '../normal-ai/normal-ai-player';
import { Randomizer } from '../randomizer/randomizer';

export class HardAIPlayer extends NormalAIPlayer {
  constructor(randomizer: Randomizer) {
    super(randomizer);
  }

  protected override selectPositionImpl(gameMap: GameMap): Position | null {
    let position = this.findLastWinPositionOnAnyLine(gameMap);
    if (position) {
      return position;
    }
    position = this.findBlockOpponentPosition(gameMap);
    if (position) {
      return position;
    }
    return super.selectPositionImpl(gameMap);
  }

  private findBlockOpponentPosition(gameMap: GameMap): Position | null {
    let position = this.findBlockOnHorizontalLines(gameMap);
    if (position) {
      return position;
    }
    position = this.findBlockOnVerticalLines(gameMap);
    if (position) {
      return position;
    }
    position = this.findBlockOnDiagonalDownLine(gameMap);
    if (position) {
      return position;
    }
    position = this.findBlockOnDiagonalUpLine(gameMap);
    if (position) {
      return position;
    }
    return null;
  }

  private findBlockOnHorizontalLines(gameMap: GameMap): Position | null {
    for (let row = 0; row < 3; row++) {
      const position = this.isHorizontalLineHasBlockPlace(gameMap, row);
      if (position) {
        return position;
      }
    }
    return null;
  }

  private isHorizontalLineHasBlockPlace(
    gameMap: GameMap,
    row: number
  ): Position | null {
    let hasOpponentCell = false;
    let selectedBlockPosition = false;
    let blockPosition: Position = { row: row as Row, column: 0 };
    for (let column = 0; column < 3; column++) {
      if (gameMap[row][column] === this.getPlayerCell()) {
        return null;
      } else if (gameMap[row][column] === this.getOpponentCell()) {
        hasOpponentCell = true;
      } else {
        if (!selectedBlockPosition) {
          selectedBlockPosition = true;
          blockPosition = { row: row as Row, column: column as Column };
        } else {
          return null;
        }
      }
    }
    return hasOpponentCell ? blockPosition : null;
  }

  private findBlockOnVerticalLines(gameMap: GameMap): Position | null {
    for (let column = 0; column < 3; column++) {
      const position = this.isVerticalLineHasBlockPlace(gameMap, column);
      if (position) {
        return position;
      }
    }
    return null;
  }

  private isVerticalLineHasBlockPlace(
    gameMap: GameMap,
    column: number
  ): Position | null {
    let hasPlayerCell = false;
    let selectedLastPosition = false;
    let lastPosition: Position = { row: 0, column: column as Column };
    for (let row = 0; row < 3; row++) {
      if (gameMap[row][column] === this.getPlayerCell()) {
        return null;
      } else if (gameMap[row][column] === this.getOpponentCell()) {
        hasPlayerCell = true;
      } else {
        if (!selectedLastPosition) {
          selectedLastPosition = true;
          lastPosition = { row: row as Row, column: column as Column };
          selectedLastPosition = true;
        } else {
          return null;
        }
      }
    }
    return hasPlayerCell ? lastPosition : null;
  }

  private findBlockOnDiagonalDownLine(gameMap: GameMap): Position | null {
    let hasPlayerCell = false;
    let selectedLastPosition = false;
    let lastPosition: Position = { row: 0, column: 0 };
    for (let index = 0; index < 3; index++) {
      if (gameMap[index][index] === this.getPlayerCell()) {
        return null;
      } else if (gameMap[index][index] === this.getOpponentCell()) {
        hasPlayerCell = true;
      } else {
        if (!selectedLastPosition) {
          selectedLastPosition = true;
          lastPosition = { row: index as Row, column: index as Column };
        } else {
          return null;
        }
      }
    }
    return hasPlayerCell ? lastPosition : null;
  }

  private findBlockOnDiagonalUpLine(gameMap: GameMap): Position | null {
    let hasPlayerCell = false;
    let selectedLastPosition = false;
    let lastPosition: Position = { row: 2, column: 0 };
    for (let index = 0; index < 3; index++) {
      if (gameMap[2 - index][index] === this.getPlayerCell()) {
        return null;
      } else if (gameMap[2 - index][index] === this.getOpponentCell()) {
        hasPlayerCell = true;
      } else {
        if (!selectedLastPosition) {
          selectedLastPosition = true;
          lastPosition = { row: (2 - index) as Row, column: index as Column };
          selectedLastPosition = true;
        } else {
          return null;
        }
      }
    }
    return hasPlayerCell ? lastPosition : null;
  }
}
