import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import InfoBook from "./pages/InfoBook/InfoBook";
import Login from "./pages/Login/Login";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/info-book/:id" element={<InfoBook />} />
    </Routes>
  );
}

export default MainRoutes;
