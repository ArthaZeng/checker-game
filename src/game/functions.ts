import { SIZE } from "../common/constants";
import { getChessBoardIndex } from "../common/functions";

export const moveCheckerPosition = (
  from: number,
  to: number,
  checkerArr: number[]
) => [...checkerArr.filter((point) => point !== from), to];

export const removeCheckers = (ids: number[], checkerArr: number[]) =>
  checkerArr.filter((point) => ids.indexOf(point) === -1);

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

  console.log(path, from);
  // if (path.indexOf(fromIndex) !== -1) {
  //   console.log('should not be here');
  //   return {ableToMove: false, enemies};
  // }

  if (boardMap.get(fromIndex)) {
    // console.log(boardMap);
    return boardMap.get(fromIndex);
  }

  if (fromRow >= SIZE || toCol >= SIZE || fromRow < 0 || toCol < 0) {
    console.log("1", from);
    boardMap.set(fromIndex, { ableToMove: false });
    return { ableToMove: false, enemies };
  }

  if (
    whiteCheckers.indexOf(getChessBoardIndex([fromRow, fromCol])) !== -1 ||
    blackCheckers.indexOf(getChessBoardIndex([fromRow, fromCol])) !== -1
  ) {
    // this square has existing checker
    console.log("2", from);
    boardMap.set(fromIndex, { ableToMove: false });
    return { ableToMove: false, enemies };
  }

  if (
    (fromRow - 1 === toRow && fromCol - 1 === toCol) ||
    (fromRow - 1 === toRow && fromCol + 1 === toCol) ||
    (fromRow + 1 === toRow && fromCol + 1 === toCol) ||
    (fromRow + 1 === toRow && fromCol - 1 === toCol)
  ) {
    // 1 step away from target
    console.log("3", from);
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
    console.log("4", from);
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
    console.log("5", from);
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
    console.log("6", from);
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
    console.log("7", from);
    console.log("correct path");
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
