import { DIRECTIONS, DIRECTIONS_WITHOUT_UPGRADED, SIZE } from "../common/constants";
import { getChessBoardIndex, getPosition } from "../common/functions";

export const moveCheckerPosition = (
  from: number,
  to: number,
  checkerArr: number[]
) => [...checkerArr.filter((point) => point !== from), to];

export const removeCheckers = (ids: number[], checkerArr: number[]) =>
  checkerArr.filter((point) => ids.indexOf(point) === -1);

export const isPlaced = ({ position, whiteCheckers, blackCheckers }) =>
  whiteCheckers.indexOf(position) > -1 || blackCheckers.indexOf(position) > -1;

export const isOutsideBoard = ([row, col]) =>
  row < 0 || row >= SIZE || col < 0 || col >= SIZE;

export const findEnemiesPath = ({ whiteCheckers, blackCheckers, path }) => {
  const lastSquare = path[path.length - 1];
  const [row, col] = getPosition(lastSquare);

  for (const index in DIRECTIONS) {
    const nextEnemyRow = row + DIRECTIONS[index][0];
    const nextEnemyCol = col + DIRECTIONS[index][1];
    const nextEnemyIndex = getChessBoardIndex([nextEnemyRow, nextEnemyCol]);
    if (
      !isOutsideBoard([nextEnemyRow, nextEnemyCol]) &&
      path.indexOf(nextEnemyIndex) === -1 &&
      whiteCheckers.indexOf(nextEnemyIndex) > -1
    ) {
      const nextSquareRow = nextEnemyRow + DIRECTIONS[index][0];
      const nextSquareCol = nextEnemyCol + DIRECTIONS[index][1];
      const nextSquareIndex = getChessBoardIndex([
        nextSquareRow,
        nextSquareCol,
      ]);

      if (
        !isOutsideBoard([nextSquareRow, nextSquareCol]) &&
        path.indexOf(nextSquareIndex) === -1 &&
        !isPlaced({ position: nextSquareIndex, whiteCheckers, blackCheckers })
      ) {
        return findEnemiesPath({
          whiteCheckers,
          blackCheckers,
          path: [...path, nextEnemyIndex, nextSquareIndex],
        });
      }
    }
  }

  return path;
};

export const findAvailableSpots = ({ to, whiteCheckers, blackCheckers, upgraded }) => {
  const [toRow, toCol] = getPosition(to);

  const availableSquares = [];
  const directions = upgraded ? DIRECTIONS : DIRECTIONS_WITHOUT_UPGRADED;
  for (const index in directions) {
    const pointRow = toRow + directions[index][0];
    const pointCol = toCol + directions[index][1];
    if (isOutsideBoard([pointRow, pointCol])) {
      continue;
    }
    const point = [pointRow, pointCol];
    const position = getChessBoardIndex([pointRow, pointCol]);

    if (!isPlaced({ position, whiteCheckers, blackCheckers })) {
      availableSquares.push(position);
    } else {
      if (whiteCheckers.indexOf(position) > -1) {
        const nextSquareRow = point[0] + directions[index][0];
        const nextSquareCol = point[1] + directions[index][1];
        if (isOutsideBoard([nextSquareRow, nextSquareCol])) {
          continue;
        }
        const nextSquare = [nextSquareRow, nextSquareCol];
        const nextSquareIndex = getChessBoardIndex([nextSquareRow, nextSquareCol]);
        if (nextSquare[0] === toRow && nextSquare[1] === toCol) {
          continue;
        }
        if (
          !isPlaced({
            position: nextSquareIndex,
            whiteCheckers,
            blackCheckers,
          })
        ) {
          // if found a path to eat enemy, then that's the only path
          return findEnemiesPath({
            whiteCheckers,
            blackCheckers,
            path: [to, position, nextSquareIndex],
          });
        }
      }
    }
  }
  return availableSquares;
};
