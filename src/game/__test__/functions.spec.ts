import { SIZE } from "../../common/constants";
import { getChessBoardIndex } from "../../common/functions";

export const canMoveBlackChecker = ({
  from,
  to,
  whiteCheckers,
  blackCheckers,
  enemies = [],
  boardMap = new Map(),
  path = [],
}): { ableToMove: boolean; enemies: number[] } => {
  const [fromRow, fromCol] = from;
  const fromIndex = getChessBoardIndex(from);
  const [toRow, toCol] = to;

  // console.log(path, from);
  // if (path.indexOf(fromIndex) !== -1) {
    console.log('should not be here');
  //   return {ableToMove: false, enemies};
  // }

  if (boardMap.get(fromIndex)) {
    console.log(boardMap);
    return boardMap.get(fromIndex);
  }

  if (fromRow >= SIZE || toCol >= SIZE || fromRow < 0 || toCol < 0) {
    // console.log("1", from);
    // the from position is outside the board
    boardMap.set(fromIndex, { ableToMove: false });
    return { ableToMove: false, enemies };
  }

  if (
    whiteCheckers.indexOf(getChessBoardIndex([fromRow, fromCol])) !== -1 ||
    blackCheckers.indexOf(getChessBoardIndex([fromRow, fromCol])) !== -1
  ) {
    // this square has existing checker
    // console.log("2", from);
    boardMap.set(fromIndex, { ableToMove: false });
    return { ableToMove: false, enemies };
  }

  // // if this is only able to move towards 2 directions
  // if (
  //   (fromRow + 1 === toRow && fromCol + 1 === toCol) ||
  //   (fromRow + 1 === toRow && fromCol - 1 === toCol)
  // ) {
  //   // 1 step away from target
    console.log("1 step away from target", from);
  //   boardMap.set(fromIndex, { ableToMove: true, enemies });
  //   return { ableToMove: true, enemies };
  // }

  // if this is able to move towards 4 directions
  if (
    (fromRow - 1 === toRow && fromCol - 1 === toCol) ||
    (fromRow - 1 === toRow && fromCol + 1 === toCol) ||
    (fromRow + 1 === toRow && fromCol + 1 === toCol) ||
    (fromRow + 1 === toRow && fromCol - 1 === toCol)
  ) {
    // 1 step away from target
    // console.log("3", from);
    boardMap.set(fromIndex, { ableToMove: true, enemies });
    return { ableToMove: true, enemies };
  }

  const moveToNext = ({ rowDirection, colDirection }) => {
    const nextIndex = getChessBoardIndex([
      fromRow + rowDirection,
      fromCol + colDirection,
    ]);

    if (path.indexOf(nextIndex) !== -1) {
      return { ableToMove: false, enemies };
    }
    if (whiteCheckers.indexOf(nextIndex) !== -1) {
      const nextMove = [fromRow + rowDirection * 2, fromCol + colDirection * 2];
      if (nextMove[0] === toRow && nextMove[1] === toCol) {
        boardMap.set(fromIndex, { ableToMove: true, enemies });
        return { ableToMove: true, enemies: [...enemies, nextIndex] };
      }
      return canMoveBlackChecker({
        from: nextMove,
        to,
        whiteCheckers,
        blackCheckers,
        enemies: [...enemies, nextIndex],
        boardMap,
        path: [...path, nextIndex],
      });
    }
  };

  if (
    whiteCheckers.indexOf(getChessBoardIndex([fromRow - 1, fromCol - 1])) !== -1
  ) {
    // from position is
    // console.log("4", from);
    const { ableToMove, enemies } = moveToNext({
      rowDirection: -1,
      colDirection: -1,
    });
    if (ableToMove) {
      return { ableToMove, enemies };
    }
    boardMap.set(getChessBoardIndex([fromRow - 1, fromCol - 1]), {
      ableToMove: false,
    });
  }

  if (
    whiteCheckers.indexOf(getChessBoardIndex([fromRow - 1, fromCol + 1])) !== -1
  ) {
    // console.log("5", from);
    const { ableToMove, enemies } = moveToNext({
      rowDirection: -1,
      colDirection: 1,
    });
    if (ableToMove) {
      return { ableToMove, enemies };
    }
    boardMap.set(getChessBoardIndex([fromRow - 1, fromCol + 1]), {
      ableToMove: false,
    });
  }

  if (
    whiteCheckers.indexOf(getChessBoardIndex([fromRow + 1, fromCol - 1])) !== -1
  ) {
    // console.log("6", from);
    const { ableToMove, enemies } = moveToNext({
      rowDirection: 1,
      colDirection: -1,
    });
    if (ableToMove) {
      return { ableToMove, enemies };
    }
    boardMap.set(getChessBoardIndex([fromRow + 1, fromCol - 1]), {
      ableToMove: false,
    });
  }

  if (
    whiteCheckers.indexOf(getChessBoardIndex([fromRow + 1, fromCol + 1])) !== -1
  ) {
    // console.log("7", from);
    // console.log("correct path");
    const { ableToMove, enemies } = moveToNext({
      rowDirection: 1,
      colDirection: 1,
    });
    if (ableToMove) {
      return { ableToMove, enemies };
    }
    boardMap.set(getChessBoardIndex([fromRow + 1, fromCol + 1]), {
      ableToMove: false,
    });
  }

  boardMap.set(fromIndex, { ableToMove: false });
  return { ableToMove: false, enemies };
};

