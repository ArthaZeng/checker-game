import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../common/ItemTypes.ts";
import { PieceColor } from "../common/enums.ts";

export const Checker: React.FC<{ color: boolean | PieceColor; id: number }> = ({
  id,
  color,
}) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CHECKER,
    item: { id, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      style={{ color: color === PieceColor.white ? "red" : undefined }}
      ref={drag}
    >
      dot
    </div>
  );
};
