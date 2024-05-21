import React from "react";
import { ItemTypes } from "../ItemTypes.ts";
import { useDrop } from "react-dnd";
import { PieceColor } from "../common/enums.ts";
import { SIZE } from "../common/constants.ts";

const isWhiteSquare = (i: number) => {
  const x = i % SIZE;
  const y = Math.floor(i / SIZE);
  return (x + y) % 2 !== 1;
};

export const Square = ({ position, children, game }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CHECKER,
      canDrop: () => game.canMoveChecker(position),
      drop: (item: { color: PieceColor; id: number }) =>
        game.moveChecker({ ...item, position }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game]
  );

  // const handleDropItem = ({ id, color, position }) => {
  //   let newWhiteCheckers = whiteCheckers;
  //   let newBlackCheckers = blackCheckers;
  //   if (color === PieceColor.white) {
  //     newWhiteCheckers = [...newWhiteCheckers.filter((i) => i !== id), position]
  //   } else {
  //     newBlackCheckers=[...newBlackCheckers.filter((i) => i !== id), position]
  //   }
  //   setWhiteCheckers(newWhiteCheckers);
  //   setBlackCheckers(newBlackCheckers);
  //   setStepCount(stepCount + 1);
  // };

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isWhiteSquare(position)
          ? PieceColor.white
          : PieceColor.antiquewhite,
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
