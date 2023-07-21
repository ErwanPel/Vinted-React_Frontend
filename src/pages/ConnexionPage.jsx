import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "../css/signup-connect.css";

export default function ConnexionPage({ setIsConnected }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // This function send the login information to the server for connection
  const setDataConnection = async (data) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/login",
        data
      );
      console.log(response.data);
      Cookies.set("token", response.data.token);
      setIsConnected(() => true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMail = (event) => {
    setEmail(() => event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(() => event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(() => "");
    if (email && password) {
      console.log({ email: email, password: password });
      setDataConnection({ email: email, password: password });
      setEmail(() => "");
      setPassword(() => "");
      navigate("/");
    } else {
      setErrorMessage(() => "Veuillez remplir tous les champs");
    }
  };

  return (
    <div
      className="modal-content wrapper"
      onClick={(event) => event.stopPropagation()}
    >
      <h2>Se connecter</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleMail}
          value={email}
          required={true}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          onChange={handlePassword}
          value={password}
          required={true}
        />
        <button>Se connecter</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/user/signup">
          <span className="question-user">
            Pas encore de compte ? Inscris-toi !
          </span>
        </Link>
      </form>
    </div>
  );
}
