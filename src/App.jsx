import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./css/App.css";
import "./css/font.css";

import HomePage from "./page/HomePage";
import OfferPage from "./page/OfferPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
    </Router>
  );
}

export default App;
