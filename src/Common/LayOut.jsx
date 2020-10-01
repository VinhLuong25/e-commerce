import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function LayOut({ children }) {
  return (
    <>
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
}
