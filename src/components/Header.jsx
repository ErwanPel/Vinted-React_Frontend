import logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SlideRange from "./SlideRange";
import Toggle from "react-toggle";
import CheckedIcon from "./CheckedIcon";
import UncheckedIcon from "./UncheckedIcon";

import "react-toggle/style.css";
import "../assets/css/header.css";
import { useState } from "react";

export default function Header({
  userToken,
  setUserToken,
  visibleLoginModal,
  setVisibleLoginModal,
  visibleSignModal,
  setVisibleSignModal,
  query,
  setQuery,
  onPay,
  setOnPay,
}) {
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();

  const removeCookies = () => {
    Cookies.remove("token");
    setUserToken("");
    navigate("/");
  };

  const getSignModal = () => {
    setVisibleSignModal(() => !visibleSignModal);
  };

  const getLoginModal = () => {
    setVisibleLoginModal(() => !visibleLoginModal);
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

  // This function play the sort and range search of the header
  const playSearch = () => {
    let newQuery = { ...query };
    newQuery["page"] = 1;
    setQuery(newQuery);
    setOnPay(false);
  };

  return (
    <header className="wrapper">
      <div>
        <Link to="/">
          <img src={logo} alt="logo avec écrit vinted" onClick={playSearch} />
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
        {!onPay && (
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
        )}
      </div>

      {!userToken ? (
        <div className="user-log-create">
          <button onClick={getSignModal}>S'inscrire</button>
          <button onClick={getLoginModal}>Se connecter</button>
        </div>
      ) : (
        <>
          <div>
            <button className="disconnect-button" onClick={removeCookies}>
              Se deconnecter
            </button>
          </div>
          <div className="user-info">
            <button
              onClick={(event) => {
                setUserMenu(!userMenu);
              }}
            >
              User
            </button>
            {userMenu && (
              <div className="user-menu">
                <Link to="/buy" onClick={() => setUserMenu(false)}>
                  <div>Mes achats</div>
                </Link>
                <Link to="/sold" onClick={() => setUserMenu(false)}>
                  <div>Mes ventes</div>
                </Link>
              </div>
            )}
            {/* 
              <button></button>
            </Link>
            
              <button></button>
            </Link> */}
          </div>
        </>
      )}
      <Link to="/offer/publish">
        <button className="sell-button">Vends tes articles</button>
      </Link>
    </header>
  );
}
