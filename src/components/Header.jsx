import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import SlideRange from "./SlideRange";
import Toggle from "react-toggle";
import CheckedIcon from "./CheckedIcon";
import UncheckedIcon from "./UncheckedIcon";
import { useNavigate } from "react-router-dom";

import "react-toggle/style.css";
import "../css/header.css";

export default function Header({
  userToken,
  setUserToken,
  visibleConnectModal,
  setVisibleConnectModal,
  visibleSignModal,
  setVisibleSignModal,
  query,
  setQuery,
  sellPage,
  setSellPage,
}) {
  const navigate = useNavigate();

  const removeCookies = () => {
    Cookies.remove("token");
    setUserToken("");
    navigate("/");
  };

  const getSignModal = () => {
    setVisibleSignModal(() => !visibleSignModal);
  };

  const getConnectModal = () => {
    setVisibleConnectModal(() => !visibleConnectModal);
  };

  const handleTitle = (event) => {
    let newQuery = { ...query };
    newQuery["title"] = event.target.value;
    newQuery["page"] = 1;
    setQuery(newQuery);
  };

  const handleSort = (event) => {
    let newQuery = { ...query };
    if (event.target.checked) {
      newQuery["sort"] = -1;
      setQuery(newQuery);
    } else {
      newQuery["sort"] = 1;
      setQuery(newQuery);
    }
  };

  return (
    <header className="wrapper">
      <div>
        <Link to="/">
          <img src={logo} alt="logo avec écrit vinted" />
        </Link>
      </div>
      <div className="search-bloc">
        <div>
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="rechercher"
            onChange={handleTitle}
          />
        </div>
        <div className="price-search-bloc">
          <div className="checkbox-sort">
            <div>
              <label htmlFor="sort">Trier par prix : </label>
            </div>

            <Toggle
              type="checkbox"
              name="sort"
              id="sort"
              onChange={handleSort}
              className="toggle"
              icons={{
                checked: <CheckedIcon className="check" />,
                unchecked: <UncheckedIcon />,
              }}
            />
          </div>
          <div className="range-bloc">
            <div>
              {" "}
              <label htmlFor="priceRange">Prix entre : </label>
            </div>

            <SlideRange
              className="range-bar"
              id="priceRange"
              query={query}
              setQuery={setQuery}
            />
          </div>
        </div>
      </div>

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
        <button
          className="sell-button"
          onClick={!userToken && setSellPage(true)}
        >
          Vends tes articles
        </button>
      </Link>
    </header>
  );
}
