import hero from "../assets/img/hero.jpg";
import tear from "../assets/img/tearing.svg";

import "../css/hero.css";

export default function Hero() {
  return (
    <div className="hero-bloc">
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button className="sell-button">Commencer à vendre</button>
      </div>

      <img src={tear} alt="effet déchiré" />
    </div>
  );
}
