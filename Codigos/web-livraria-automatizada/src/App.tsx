import React from "react";
import { BrowserRouter } from "react-router-dom";
import Base from "./components/Base/Base";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Base />
    </BrowserRouter>
  );
}

export default App;
