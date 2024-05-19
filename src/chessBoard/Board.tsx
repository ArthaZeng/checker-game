import React, { CSSProperties, useState } from "react";
import { Piece } from "../piece/Piece.tsx";
import { PieceColor } from "../common/enums.ts";
import { SIZE } from "../common/constants.ts";
import { boardStyle } from "./constants.ts";
import { Checker } from "../piece/Checker.tsx";

const squareStyle: CSSProperties = { width: "12.5%", height: "12.5%" };

const initializedBlackCheckers = [1,3,5,7,8,10,12,14,17,19,21,23];
const initializedWhiteCheckers = [40,42,44,46,49,51,53,55,56,58,60,62];

const getPosition = (i: number) => {
  return [i % 8, Math.floor(i / 8)];
};

export const Board = () => {
  const checkerPos = useState();

  const blackCheckers = [...initializedBlackCheckers];
  const whiteCheckers = [...initializedWhiteCheckers];
  const hasChecker = (i: number): boolean | PieceColor => {
    if (blackCheckers.indexOf(i) !== -1) {
      return PieceColor.black;
    } else if (whiteCheckers.indexOf(i) !== -1) {
      return PieceColor.white;
    }
    return false;
  };

  const renderSquare = (i: number) => {
    const [x, y] = getPosition(i);

    return (
      <div style={squareStyle}>
        <Piece
          color={(x + y) % 2 === 1 ? PieceColor.antiquewhite : PieceColor.white}
        >
          <Checker hasChecker={hasChecker(i)} />
        </Piece>
      </div>
    );
  };

  const squares: React.ReactNode[] = [];
  for (let i = 0; i < SIZE * SIZE; i += 1) {
    squares.push(renderSquare(i));
  }

  return (
    <div style={boardStyle}>
      {squares}
    </div>
  );
};
