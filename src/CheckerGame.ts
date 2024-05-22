import {
  initializedBlackCheckers,
  initializedWhiteCheckers,
} from "./chessBoard/constants.ts";
import { CheckerItem } from "./common/types.ts";
import { PieceColor } from "./common/enums.ts";
import { getPosition } from "./common/functions.ts";

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

  public canMoveChecker(
    item: CheckerItem,
    position: number,
    checkerColor: boolean | PieceColor
  ): boolean {
    /**
     * Based on the rule of the game:
     * 1. it only supports to move forward and only 1 step every time
     * 2. 
     * reference: https://www.usatoday.com/story/graphics/2023/01/23/how-to-play-checkers-rules-strategy/10795787002/
     */
    if (!!checkerColor) {
      return false;
    }
    const { id, color } = item;
    const [oldX, oldY] = getPosition(id);
    const [newX, newY] = getPosition(position);

    if (color === PieceColor.black) {
      if ((oldX - newX) === 1 && Math.abs(oldY - newY) === 1) {
        return true
      }
    } else if (color === PieceColor.white) {
      if ((newX - oldX) === 1 && Math.abs(oldY - newY) === 1) {
        return true
      }
    }

    return false;
  }

  private emitChange() {
    this.observers.forEach((boardObservers) => {
      console.log(boardObservers);
      const [setStepCount, setWhiteCheckers, setBlackCheckers] = boardObservers;
      setStepCount && setStepCount(this.stepCount);
      setWhiteCheckers && setWhiteCheckers(this.whiteCheckers);
      setBlackCheckers && setBlackCheckers(this.blackCheckers);
    });
  }
}
