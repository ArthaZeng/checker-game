import {
  initializedBlackCheckers,
  initializedWhiteCheckers,
} from "../chessBoard/constants";
import { CheckerItem } from "../common/types";
import { AIGame } from "./AIGame";
import { UserGame } from "./UserGame";
import { RESULT } from "./enums";
import { BoardObserver } from "./types";

export class Game {
  public blackCheckers: number[] = initializedBlackCheckers;
  public whiteCheckers: number[] = initializedWhiteCheckers;
  public stepCount: number = 0;

  public aiGame = new AIGame();
  public userGame = new UserGame();

  private observers: BoardObserver[] = [];

  public restart() {
    this.blackCheckers = initializedBlackCheckers;
    this.whiteCheckers = initializedWhiteCheckers;
    this.stepCount = 0;
    this.emitChange();
  }

  public observe(setStepCount, setWhiteCheckers, setBlackCheckers): () => void {
    this.observers.push([setStepCount, setWhiteCheckers, setBlackCheckers]);
    this.emitChange();

    return (): void => {};
  }

  public moveBlackChecker({ id, position }): void {
    this.stepCount += 1;

    const newCheckers = this.userGame.moveChecker({
      id,
      position,
      whiteCheckers: this.whiteCheckers,
      blackCheckers: this.blackCheckers,
    });

    const { result, whiteCheckers, blackCheckers } =
      this.aiGame.moveWhiteChecker({
        ...newCheckers,
      });

    if (result === RESULT.win) {
      this.whiteCheckers = [];
      console.log('win');
    } else if (result === RESULT.lose) {
      this.blackCheckers = [];
      console.log('lose');
    } else {
      this.whiteCheckers = whiteCheckers;
      this.blackCheckers = blackCheckers;
    }

    this.emitChange();
  }

  public canMoveBlackChecker(item: CheckerItem, position: number): boolean {
    return this.userGame.canMoveChecker({
      item,
      position,
      whiteCheckers: this.whiteCheckers,
      blackCheckers: this.blackCheckers,
    });
  }

  public endDrag() {
    this.userGame.endDrag();
  }

  private emitChange() {
    this.observers.forEach((boardObservers) => {
      const [setStepCount, setWhiteCheckers, setBlackCheckers] = boardObservers;
      setStepCount && setStepCount(this.stepCount);
      setWhiteCheckers && setWhiteCheckers(this.whiteCheckers);
      setBlackCheckers && setBlackCheckers(this.blackCheckers);
    });
  }
}
