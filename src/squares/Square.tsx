import React from "react";
import { ItemTypes } from "../ItemTypes.ts";
import { useDrop } from "react-dnd";
import { PieceColor } from "../common/enums.ts";

export const Square = ({ x, y, children, dropItem }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CHECKER,
    drop: (item) => handleDropItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const handleDropItem = (item) => {
    console.log("I receive the drop", item, "toX", x, "toY", y);
    dropItem(item);
  };

  return (
      <div
      ref={drop}
      style={{
        backgroundColor: (x + y) % 2 !== 1 ? PieceColor.white : PieceColor.antiquewhite,
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
