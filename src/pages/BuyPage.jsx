/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useState, useEffect } from "react";
import "../assets/css/buySoldPage.css";
import ItemBuy from "../components/ItemBuy";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

export default function BuyPage({ userToken }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unfound, setUnfound] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://site--backend-vinted--fwddjdqr85yq.code.run/user/buy",
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      if (error.response.data.message === "No buy is found") {
        setIsLoading(false);
        setUnfound(true);
      }
    }
  };

  console.log(isLoading);

  useEffect(() => {
    console.log("useEffect buy");
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
                Vous avez effectués {data.count} achat
                {data.count > 1 ? "s" : ""}
              </p>
              {data.getOffer.map((item) => {
                return <ItemBuy item={item} key={item.product._id} />;
              })}
            </>
          ) : (
            <p>Vous n'avez aucun achat</p>
          )}
        </div>
      )}
    </main>
  ) : (
    <Navigate to="/" />
  );
}
