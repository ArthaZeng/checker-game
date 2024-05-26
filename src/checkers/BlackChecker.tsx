import * as React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../common/ItemTypes";
import { checkerStyle } from "./styles";

export const BlackChecker = ({ id, color, game }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CHECKER,
    item: { id, color },
    end: (item) => game.endDrag(item),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <img
        style={checkerStyle}
        src={require("./img/black_checker.png")}
        alt="black_checker"
      />
    </div>
  );
};
