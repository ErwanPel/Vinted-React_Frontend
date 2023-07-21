import { Link } from "react-router-dom";

export default function OfferCard({ data, getPage, selectPage }) {
  const intl = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <main className="wrapper offer-card">
      <p>
        Les articles sont au nombre{data.count > 1 ? "s" : ""} de : {data.count}
      </p>
      <div className="offers-bloc">
        {data.offers.map((element) => {
          return (
            <Link
              to={`offer/${element._id}`}
              className="offer-home"
              key={element._id}
            >
              <div className="offer-user">
                {element.owner.account.avatar !== "none" && (
                  <img src={element.owner.account.avatar} alt="avatar" />
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
  );
}
