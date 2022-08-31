import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import InfoBook from "./pages/InfoBook/InfoBook";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info-book/:id" element={<InfoBook />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default MainRoutes;
