import { getPosition } from "../common/functions";
import {
  findAvailableSpots,
  isPlaced,
  moveCheckerPosition,
  removeCheckers,
} from "./functions";

export class UserGame {
  private upgradedBlackCheckers: number[] = [];
  private enemies: number[] = [];

  private resetEnemies() {
    this.enemies = [];
  }

  public hasEnemies(): boolean {
    return !!this.enemies.length;
  }

  public moveChecker({ id, position, whiteCheckers, blackCheckers }) {
    const [row] = getPosition(position);
    if (row === 0) {
      this.upgradedBlackCheckers.push(position);
    }
    if (this.upgradedBlackCheckers.indexOf(id) > -1) {
      this.upgradedBlackCheckers = [
        ...this.upgradedBlackCheckers.filter((point) => point !== id),
        position,
      ];
    }

    let newWhiteCheckers = [...whiteCheckers];
    let newBlackCheckers = [...blackCheckers];

    newBlackCheckers = moveCheckerPosition(id, position, blackCheckers);
    if (this.enemies.length) {
      console.log('the path to eat enemy is', this.enemies);
      newWhiteCheckers = removeCheckers(this.enemies, whiteCheckers);
    }

    this.resetEnemies();
    return {
      whiteCheckers: newWhiteCheckers,
      blackCheckers: newBlackCheckers,
    };
  }

  public canMoveChecker({ item, position, whiteCheckers, blackCheckers }) {
    if (this.enemies.length) {
      return this.enemies[this.enemies.length - 1] === position;
    }
    if (isPlaced({ position, whiteCheckers, blackCheckers })) {
      return false;
    }

    const result = findAvailableSpots({
      to: item.id,
      whiteCheckers,
      blackCheckers,
      upgraded: this.upgradedBlackCheckers.indexOf(item.id) > -1,
    });
    if (result[0] === item.id) {
      this.enemies = result;
    } else {
      return result.indexOf(position) > -1;
    }
  }

  public endDrag() {
    this.resetEnemies();
  }
}
