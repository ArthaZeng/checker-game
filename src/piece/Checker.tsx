import React from "react";
import { PieceColor } from "../common/enums";

export const Checker: React.FC<{ hasChecker: boolean | PieceColor }> = ({
  hasChecker
}) => {
  return hasChecker ? <div>dot</div> : null;
};
