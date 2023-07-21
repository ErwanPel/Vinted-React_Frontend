import hero from "../assets/img/hero.jpg";
import tear from "../assets/img/tearing.svg";
import { Link } from "react-router-dom";

import "../css/hero.css";

export default function Hero({ isConnected }) {
  return (
    <div className="hero-bloc">
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <Link to={isConnected ? "/offer/publish" : "/user/signup"}>
          <button className="sell-button">Commencer à vendre</button>
        </Link>
      </div>

      <img src={tear} alt="effet déchiré" />
    </div>
  );
}
