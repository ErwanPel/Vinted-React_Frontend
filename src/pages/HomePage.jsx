// import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import { uid } from "react-uid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/css/homePage.css";

import Hero from "../components/Hero";

export default function HomePage({ isConnected, query, setQuery, setOnPay }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [searchParams] = useSearchParams();
  const [selectPage, setSelectPage] = useState();

  const controller = new AbortController();

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
        if (i === 0) {
          queryUrl += `?${key[i]}=${query[key[i]]}`;
        } else if (query[key[i]].length === 2) {
          for (let j = 0; j < query[key[i]].length; j++) {
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
    }
    try {
      const response = await axios.get(
        `https://site--backend-vinted--fwddjdqr85yq.code.run/offers${queryUrl}`,
        { signal: controller.signal }
      );

      setData(response.data);
      setIsLoading(false);
      setSelectPage(
        Array.from(Array(Math.ceil(response.data.count / query.limit)).keys())
      );
      console.log("page", selectPage);
    } catch (error) {
      console.error(error);
      controller.abort();
    }
  };

  const getPage = (page) => {
    const newQuery = { ...query };
    newQuery["page"] = parseInt(page);
    setQuery(newQuery);
  };

  useEffect(() => {
    console.log("UseEffect activated");
    fetchData();
    console.log(data);
    if (data !== undefined) {
      return () => {
        controller.abort();
      };
    }
  }, [query]);

  console.log(query.page);

  return (
    <div>
      <Hero isConnected={isConnected} />

      {isLoading ? (
        <p>Downloading ...</p>
      ) : (
        <main className="wrapper offer-bloc">
          {data.count > 0 ? (
            <>
              <div>
                <p>
                  Les articles sont au nombre{data.count > 1 ? "s" : ""} de :{" "}
                  {data.count}
                </p>
              </div>
              <OfferCard
                data={data}
                getPage={getPage}
                selectPage={selectPage}
                setOnPay={setOnPay}
              />
              <div className="select-bloc">
                <FontAwesomeIcon
                  icon="angles-left"
                  onClick={(event) => getPage(1, event)}
                  className={query.page === 1 ? "unvisible" : "chevron"}
                />
                <FontAwesomeIcon
                  icon="chevron-left"
                  onClick={() => getPage(query.page - 1)}
                  className={query.page === 1 ? "unvisible" : "chevron"}
                />
                <select
                  name="page"
                  id="page"
                  onChange={(event) => getPage(event.target.value)}
                  value={query.page}
                >
                  {selectPage.map((element, index) => {
                    return (
                      <option key={uid(element)} value={index + 1}>{`Page ${
                        index + 1
                      }`}</option>
                    );
                  })}
                </select>
                <FontAwesomeIcon
                  icon="chevron-right"
                  onClick={() => getPage(query.page + 1)}
                  className={
                    query.page === selectPage.length ? "unvisible" : "chevron"
                  }
                />
                <FontAwesomeIcon
                  icon="angles-right"
                  onClick={(event) => getPage(selectPage.length, event)}
                  className={
                    query.page === selectPage.length ? "unvisible" : "chevron"
                  }
                />
              </div>
            </>
          ) : (
            <p>Pas de recherche</p>
          )}
        </main>
      )}
    </div>
  );
}
