import { SIZE } from "../common/constants";
import { getPosition, getChessBoardIndex } from "../common/functions";
import { RESULT } from "./enums";
import { moveCheckerPosition, removeCheckers } from "./functions";

export class AIGame {
  private enemies = new Set<number>();
  private eatEnemyPoint: null | number = null;

  private resetEnemies() {
    this.enemies = new Set<number>();
    this.eatEnemyPoint = null;
  }

  private getNextWhiteCheckerMove({
    id,
    whiteCheckers,
    blackCheckers,
  }: {
    id: number;
    whiteCheckers: number[];
    blackCheckers: number[];
  }): {
    nextMove: number | undefined;
    whiteCheckers: number[];
    blackCheckers: number[];
  } | null {
    const [row, col] = getPosition(id);

    if (row + 1 > SIZE) {
      // already reach the last line, cannot move forward
      return { nextMove: undefined, whiteCheckers, blackCheckers };
    }

    // check enemy moves
    let diff = 2;
    while (diff + col < SIZE) {
      const newRightCol = diff + col;
      const blackEnemyCheckerPos = getChessBoardIndex([
        newRightCol - 1,
        col + diff - 1,
      ]);
      const emptySquare = getChessBoardIndex([newRightCol, col + diff]);
      if (newRightCol < SIZE) {
        if (
          blackCheckers.indexOf(blackEnemyCheckerPos) !== -1 &&
          blackCheckers.indexOf(emptySquare) === -1 &&
          whiteCheckers.indexOf(emptySquare) === -1
        ) {
          this.enemies.add(blackEnemyCheckerPos);
          this.eatEnemyPoint = emptySquare;
        } else {
          break;
        }
      }
      diff += 2;
    }

    if (this.eatEnemyPoint) {
      return {
        nextMove: this.eatEnemyPoint,
        whiteCheckers: moveCheckerPosition(
          id,
          this.eatEnemyPoint,
          whiteCheckers
        ),
        blackCheckers: removeCheckers(Array.from(this.enemies), blackCheckers),
      };
    }

    // check the normal possible move
    const leftPossibleMove = getChessBoardIndex([row + 1, col - 1]);
    const rightPossibleMove = getChessBoardIndex([row + 1, col + 1]);
    if (
      col - 1 >= 0 &&
      blackCheckers.indexOf(leftPossibleMove) === -1 &&
      whiteCheckers.indexOf(leftPossibleMove) === -1
    ) {
      // next possible move should be (x-1, y+1) and (x+1, y+1)
      return {
        nextMove: leftPossibleMove,
        whiteCheckers: moveCheckerPosition(id, leftPossibleMove, whiteCheckers),
        blackCheckers,
      };
    } else if (
      col + 1 < SIZE &&
      blackCheckers.indexOf(rightPossibleMove) === -1 &&
      whiteCheckers.indexOf(rightPossibleMove) === -1
    ) {
      return {
        nextMove: rightPossibleMove,
        whiteCheckers: moveCheckerPosition(
          id,
          rightPossibleMove,
          whiteCheckers
        ),
        blackCheckers,
      };
    }
    return { nextMove: undefined, whiteCheckers, blackCheckers };
  }

  public moveWhiteChecker({ whiteCheckers, blackCheckers }): {
    result: RESULT | undefined;
    whiteCheckers: number[];
    blackCheckers: number[];
  } {
    const existingWhiteChecker = [...whiteCheckers];
    let length = existingWhiteChecker.length;
    if (length === 0) {
      this.resetEnemies();
      return { result: RESULT.win, whiteCheckers, blackCheckers };
    } else {
      while (length > 0) {
        const randomIndex = Math.floor(Math.random() * length);
        const checkerId = existingWhiteChecker[randomIndex];
        const {
          nextMove,
          whiteCheckers: newWhiteCheckers,
          blackCheckers: newBlackCheckers,
        } = this.getNextWhiteCheckerMove({
          id: checkerId,
          whiteCheckers,
          blackCheckers,
        });

        if (nextMove) {
          console.log(getPosition(checkerId), "=>", getPosition(nextMove));

          return {
            whiteCheckers: newWhiteCheckers,
            blackCheckers: newBlackCheckers,
            result: undefined,
          };
        } else {
          existingWhiteChecker.splice(randomIndex, 1);
          length = existingWhiteChecker.length;
        }
      }

      return {
        whiteCheckers,
        blackCheckers,
        result: RESULT.tie,
      };
    }
  }
}
