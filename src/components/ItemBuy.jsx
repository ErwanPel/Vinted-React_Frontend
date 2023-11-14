/* eslint-disable jsx-a11y/img-redundant-alt */
import { uid } from "react-uid";
import intl from "../assets/tools/intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/css/itemSoldBuy.css";

export default function ItemBuy({ item }) {
  console.log("itembuy", item);
  return (
    <div className="user-page" key={uid(item)}>
      <div>
        <span>{item.date}</span>
        <span>statut : Achat</span>
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
        <p>Vendu par: </p>
        <div>
          {item.product.owner.account.avatar !== "none" ? (
            <img
              className="profil"
              src={item.product.owner.account?.avatar}
              alt="image de l'achat"
            />
          ) : (
            <div className="icon-user-empty">
              <FontAwesomeIcon icon="user" />{" "}
            </div>
          )}{" "}
          <span>{item.product.owner.account.username}</span>
        </div>
      </div>
    </div>
  );
}
