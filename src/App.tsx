import React, { CSSProperties, useMemo } from "react";
import "./App.css";
import { Board } from "./chessBoard/Board.tsx";
import { PieceColor } from "./common/enums.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CheckerGame } from "./CheckerGame.ts";

const containerStyle: CSSProperties = {
  width: 500,
  height: 500,
  border: `1px solid ${PieceColor.antiquewhite}`,
};

const App = () => {
  const game = useMemo(() => new CheckerGame(), [])
  return (
    <div style={containerStyle}>
      <DndProvider backend={HTML5Backend}>
        <Board game={game} />
      </DndProvider>
    </div>
  );
};

export default App;
