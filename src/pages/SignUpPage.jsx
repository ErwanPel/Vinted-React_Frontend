import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "../css/signup-connect.css";

export default function SignUpPage({ isConnected, setIsConnected }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleName = (event) => {
    setName(() => event.target.value);
  };

  const handleMail = (event) => {
    setEmail(() => event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(() => event.target.value);
  };

  const handleNewsletter = (event) => {
    setNewsLetter(() => event.target.checked);
  };

  // This function send the information to the server for create an account
  const setDataForm = async (data) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/signup",
        data
      );
      console.log(response.data);
      Cookies.set("token", response.data.token, { expires: 1 });
      setIsConnected(() => true);
    } catch (error) {
      console.error(error);
    }
  };

  // This function send a mail to the administrator
  const setMailAdmin = async (data) => {
    try {
      console.log("mail");
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/admin/form",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password) {
      setDataForm({
        username: name,
        email: email,
        password: password,
        newsletter: newsletter,
      });
      setMailAdmin({ username: name, email: email, newsletter: newsletter });
      setName(() => "");
      setEmail(() => "");
      setPassword(() => "");
      setNewsLetter(() => "");

      navigate("/");
    } else {
      setErrorMessage(() => "Veuillez remplir le(s) champ(s) manquant(s)");
    }
  };

  console.log(name);
  return (
    <div className="modal-content wrapper">
      <h2>S'inscrire</h2>
      <form
        // action="https://site--backend-vinted--fwddjdqr85yq.code.run/user/signup"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nom d'utilisateur"
          onChange={handleName}
          value={name}
          required={true}
        />

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
          minLength="6"
          onChange={handlePassword}
          value={password}
          required={true}
        />

        <div className="newsletter-item">
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            onChange={handleNewsletter}
          />
          <span>S'inscrire à la newsletter</span>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button>S'inscrire</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/user/login">
          <span className="question-user">
            Tu as déjà un compte ? Connecte-toi !
          </span>
        </Link>
      </form>
    </div>
  );
}
