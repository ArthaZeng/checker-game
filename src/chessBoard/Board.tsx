import React, { CSSProperties, useEffect, useState } from "react";
import { PieceColor } from "../common/enums.ts";
import { SIZE } from "../common/constants.ts";
import { boardStyle } from "./constants.ts";
import { Checker } from "../squares/Checker.tsx";
import { Square } from "../squares/Square.tsx";

const squareStyle: CSSProperties = { width: "12.5%", height: "12.5%" };

const initializedBlackCheckers = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
const initializedWhiteCheckers = [
  40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62,
];

const getPosition = (i: number) => {
  return [i % 8, Math.floor(i / 8)];
};

export const Board = () => {
  const [maps, setMaps] = useState({
    blackCheckers: initializedBlackCheckers,
    whiteCheckers: initializedWhiteCheckers,
  });

  useEffect(() => {
    console.log('should refersh?');
  });

  const handleDropItem = (item) => {
    console.log(item);
    setMaps({
      blackCheckers: [...maps.blackCheckers, 0],
      whiteCheckers: maps.whiteCheckers,
    });
  };

  const { blackCheckers, whiteCheckers } = maps;
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

    const checkerColor = hasChecker(i);

    return (
      <div style={squareStyle}>
        <Square x={x} y={y} dropItem={handleDropItem}>
          {checkerColor ? <Checker color={checkerColor} id={i} /> : null}
        </Square>
      </div>
    );
  };

  const squares: React.ReactNode[] = [];
  for (let i = 0; i < SIZE * SIZE; i += 1) {
    squares.push(renderSquare(i));
  }

  return <div style={boardStyle}>{squares}</div>;
};
