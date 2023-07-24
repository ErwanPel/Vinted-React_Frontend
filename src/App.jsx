import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./css/App.css";
import "./css/font.css";

import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";
import Modal from "./components/Modal";
import ConnexionPage from "./pages/ConnexionPage";
import PublishOffer from "./pages/PublishOffer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowDown, faArrowUp);
function App() {
  const [query, setQuery] = useState({
    page: 1,
    sort: 1,
    values: [0, 100],
  });
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");
  const [visibleConnectModal, setVisibleConnectModal] = useState(false);
  const [visibleSignModal, setVisibleSignModal] = useState(false);

  return (
    <div className="app">
      <Router>
        <Header
          userToken={userToken}
          setUserToken={setUserToken}
          visibleConnectModal={visibleConnectModal}
          setVisibleConnectModal={setVisibleConnectModal}
          visibleSignModal={visibleSignModal}
          setVisibleSignModal={setVisibleSignModal}
          query={query}
          setQuery={setQuery}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userToken={userToken}
                query={query}
                setQuery={setQuery}
              />
            }
          />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route
            path="/user/signup"
            element={<SignUpPage setUserToken={setUserToken} />}
          />
          <Route
            path="/user/login"
            element={<ConnexionPage setUserToken={setUserToken} />}
          />
          <Route path="/offer/publish" element={<PublishOffer />} />
        </Routes>
        {visibleConnectModal && (
          <Modal
            visibleConnectModal={visibleConnectModal}
            setVisibleConnectModal={setVisibleConnectModal}
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
      </Router>
    </div>
  );
}

export default App;
