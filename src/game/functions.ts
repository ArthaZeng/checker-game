import { SIZE } from "../common/constants";
import { getChessBoardIndex } from "../common/functions";

export const moveCheckerPosition = (
  from: number,
  to: number,
  checkerArr: number[]
) => [...checkerArr.filter((point) => point !== from), to];

export const removeCheckers = (ids: number[], checkerArr: number[]) =>
  checkerArr.filter((point) => ids.indexOf(point) === -1);

export const isPlaced = ({ position, whiteCheckers, blackCheckers }) =>
  whiteCheckers.indexOf(position) > -1 || blackCheckers.indexOf(position) > -1;

export const canEatEnemy = ({
  from,
  to,
  whiteCheckers,
  blackCheckers,
  enemies = [],
  boardMap = new Map(),
  path = [],
}) => {
  const [fromRow, fromCol] = from;
  const fromIndex = getChessBoardIndex(from);
  const [toRow, toCol] = to;

  // console.log(path, from);
  if (path.indexOf(fromIndex) !== -1) {
    // console.log("should not be here");
    return { ableToMove: false, enemies };
  }

  if (boardMap.get(fromIndex)) {
    console.log(boardMap);
    return boardMap.get(fromIndex);
  }

  if (fromRow >= SIZE || toCol >= SIZE || fromRow < 0 || toCol < 0) {
    // console.log("1", from);
    // the from position is outside the board
    // boardMap.set(fromIndex, { ableToMove: false });
    return { ableToMove: false, enemies };
  }

  const isEnemy = (positionIndex) => whiteCheckers.indexOf(positionIndex) > -1;

  const next = ({ rowDirection, colDirection }) => {
    const nextSquareIndex = getChessBoardIndex([
      fromRow + rowDirection,
      fromCol + colDirection,
    ]);
    if (isEnemy(nextSquareIndex)) {
      if (
        fromRow + rowDirection * 2 === toRow &&
        fromCol + colDirection * 2 === toCol
      ) {
        boardMap.set(fromIndex, {
          ableToMove: true,
          enemies: [...enemies, nextSquareIndex],
        });
        return boardMap.get(fromIndex);
      } else if (
        !isPlaced({ position: nextSquareIndex, whiteCheckers, blackCheckers })
      ) {
        return canEatEnemy({
          from: [fromRow + rowDirection * 2, fromCol + colDirection * 2],
          to,
          whiteCheckers,
          blackCheckers,
          path: [...path, fromIndex, nextSquareIndex],
          enemies: [...enemies, nextSquareIndex],
          boardMap,
        });
      } else {
        // boardMap.set(fromIndex, { ableToMove: false });
        return  { ableToMove: false };
      }
    }
    // boardMap.set(fromIndex, { ableToMove: false });
    // return boardMap.get(fromIndex);
    return { ableToMove: false }
  };

  // leftTop
  if (next({ rowDirection: -1, colDirection: -1 }).ableToMove) {
    return boardMap.get(fromIndex);
  }

  // leftBottom
  if (next({ rowDirection: 1, colDirection: -1 }).ableToMove) {
    return boardMap.get(fromIndex);
  }

  // rightTop
  if (next({ rowDirection: -1, colDirection: 1 }).ableToMove) {
    return boardMap.get(fromIndex);
  }

  // rightBottom
  if (next({ rowDirection: +1, colDirection: +1 }).ableToMove) {
    return boardMap.get(fromIndex);
  }

  // boardMap.set(fromIndex, { ableToMove: false });
  return { ableToMove: false };
};
