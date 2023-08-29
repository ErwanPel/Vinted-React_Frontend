import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

export default function PaymentPage({ userToken, setOnPay }) {
  const stripePromise = loadStripe(
    "pk_test_51NZDzkEBjwRk59e2gvl5hjQkwJMqbVYG4Nz0TfEDUoKZNXkJlCvDVMxv6yk88xT9yffvE8DvEFg0Jdr8BoLVgNgf00czVRK3oN"
  );

  const location = useLocation();

  const price = location.state?.price;
  const name = location.state?.name;
  const sellerID = location.state?.sellerID;
  const productID = location.state?.productID;

  return userToken ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm userToken={userToken} setOnPay={setOnPay} />
    </Elements>
  ) : (
    <Navigate
      to="/user/login"
      state={{
        from: "/payment",
        price: price,
        name: name,
        sellerID: sellerID,
        productID: productID,
      }}
    />
  );
}
