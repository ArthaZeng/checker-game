import * as React from "react";

import { Board } from "./chessBoard/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./game/Game";
import { containerStyle } from "./styles";

const App = () => {
  const game = React.useMemo(() => new Game(), []);
  return (
    <div style={containerStyle}>
      <DndProvider backend={HTML5Backend}>
        <Board game={game} />
      </DndProvider>
    </div>
  );
};

export default App;
