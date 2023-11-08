import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

import "../assets/css/signup-login.css";
import Loader from "../components/Loader";

export default function LoginPage({
  setUserToken,
  setVisibleLoginModal,
  closeModalLogin,
  visibleLoginModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleMail = (event) => {
    setErrorMessage(() => "");
    setEmail(() => event.target.value);
  };

  const handlePassword = (event) => {
    setErrorMessage(() => "");
    setPassword(() => event.target.value);
  };

  // This function send the login information to the server for Loginion
  const setDataLoginion = async (data) => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/login",
        data
      );

      Cookies.set("token", response.data.token);
      Cookies.set("name", response.data.account.username);

      Cookies.set("avatar", response.data.account.avatar);
      setUserToken(() => response.data.token);
      setEmail(() => "");
      setPassword(() => "");
      if (location.state) {
        navigate(location.state.from, {
          state: {
            price: location.state?.price,
            name: location.state?.name,
            sellerID: location.state?.sellerID,
            productID: location.state?.productID,
          },
        });
      } else {
        navigate("/");
      }

      if (visibleLoginModal) setVisibleLoginModal(() => false);
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response?.data?.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUpload(true);
    setErrorMessage(() => "");
    if (email && password) {
      setDataLoginion({ email: email, password: password });
    }
    setIsUpload(false);
  };

  return (
    <main className={visibleLoginModal ? "form-bloc" : "form-bloc wrapper"}>
      <h2>Se Connecter</h2>
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
          {isUpload ? <Loader /> : <button>Se Connecter</button>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link
            to="/user/signup"
            onClick={visibleLoginModal && closeModalLogin}
          >
            <span className="question-user">
              Pas encore de compte ? Inscris-toi !
            </span>
          </Link>
        </div>
      </form>
    </main>
  );
}