describe("canMoveBlackChecker", () => {
  let blackChecker;
  let blackCheckers;

  beforeAll(() => {
    blackChecker = [3, 2];
    blackCheckers = [getChessBoardIndex(blackChecker)];
  });

  it("square is on the left top corner", () => {
    expect(
      canMoveBlackChecker({
        from: [2, 1],
        to: blackChecker,
        whiteCheckers: [],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [] });
  });

  it("it cannot eat enemy if there is empty space between enemy and moving item", () => {
    expect(
      canMoveBlackChecker({
        from: [1, 0],
        to: [4, 3],
        whiteCheckers: [2, 1],
        blackCheckers: [getChessBoardIndex([4, 3])],
      })
    ).toStrictEqual({ ableToMove: false, enemies: [] });
  });

  it("square is on the left bottom corner", () => {
    expect(
      canMoveBlackChecker({
        from: [4, 1],
        to: blackChecker,
        whiteCheckers: [],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [] });
  });

  it("square cannot reach corner because there are 2 empty spaces", () => {
    expect(
      canMoveBlackChecker({
        from: [1, 5],
        to: blackChecker,
        whiteCheckers: [],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: false, enemies: [] });
  });

  it("the space needs to jump over 1 white space to reach target - from right bottom", () => {
    const whiteCheckerIndex = getChessBoardIndex([4, 3]);
    expect(
      canMoveBlackChecker({
        from: [5, 4],
        to: blackChecker,
        whiteCheckers: [whiteCheckerIndex],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [whiteCheckerIndex] });
  });

  it("the space needs to jump over 1 white space to reach target - from left top", () => {
    const whiteCheckerIndex = getChessBoardIndex([2, 1]);
    expect(
      canMoveBlackChecker({
        from: [1, 0],
        to: blackChecker,
        whiteCheckers: [whiteCheckerIndex],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [whiteCheckerIndex] });
  });

  it("the space needs to jump over multiple white space to reach target", () => {
    const whiteCheckerIndex1 = getChessBoardIndex([4, 3]);
    const whiteCheckerIndex2 = getChessBoardIndex([6, 5]);
    const whiteCheckerIndex3 = getChessBoardIndex([6, 1]);
    expect(
      canMoveBlackChecker({
        from: [7, 6],
        to: blackChecker,
        whiteCheckers: [
          whiteCheckerIndex1,
          whiteCheckerIndex2,
          whiteCheckerIndex3,
        ],
        blackCheckers,
      })
    ).toStrictEqual({
      ableToMove: true,
      enemies: [whiteCheckerIndex2, whiteCheckerIndex1],
    });
  });

  it("more checkers on the board", () => {
    const boardMap = new Map();
    expect(
      canMoveBlackChecker({
        from: [2, 3],
        to: [4, 5],
        whiteCheckers: [1, 3, 5, 7, 8, 10, 12, 14, 17, 23, 28, 26],
        blackCheckers: [40, 46, 49, 51, 53, 55, 56, 58, 60, 62, 37, 35],
        boardMap,
      })
    ).toStrictEqual({
      ableToMove: true,
      enemies: [getChessBoardIndex([3, 4])],
    });
  });
});
