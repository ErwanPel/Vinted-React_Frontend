import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import intl from "../assets/tools/intl";

import "../assets/css/checkoutForm.css";

export default function CheckoutForm({ userToken, setOnPay }) {
  const [completed, setCompleted] = useState(false);

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
    setOnPay(false);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: location.state?.user_id,
      });

      const stripeToken = stripeResponse.token?.id;
      console.log(stripeToken);
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
        console.log(response.data);
        setCompleted(true);
      } catch (error) {
        console.error(error.response);
      }
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

            <button>Pay</button>
          </>
        ) : (
          <div className="thanks-bloc">
            <p>Merci pour votre achat</p>

            <Link to="/">
              <button type="button" onClick={playSearch}>
                Retour à l'accueil
              </button>
            </Link>
          </div>
        )}
      </form>
    </main>
  );
}
