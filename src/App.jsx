import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./assets/css/App.css";
import "./assets/css/font.css";

import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";
import Modal from "./components/Modal";
import LoginPage from "./pages/LoginPage";
import Publish from "./pages/Publish";
import PaymentPage from "./pages/PaymentPage";
import BuyPage from "./pages/BuyPage";
import SoldPage from "./pages/SoldPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faPlus,
  faUser,
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faArrowDown,
  faArrowUp,
  faPlus,
  faUser,
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft
);
function App() {
  const [query, setQuery] = useState({
    page: 1,
    sort: 1,
    values: [0, 100],
    limit: 10,
  });
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");

  const [visibleLoginModal, setVisibleLoginModal] = useState(false);
  const [visibleSignModal, setVisibleSignModal] = useState(false);
  const [sellPage, setSellPage] = useState(false);
  const [onPay, setOnPay] = useState(false);
  const [visibleModify, setVisibleModify] = useState(false);

  return (
    <div className="app">
      <Router>
        <Header
          userToken={userToken}
          setUserToken={setUserToken}
          visibleLoginModal={visibleLoginModal}
          setVisibleLoginModal={setVisibleLoginModal}
          visibleSignModal={visibleSignModal}
          setVisibleSignModal={setVisibleSignModal}
          query={query}
          setQuery={setQuery}
          sellPage={sellPage}
          setSellPage={setSellPage}
          onPay={onPay}
          setOnPay={setOnPay}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userToken={userToken}
                query={query}
                setQuery={setQuery}
                setOnPay={setOnPay}
              />
            }
          />
          <Route
            path="/offer/:id"
            element={
              <OfferPage
                setOnPay={setOnPay}
                userToken={userToken}
                visibleModify={visibleModify}
                setVisibleModify={setVisibleModify}
              />
            }
          />
          <Route
            path="/user/signup"
            element={<SignUpPage setUserToken={setUserToken} />}
          />
          <Route
            path="/user/login"
            element={<LoginPage setUserToken={setUserToken} />}
          />
          <Route
            path="/offer/publish"
            element={
              <Publish
                userToken={userToken}
                setOnPay={setOnPay}
                query={query}
                setQuery={setQuery}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PaymentPage
                userToken={userToken}
                onPay={onPay}
                setOnPay={setOnPay}
              />
            }
          />
          <Route path="/buy" element={<BuyPage userToken={userToken} />} />
          <Route path="/sold" element={<SoldPage userToken={userToken} />} />
        </Routes>
        {visibleLoginModal && (
          <Modal
            visibleLoginModal={visibleLoginModal}
            setVisibleLoginModal={setVisibleLoginModal}
            setUserToken={setUserToken}
          />
        )}
        {visibleSignModal && (
          <Modal
            setUserToken={setUserToken}
            visibleSignModal={visibleSignModal}
            setVisibleSignModal={setVisibleSignModal}
          />
        )}
        {visibleModify && (
          <Modal
            userToken={userToken}
            visibleModify={visibleModify}
            setVisibleModify={setVisibleModify}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
