import { SIZE } from "./constants";

// [x = row, y = column]
export const getPosition = (point: number): [number, number] => [
  Math.floor(point / SIZE),
  point % SIZE,
];

export const getChessBoardIndex = ([row, col]: [number, number]): number =>
  col + row * SIZE;
