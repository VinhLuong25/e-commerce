import React from "react";
import { useHistory } from "react-router-dom";
import LayOut from "../Common/LayOut";
import CheckOut from "./CheckOut";

export default function CheckOutPage() {
  const history = useHistory();
  return (
    <LayOut>
      <CheckOut onSuccessfulCheckout={() => history.push("/payment-success")} />
    </LayOut>
  );
}
