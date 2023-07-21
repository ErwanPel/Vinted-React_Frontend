import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";

import "../css/homePage.css";

import Hero from "../components/Hero";

export default function HomePage({ isConnected }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  let [query, setQuery] = useState("");
  let [page, setPage] = useState("");
  const [selectPage, setSelectPage] = useState();

  // if search params in the URL, the variable query contain the request
  // of the URL
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

  // this function obtain all the offer from the server
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

  // This function render the page asked by the user and replace
  // the ancient query
  const getPage = (event) => {
    if (query && query.search("&page=") === -1) {
      console.log("search", query.search("&page="));
      setQuery(query + `&page=${event.target.value}`);
    } else if (query && query.search("&page=") > -1) {
      let newQuery = query.slice(0, query.search("&page="));
      setQuery(newQuery + `&page=${event.target.value}`);
    } else setQuery(`?page=${event.target.value}`);
  };

  useEffect(() => {
    console.log("UseEffect activated");
    fetchData();
  }, [query]);

  return (
    <div>
      <Hero isConnected={isConnected} />

      {isLoading ? (
        <p>Downloading ...</p>
      ) : (
        <OfferCard data={data} getPage={getPage} selectPage={selectPage} />
      )}
    </div>
  );
}
