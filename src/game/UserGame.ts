import { getPosition } from "../common/functions";
import { SIZE } from "../common/constants";

export class UserGame {
  private enemies = new Set<number>();
  private eatEnemyPoint: null | number = null;

  private resetEnemies() {
    this.enemies = new Set<number>();
    this.eatEnemyPoint = null;
  }

  public hasEnemies(): boolean {
    return !!this.enemies.size;
  }

  public moveChecker({ id, position, whiteCheckers, blackCheckers }) {
    let newWhiteCheckers = [...whiteCheckers];
    let newBlackCheckers = [...blackCheckers];

    newBlackCheckers = [
      ...blackCheckers.filter((point) => point !== id),
      position,
    ];
    if (this.enemies.size) {
      for (let index of this.enemies) {
        newWhiteCheckers = whiteCheckers.filter((point) => point !== index);
      }
    }

    this.resetEnemies();
    return {
      whiteCheckers: newWhiteCheckers,
      blackCheckers: newBlackCheckers,
    };
  }

  public canMoveBlackChecker({
    item,
    position,
    whiteCheckers,
    blackCheckers,
  }): boolean {
    /**
     * Based on the rule of the game:
     * 1. it only supports to move forward and only 1 step every time
     * 2. based on the requrement: if there is an opportunity to capture an enemy checker - it should be the only valid move
     * 3. AI should play after users drop the checker
     * reference: https://www.usatoday.com/story/graphics/2023/01/23/how-to-play-checkers-rules-strategy/10795787002/
     */
    if (
      blackCheckers.indexOf(position) !== -1 ||
      whiteCheckers.indexOf(position) !== -1
    ) {
      return false;
    }

    if (this.eatEnemyPoint === position) {
      return true;
    } else if (this.eatEnemyPoint !== null && this.eatEnemyPoint !== position) {
      return false;
    }

    const { id } = item;

    const [oldRow, oldColumn] = getPosition(id);
    const [newRow, newColumn] = getPosition(position);

    let diff = Math.abs(oldColumn - newColumn);
    if (oldRow - newRow === diff && diff % 2 === 0) {
      const newIsOnRightSide = newColumn > oldColumn;
      while (diff > 0) {
        const emptySquare =
          (oldRow - diff) * SIZE + (newIsOnRightSide ? oldColumn + diff : oldColumn - diff);

        const whiteEnemyCheckerPos =
          (oldRow - (diff - 1)) * SIZE +
          (newIsOnRightSide ? oldColumn + (diff - 1) : oldColumn - (diff - 1));

        if (
          whiteCheckers.indexOf(whiteEnemyCheckerPos) !== -1 &&
          blackCheckers.indexOf(emptySquare) === -1 &&
          whiteCheckers.indexOf(emptySquare) === -1
        ) {
          this.enemies.add(whiteEnemyCheckerPos);
          diff = -2;
        } else {
          return false;
        }
      }
      this.eatEnemyPoint = position;
      return true;
    }

    if (oldRow - newRow === 1 && Math.abs(oldColumn - newColumn) === 1) {
      return true;
    }

    return false;
  }

  public endDrag() {
    this.resetEnemies();
  }
}
