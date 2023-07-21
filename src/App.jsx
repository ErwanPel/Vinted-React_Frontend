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

function App() {
  const [isConnected, setIsConnected] = useState(
    Cookies.get("token") ? true : false
  );
  const [visibleConnectModal, setVisibleConnectModal] = useState(false);
  const [visibleSignModal, setVisibleSignModal] = useState(false);

  return (
    <div className="app">
      <Router>
        <Header
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          visibleConnectModal={visibleConnectModal}
          setVisibleConnectModal={setVisibleConnectModal}
          visibleSignModal={visibleSignModal}
          setVisibleSignModal={setVisibleSignModal}
        />
        <Routes>
          <Route path="/" element={<HomePage isConnected={isConnected} />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route
            path="/user/signup"
            element={
              <SignUpPage
                isConnected={isConnected}
                setIsConnected={setIsConnected}
              />
            }
          />
          <Route
            path="/user/login"
            element={
              <ConnexionPage
                isConnected={isConnected}
                setIsConnected={setIsConnected}
              />
            }
          />
          <Route path="/offer/publish" element={<PublishOffer />} />
        </Routes>
        {visibleConnectModal && (
          <Modal
            visibleConnectModal={visibleConnectModal}
            setVisibleConnectModal={setVisibleConnectModal}
            setIsConnected={setIsConnected}
          />
        )}
        {visibleSignModal && (
          <Modal
            setIsConnected={setIsConnected}
            visibleSignModal={visibleSignModal}
            setVisibleSignModal={setVisibleSignModal}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
