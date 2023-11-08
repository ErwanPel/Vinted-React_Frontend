/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import ItemSold from "../components/itemSold";
import "../assets/css/buySoldPage.css";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

export default function SoldPage({ userToken }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unfound, setUnfound] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/sold",
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "No sell is found") {
        setIsLoading(false);
        setUnfound(true);
      }
    }
  };

  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  return userToken ? (
    <main className="user-bloc-main">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="user-bloc wrapper">
          {!unfound ? (
            <>
              <p>
                Vous avez effectués {data.count} vente
                {data.count > 1 ? "s" : ""}
              </p>
              {data.getOffer.map((item) => {
                return <ItemSold item={item} key={item.product._id} />;
              })}
            </>
          ) : (
            <p>Vous n'avez aucune vente</p>
          )}
        </div>
      )}
    </main>
  ) : (
    <Navigate to="/" />
  );
}
