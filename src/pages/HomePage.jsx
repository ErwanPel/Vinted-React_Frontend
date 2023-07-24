import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";

import "../css/homePage.css";

import Hero from "../components/Hero";

export default function HomePage({ isConnected, query, setQuery }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [searchParams] = useSearchParams();

  let [page, setPage] = useState("");
  const [selectPage, setSelectPage] = useState();

  // if search params in the URL, the variable query contain the request
  // of the URL
  // if (searchParams && !query) {
  //   let search = [...searchParams];
  //   for (let i = 0; i < search.length; i++) {
  //     if (i > 0) {
  //       query += "&";
  //     }
  //     for (let j = 0; j < search[i].length; j++) {
  //       if (i === 0 && j === 0) {
  //         query += "?" + search[i][j];
  //       }
  //       if (i > 0 && j === 0) {
  //         query += search[i][j];
  //       }
  //       if (j === 1) {
  //         query += "=" + search[i][j];
  //       }
  //     }
  //   }
  // }

  // this function obtain all the offer from the server
  const fetchData = async () => {
    let queryUrl = "";

    if (query) {
      let key = Object.keys(query);

      for (let i = 0; i < key.length; i++) {
        console.log(i, key[i]);
        if (i === 0) {
          queryUrl += `?${key[i]}=${query[key[i]]}`;
        } else if (query[key[i]].length === 2) {
          console.log("ici", [key[i]]);
          for (let j = 0; j < query[key[i]].length; j++) {
            console.log("j", query[key[i]][j]);
            if (j === 0) {
              queryUrl += `&priceMin=${query[key[i]][j]}`;
            } else {
              queryUrl += `&priceMax=${query[key[i]][j]}`;
            }
          }
          //
        } else {
          queryUrl += `&${key[i]}=${query[key[i]]}`;
        }
      }
      console.log("query url", queryUrl);
    }
    try {
      const response = await axios.get(
        `https://site--backend-vinted--fwddjdqr85yq.code.run/offers${queryUrl}`
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

  const handleLimit = (event) => {
    let newQuery = { ...query };
    newQuery["limit"] = event.target.value;
    console.log(newQuery);
    setQuery(newQuery);
  };

  // This function render the page asked by the user and replace
  // the ancient query
  // const getPage = (event) => {
  //   if (query && query.search("&page=") === -1) {
  //     console.log("search", query.search("&page="));
  //     setQuery(query + `&page=${event.target.value}`);
  //   } else if (query && query.search("&page=") > -1) {
  //     let newQuery = query.slice(0, query.search("&page="));
  //     setQuery(newQuery + `&page=${event.target.value}`);
  //   } else setQuery(`?page=${event.target.value}`);
  // };

  const getPage = (event) => {
    const newQuery = { ...query };
    newQuery["page"] = event.target.value;
    setQuery(newQuery);
    console.log(newQuery);
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
        <main className="wrapper offer-bloc">
          <div>
            <p>
              Les articles sont au nombre{data.count > 1 ? "s" : ""} de :{" "}
              {data.count}
            </p>
            <label htmlFor="limit">
              Nombre d'articles à afficher par page :{" "}
            </label>
            <input type="text" name="limit" id="limit" onChange={handleLimit} />
          </div>
          <OfferCard
            data={data}
            getPage={getPage}
            selectPage={selectPage}
            setQuery={setQuery}
            query={query}
          />
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
