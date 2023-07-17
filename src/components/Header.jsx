import logo from "../assets/img/logo.png";
import "../css/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="wrapper">
      <div>
        <Link to="/">
          <img src={logo} alt="logo avec écrit vinted" />
        </Link>
      </div>
      <div>RECHERCHER</div>
      <div className="user-log-create">
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <button className="sell-button">Vends tes articles</button>
    </header>
  );
}
