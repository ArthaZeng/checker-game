import React from "react";
import { PieceProps } from "./types";

export const Piece: React.FC<PieceProps> = ({ color, children }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      {children}
    </div>
  );
};
