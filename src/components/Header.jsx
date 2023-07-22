import logo from "../assets/img/logo.png";
import "../css/header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({
  userToken,
  setUserToken,
  visibleConnectModal,
  setVisibleConnectModal,
  visibleSignModal,
  setVisibleSignModal,
}) {
  const removeCookies = () => {
    Cookies.remove("token");
    setUserToken(() => "");
  };

  const getSignModal = () => {
    setVisibleSignModal(() => !visibleSignModal);
  };

  const getConnectModal = () => {
    setVisibleConnectModal(() => !visibleConnectModal);
  };
  return (
    <header className="wrapper">
      <div>
        <Link to="/">
          <img src={logo} alt="logo avec écrit vinted" />
        </Link>
      </div>
      <div>RECHERCHER</div>

      {!userToken ? (
        <div className="user-log-create">
          <button onClick={getSignModal}>S'inscrire</button>
          <button onClick={getConnectModal}>Se connecter</button>
        </div>
      ) : (
        <div>
          <button className="disconnect-button" onClick={removeCookies}>
            Se deconnecter
          </button>
        </div>
      )}
      <Link to={userToken ? "/offer/publish" : "/user/signup"}>
        <button className="sell-button">Vends tes articles</button>
      </Link>
    </header>
  );
}
