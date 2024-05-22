import React, { CSSProperties, useEffect, useState } from "react";
import { PieceColor } from "../common/enums.ts";
import { SIZE } from "../common/constants.ts";
import { boardStyle } from "./constants.ts";
import { Checker } from "../squares/Checker.tsx";
import { Square } from "../squares/Square.tsx";

const squareStyle: CSSProperties = { width: "12.5%", height: "12.5%" };

export const Board = ({ game }) => {
  const [stepCount, setStepCount] = useState<number>(game.stepCount);
  const [whiteCheckers, setWhiteCheckers] = useState<number[]>(
    game.whiteCheckers
  );
  const [blackCheckers, setBlackCheckers] = useState<number[]>(
    game.blackCheckers
  );

  useEffect(() =>
    game.observe(setStepCount, setWhiteCheckers, setBlackCheckers)
  );

  const getCheckColor = (point: number): boolean | PieceColor => {
    if (blackCheckers.indexOf(point) !== -1) {
      return PieceColor.black;
    } else if (whiteCheckers.indexOf(point) !== -1) {
      return PieceColor.white;
    }
    return false;
  };

  const renderSquare = (point: number) => {
    const checkerColor = getCheckColor(point);

    return (
      <div style={squareStyle}>
        <Square position={point} game={game}>
          {checkerColor ? <Checker color={checkerColor} id={point} /> : null}
        </Square>
      </div>
    );
  };

  const squares: React.ReactNode[] = [];
  for (let point = 0; point < SIZE * SIZE; point += 1) {
    squares.push(renderSquare(point));
  }

  return (
    <>
      <div>steps: {stepCount}</div>
      <div style={boardStyle}>{squares}</div>
    </>
  );
};
