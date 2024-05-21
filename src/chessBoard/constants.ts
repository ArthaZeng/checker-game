import { CSSProperties } from "react";

/** Styling properties applied to the board element */
export const boardStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  }

export const initializedBlackCheckers = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
export const initializedWhiteCheckers = [
  40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62,
];
