import {
  initializedBlackCheckers,
  initializedWhiteCheckers,
} from "./chessBoard/constants.ts";
import { CheckerItem } from "./common/types.ts";
import { PieceColor } from "./common/enums.ts";
import { getPosition } from "./common/functions.ts";
import { SIZE } from "./common/constants.ts";

type BoardObserver =
  | [
      (count: number) => void,
      (checkers: number[]) => void,
      (checkers: number[]) => void
    ]
  | null;

export class CheckerGame {
  public blackCheckers: number[] = initializedBlackCheckers;
  public whiteCheckers: number[] = initializedWhiteCheckers;
  public stepCount: number = 0;

  private foundEnemy: boolean = false;

  private observers: BoardObserver[] = [];

  public observe(setStepCount, setWhiteCheckers, setBlackCheckers): () => void {
    this.observers.push([setStepCount, setWhiteCheckers, setBlackCheckers]);
    this.emitChange();

    return (): void => {
      // this.observers = this.observers.filter((t) => t !== o);
    };
  }

  public moveChecker({ color, id, position }): void {
    this.stepCount += 1;

    if (color === PieceColor.white) {
      this.whiteCheckers = [
        ...this.whiteCheckers.filter((i) => i !== id),
        position,
      ];
    } else {
      this.blackCheckers = [
        ...this.blackCheckers.filter((i) => i !== id),
        position,
      ];
    }
    this.emitChange();
  }

  public canMoveChecker(item: CheckerItem, position: number): boolean {
    /**
     * Based on the rule of the game:
     * 1. it only supports to move forward and only 1 step every time
     * 2. based on the requrement: if there is an opportunity to capture an enemy checker - it should be the only valid move
     * reference: https://www.usatoday.com/story/graphics/2023/01/23/how-to-play-checkers-rules-strategy/10795787002/
     */
    if (
      this.blackCheckers.indexOf(position) !== -1 ||
      this.whiteCheckers.indexOf(position) !== -1
    ) {
      return false;
    }

    const { id, color } = item;

    const [oldX, oldY] = getPosition(id);
    const [newX, newY] = getPosition(position);

    let diff = Math.abs(oldY - newY);
    if (oldX - newX === diff && diff % 2 === 0) {
      // if the selected check is black
      const newIsOnRightSide = newY > oldY;
      while (diff > 0) {
        const emptySquare1 =
          (oldX - diff) * SIZE + (newIsOnRightSide ? oldY + diff : oldY - diff);

        const whiteEnemyCheckerPos =
          (oldX - (diff - 1)) * SIZE +
          (newIsOnRightSide ? oldY + (diff - 1) : oldY - (diff - 1));

        if (
          this.whiteCheckers.indexOf(whiteEnemyCheckerPos) !== -1 &&
          this.blackCheckers.indexOf(emptySquare1) === -1 &&
          this.whiteCheckers.indexOf(emptySquare1) === -1
        ) {
          diff = -2;
        } else {
          return false;
        }
      }
      return true;
    }

    if (color === PieceColor.black) {
      if (oldX - newX === 1 && Math.abs(oldY - newY) === 1) {
        return true;
      }
    } else if (color === PieceColor.white) {
      if (newX - oldX === 1 && Math.abs(oldY - newY) === 1) {
        return true;
      }
    }

    return false;
  }

  private emitChange() {
    this.observers.forEach((boardObservers) => {
      // console.log(boardObservers);
      const [setStepCount, setWhiteCheckers, setBlackCheckers] = boardObservers;
      setStepCount && setStepCount(this.stepCount);
      setWhiteCheckers && setWhiteCheckers(this.whiteCheckers);
      setBlackCheckers && setBlackCheckers(this.blackCheckers);
    });
  }
}
