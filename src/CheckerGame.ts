import {
  initializedBlackCheckers,
  initializedWhiteCheckers,
} from "./chessBoard/constants.ts";
import { PieceColor } from "./common/enums.ts";

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

  public canMoveChecker(position: number): boolean {
    return true;
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
