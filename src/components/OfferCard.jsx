import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import intl from "../assets/tools/intl";

export default function OfferCard({ data, setOnPay }) {
  console.log("offerCard", data);

  return (
    <div className="offers-cards">
      {data.offers.map((element) => {
        return (
          <Link
            to={`offer/${element._id}`}
            className="offer-home"
            key={element._id}
            onClick={() => setOnPay(true)}
          >
            <div className="card">
              {" "}
              <div className="offer-user">
                {element.owner.account.avatar !== "none" ? (
                  <img src={element.owner.account.avatar} alt="avatar" />
                ) : (
                  <div className="icon-user-empty">
                    <FontAwesomeIcon icon="user" />
                  </div>
                )}
                <span>{element.owner.account.username}</span>
              </div>
              <div>
                <img src={element.product_image[0].secure_url} alt="product" />
              </div>
              <div>
                <span className="price">
                  {intl.format(element.product_price)}
                </span>
                <span>{element.product_details[1].SIZE}</span>
                <span>{element.product_details[0].BRAND}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
