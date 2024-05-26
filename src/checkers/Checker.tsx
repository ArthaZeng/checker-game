import * as React from "react";
import { PieceColor } from "../common/enums";
import { checkerStyle } from "./styles";
import { BlackChecker } from "./BlackChecker";

export const Checker = (props) => {
  const { color } = props;
  return color === PieceColor.white ? (
    <div>
      <img
        style={checkerStyle}
        src={require("./img/white_checker.png")}
        alt="white_checker"
      />
    </div>
  ) : (
    <BlackChecker {...props} />
  );
};
