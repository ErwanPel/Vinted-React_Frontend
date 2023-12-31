import { useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import intl from "../assets/tools/intl";

import "../assets/css/checkoutForm.css";
import Loader from "./Loader";

export default function CheckoutForm({ userToken, setOnPay, query, setQuery }) {
  const [completed, setCompleted] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const buyerProtectionFee = 0.4;
  const shippingFees = 0.8;

  const getTotal = () => {
    return buyerProtectionFee + shippingFees + location.state?.price;
  };

  const total = getTotal();

  // This function play the sort and range search of the header
  const playSearch = () => {
    let newQuery = { ...query };
    newQuery["title"] = "";
    newQuery["page"] = 1;
    setQuery(newQuery);
    setOnPay(false);
    Navigate("/");
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsUpload(true);
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: location.state?.user_id,
      });

      const stripeToken = stripeResponse.token?.id;

      try {
        const response = await axios.post(
          "https://site--backend-vinted--fwddjdqr85yq.code.run/pay",
          {
            stripeToken,
            total,
            name: location.state?.name,
            sellerID: location.state?.sellerID,
            productID: location.state?.productID,
          },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );

        setCompleted(true);
      } catch (error) {
        console.error(error.response);
      }
      setIsUpload(false);
    } catch (error) {
      console.error(error.data);
    }
  };

  return (
    <main className="wrapper pay">
      <form onSubmit={handleSubmit} className="pay-form-bloc">
        <div className="pay-top-bloc">
          <p>Résumé de la commande</p>
          <div className="item-top-bloc">
            <div>
              <div>
                <div>
                  <span>Commande</span>
                </div>
                <div>
                  <span>{intl.format(location.state?.price)}</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <span>Frais de protection acheteurs</span>
                </div>
                <div>
                  <span>{intl.format(buyerProtectionFee)}</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  {" "}
                  <span>Frais de port</span>
                </div>
                <div>
                  <span>{intl.format(shippingFees)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pay-middle-bloc">
          <div>
            <div>
              <p>Total</p>
            </div>
            <div>
              <span> {intl.format(total)}</span>
            </div>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <strong>{`\"${location.state?.name}\"`}</strong>. Vous allez payer{" "}
            <strong>{intl.format(total)}</strong> (frais de protection et frais
            de port inclus).
          </p>
        </div>
        {!completed ? (
          <>
            <div className="card-bloc">
              <CardElement />
            </div>

            {isUpload ? <Loader /> : <button>Pay</button>}
          </>
        ) : (
          <div className="thanks-bloc">
            <p>Merci pour votre achat</p>

            <Link to="/" onClick={playSearch}>
              <button type="button">Retour à l'accueil</button>
            </Link>
          </div>
        )}
      </form>
    </main>
  );
}
