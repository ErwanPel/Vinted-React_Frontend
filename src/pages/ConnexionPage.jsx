import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "../css/signup-connect.css";

export default function ConnexionPage({
  setUserToken,
  setVisibleConnectModal,
  closeModalConnect,
  visibleConnectModal,
  sellPage,
  setSellPage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleMail = (event) => {
    setErrorMessage(() => "");
    setEmail(() => event.target.value);
  };

  const handlePassword = (event) => {
    setErrorMessage(() => "");
    setPassword(() => event.target.value);
  };

  // This function send the login information to the server for connection
  const setDataConnection = async (data) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/login",
        data
      );

      Cookies.set("token", response.data.token);
      setUserToken(() => response.data.token);
      setEmail(() => "");
      setPassword(() => "");
      if (sellPage) {
        navigate("/offer/publish");
        setSellPage(false);
      } else {
        navigate("/");
      }

      if (visibleConnectModal) setVisibleConnectModal(() => false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(() => "");
    if (email && password) {
      setDataConnection({ email: email, password: password });
    }
  };

  return (
    <div className="form-bloc wrapper">
      <h2>Se connecter</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleMail}
            value={email}
            required={true}
          />
        </label>

        <label htmlFor="password">
          {" "}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            onChange={handlePassword}
            value={password}
            required={true}
          />
        </label>

        <div className="form-bloc-down">
          {" "}
          <button>Se connecter</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link
            to="/user/signup"
            onClick={visibleConnectModal && closeModalConnect}
          >
            <span className="question-user">
              Pas encore de compte ? Inscris-toi !
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
