import { getPosition } from "../common/functions";
import { SIZE } from "../common/constants";
import {
  canMoveBlackChecker,
  moveCheckerPosition,
  removeCheckers,
} from "./functions";

export class UserGame {
  private enemies: number[] = [];
  // private eatEnemyPoint: null | number = null;

  private resetEnemies() {
    this.enemies = [];
    // this.eatEnemyPoint = null;
  }

  public hasEnemies(): boolean {
    return !!this.enemies.length;
  }

  public moveChecker({ id, position, whiteCheckers, blackCheckers }) {
    let newWhiteCheckers = [...whiteCheckers];
    let newBlackCheckers = [...blackCheckers];

    newBlackCheckers = moveCheckerPosition(id, position, blackCheckers);
    if (this.enemies.length) {
      newWhiteCheckers = removeCheckers(
        this.enemies,
        whiteCheckers
      );
    }

    this.resetEnemies();
    return {
      whiteCheckers: newWhiteCheckers,
      blackCheckers: newBlackCheckers,
    };
  }

  public canMoveChecker({ item, position, whiteCheckers, blackCheckers }): boolean {
    const {ableToMove, enemies} = canMoveBlackChecker({
      from: getPosition(position),
      to: getPosition(item.id),
      whiteCheckers,
      blackCheckers,
      enemies: [],
      boardMap: new Map(),
    });

    this.enemies = enemies;
    return ableToMove;
  }

  public endDrag() {
    this.resetEnemies();
  }
}
