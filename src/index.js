import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <div>
    <StrictMode>
      <App />
    </StrictMode>
  </div>,
  document.getElementById("root")
);
