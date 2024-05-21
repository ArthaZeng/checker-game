import React from "react";
import { ItemTypes } from "../common/ItemTypes.ts";
import { useDrop } from "react-dnd";
import { PieceColor } from "../common/enums.ts";
import { getPosition } from "../common/functions.ts";
import { Overlay, OverlayType } from "./Overlay.tsx";

const isWhiteSquare = (point: number) => {
  const [x, y] = getPosition(point);
  return (x + y) % 2 !== 1;
};

export const Square = ({ position, children, checkerColor, game }) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CHECKER,
      canDrop: (item) => game.canMoveChecker(item, position, checkerColor),
      drop: (item: { color: PieceColor; id: number }) =>
        game.moveChecker({ ...item, position }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game]
  );

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
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  );
};
