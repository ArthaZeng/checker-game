import { SIZE } from "./constants";

// [x = row, y = column]
export const getPosition = (point: number): [number, number] => [
  Math.floor(point / SIZE),
  point % SIZE,
];

export const getChessBoardIndex = ([row, col]: [number, number]): number =>
  {
    if (row >= SIZE || col >= SIZE || row <0 || col < 0) {
      return -1;
    }
    return col + row * SIZE;
  }
