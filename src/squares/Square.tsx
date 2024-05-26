import * as React from "react";
import { ItemTypes } from "../common/ItemTypes";
import { useDrop } from "react-dnd";
import { PieceColor } from "../common/enums";
import { getPosition } from "../common/functions";
import { Overlay, OverlayType } from "./Overlay";
import { CheckerItem } from "../common/types";

const isWhiteSquare = (point: number) => {
  const [x, y] = getPosition(point);
  return (x + y) % 2 !== 1;
};

export const Square = ({ position, children, game }) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CHECKER,
      canDrop: (item) => game.canMoveBlackChecker(item, position),
      drop: (item: CheckerItem) => game.moveBlackChecker({ ...item, position }),
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
