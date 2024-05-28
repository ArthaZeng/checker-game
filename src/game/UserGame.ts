import { getChessBoardIndex, getPosition } from "../common/functions";
import { SIZE } from "../common/constants";
import {
  canEatEnemy,
  isPlaced,
  moveCheckerPosition,
  removeCheckers,
} from "./functions";
import { CheckerItem } from "../common/types";

export class UserGame {
  private upgradedBlackCheckers: number[] = [];
  private enemies: [number, number] | [] = [];
  private boardMap = new Map();
  private eatEnemyPoint: null | number = null;

  private resetEnemies() {
    this.enemies = [];
    this.eatEnemyPoint = null;
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
      this.upgradedBlackCheckers = [...this.upgradedBlackCheckers.filter(point => point !== id), position];
    }

    let newWhiteCheckers = [...whiteCheckers];
    let newBlackCheckers = [...blackCheckers];

    newBlackCheckers = moveCheckerPosition(id, position, blackCheckers);
    if (this.enemies.length) {
      newWhiteCheckers = removeCheckers(this.enemies, whiteCheckers);
    }

    this.resetEnemies();
    return {
      whiteCheckers: newWhiteCheckers,
      blackCheckers: newBlackCheckers,
    };
  }

  public canMoveChecker({
    item,
    position,
    whiteCheckers,
    blackCheckers,
  }: {
    item: CheckerItem;
    position: number;
    whiteCheckers: number[];
    blackCheckers: number[];
  }): boolean {
    if (this.boardMap.get(position) !== undefined) {
      return this.boardMap.get(position);
    }
    if (isPlaced({ position, whiteCheckers, blackCheckers })) {
      return false;
    }
    if (this.enemies.length) {
      return this.eatEnemyPoint === position;
    }

    const result = canEatEnemy({
      from: getPosition(position),
      to: getPosition(item.id),
      whiteCheckers,
      blackCheckers,
    });
    // console.log(getPosition(position), 'result', result);
    if (result.ableToMove) {
      this.boardMap.set(position, true);
      this.enemies = result.enemies;
      this.eatEnemyPoint = position;
      return true;
      // set enemies and return enemies position
    } else {
      const [fromRow, fromCol] = getPosition(position);

      if (fromRow + 1 >= SIZE) {}
      if (fromRow - 1 < 0) {}
      if (fromCol + 1 >= SIZE) {}
      if (fromCol - 1 < 0) {}

      const nextStep = [
        getChessBoardIndex([fromRow + 1, fromCol + 1]),
        getChessBoardIndex([fromRow + 1, fromCol - 1]),
        getChessBoardIndex([fromRow - 1, fromCol + 1]),
        getChessBoardIndex([fromRow - 1, fromCol - 1]),
      ];
      const canMove =
        this.upgradedBlackCheckers.indexOf(item.id) > -1
          ? nextStep[0] === item.id || nextStep[1] === item.id || nextStep[2] === item.id || nextStep[3] === item.id
          : nextStep[0] === item.id || nextStep[1] === item.id;

      this.boardMap.set(position, canMove);
      return this.boardMap.get(position);
    }
  }

  public endDrag() {
    this.resetEnemies();
    this.boardMap = new Map();
  }
}
