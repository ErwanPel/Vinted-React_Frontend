import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../css/homePage.css";

import Hero from "../components/Hero";

export default function HomePage() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  let [query, setQuery] = useState("");
  let [page, setPage] = useState("");
  const [selectPage, setSelectPage] = useState();

  if (searchParams && !query) {
    let search = [...searchParams];
    for (let i = 0; i < search.length; i++) {
      if (i > 0) {
        query += "&";
      }

      for (let j = 0; j < search[i].length; j++) {
        if (i === 0 && j === 0) {
          query += "?" + search[i][j];
        }
        if (i > 0 && j === 0) {
          query += search[i][j];
        }
        if (j === 1) {
          query += "=" + search[i][j];
        }
      }
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-vinted--fwddjdqr85yq.code.run/offers${query}`
      );
      setData(response.data);
      setIsLoading(false);
      setSelectPage(
        Array.from(Array(Math.ceil(response.data.count / 20)).keys())
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("UseEffect activated");
    fetchData();
  }, [query]);

  const intl = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const getPage = (event) => {
    if (query && query.search("&page=") === -1) {
      console.log("search", query.search("&page="));
      setQuery(query + `&page=${event.target.value}`);
    } else if (query && query.search("&page=") > -1) {
      let newQuery = query.slice(0, query.search("&page="));
      setQuery(newQuery + `&page=${event.target.value}`);
    } else setQuery(`?page=${event.target.value}`);
  };

  return (
    <div>
      <Hero />

      {isLoading ? (
        <p>Downloading ...</p>
      ) : (
        <main className="wrapper">
          <p>
            Les articles sont au nombre{data.count > 1 ? "s" : ""} de :{" "}
            {data.count}
          </p>
          <div className="offers-bloc">
            {data.offers.map((element) => {
              return (
                <Link
                  to={`offer/${element._id}`}
                  className="offer-home"
                  key={element._id}
                >
                  <span>{element.owner.account.username}</span>
                  <div>
                    <img src={element.product_image[0].secure_url} alt="" />
                  </div>
                  <div>
                    <span className="price">
                      {intl.format(element.product_price)}
                    </span>
                    <span>{element.product_details[1].SIZE}</span>
                    <span>{element.product_details[0].BRAND}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <select name="page" id="page" onChange={getPage}>
            {selectPage.map((element, index) => {
              return (
                <option key={index + 1} value={index + 1}>{`Page ${
                  index + 1
                }`}</option>
              );
            })}
          </select>
        </main>
      )}
    </div>
  );
}
