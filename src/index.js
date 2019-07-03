import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Game from "./Components/Game";
import addArrayonClick from "./Store/reducers/index";
import "./index.css";

const store = createStore(addArrayonClick);

function App() {
  return (
    <Provider store={store}>
      <div>
        <Game />
      </div>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
