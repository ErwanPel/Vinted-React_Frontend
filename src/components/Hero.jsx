import tear from "../assets/img/tearing.svg";
import { Link } from "react-router-dom";

import "../assets/css/hero.css";

export default function Hero({ isConnected }) {
  return (
    <div className="hero-bloc">
      <div className="wrapper">
        <div className="window">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <Link to="/offer/publish">
            <button className="sell-button">Commencer à vendre</button>
          </Link>
        </div>
      </div>

      <img src={tear} alt="effet déchiré" />
    </div>
  );
}
