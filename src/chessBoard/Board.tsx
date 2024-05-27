import React, { useEffect, useState } from "react";
import { PieceColor } from "../common/enums";
import { SIZE } from "../common/constants";
import { boardStyle, squareStyle } from "./constants";
import { Checker } from "../checkers/Checker";
import { Square } from "../squares/Square";

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
          {checkerColor ? (
            <Checker game={game} color={checkerColor} id={point} />
          ) : null}
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
      <div>White Checkers: {whiteCheckers.length}</div>
      <div>Black Checkers: {blackCheckers.length}</div>
      {/* <button onClick={}>Restart</button> */}
      {/* <button>Redo</button> */}
      <div style={boardStyle}>{squares}</div>
    </>
  );
};
