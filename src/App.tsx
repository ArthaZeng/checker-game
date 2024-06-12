import * as React from "react";

import { Board } from "./chessBoard/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./game/Game";
import { containerStyle } from "./styles";

const url = "https://ciphersprint.pulley.com/";
const email = "arthazeng519@gmail.com";

const sendRequest = async () => {
  const res = await fetch(`${url}${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": null,
    },
  });

  console.log(res);
};

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
