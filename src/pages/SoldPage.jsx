import axios from "axios";
import { useState, useEffect } from "react";
import { uid } from "react-uid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import intl from "../assets/tools/intl";

import "../assets/css/buy-sold.css";

export default function SoldPage({ userToken }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unfound, setUnfound] = useState(false);

  const fetchData = async () => {
    try {
      if (userToken) {
        const { data } = await axios.get(
          "https://site--backend-vinted--fwddjdqr85yq.code.run/user/sold",
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("ici", data);
        setData(data);
        setIsLoading(false);
      } else {
        console.log("navigate");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "No sell is found") {
        setIsLoading(false);
        setUnfound(true);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect buy");
    fetchData();
  }, []);

  return (
    <main className="user-bloc">
      {isLoading ? (
        <p>Downloading ...</p>
      ) : (
        <div className="user-bloc wrapper">
          {!unfound ? (
            <>
              <p>
                Vous avez effectués {data.count} vente
                {data.count > 1 ? "s" : ""}
              </p>
              {data.getOffer.map((item) => {
                console.log(item);

                return (
                  <div className="user-page" key={uid(item)}>
                    <div>
                      <span>{item.date}</span>
                      <span>statut : Vente</span>
                    </div>

                    <div className="data-product">
                      <div>
                        <span>{item.product.product_name}</span>
                        <div>
                          <span>{intl.format(item.product.product_price)}</span>
                          <img
                            src={item.product.product_image[0].secure_url}
                            alt="image de l'achat"
                          />
                        </div>
                      </div>
                      <div>
                        {item.product.product_details.map((detail) => {
                          return (
                            <div key={uid(detail)}>
                              <span>{Object.keys(detail)}</span> :{" "}
                              <span>{Object.values(detail)} </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p>Acheté par : </p>
                      <div>
                        <div>
                          {item.buyer.avatar !== "none" ? (
                            <img
                              src={item.buyer.avatar}
                              alt="photo de profil du vendeur"
                            />
                          ) : (
                            <div className="icon-user-empty">
                              <FontAwesomeIcon icon="user" />{" "}
                            </div>
                          )}
                        </div>
                        <span>{item.buyer.username}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p>Vous n'avez aucune vente</p>
          )}
        </div>
      )}
    </main>
  );
}
