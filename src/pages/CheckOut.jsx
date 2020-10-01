import React, { useState } from "react";
import Button from "../components/forms/Button";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import BillingDetail from "../components/BillingDetail";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { firestore } from "../firebase/utils";
import CheckOutProduct from "../components/CheckOutProduct";

export default function CheckOut({ onSuccessfulCheckout }) {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const user = useSelector((state) => state.user.currUser);
  console.log(user);
  //Total Price
  const subtotal = cart.reduce((acc, curr) => {
    if (curr.prodDetail.sale) {
      return acc + curr.quantity * curr.prodDetail.sale;
    } else {
      return acc + curr.quantity * curr.prodDetail.price;
    }
  }, 0);
  const shippingFee = cart.length < 1 ? 0 : 15 && subtotal >= 300 ? 0 : 15;

  const total = subtotal + shippingFee;
  //End Total Price
  const stripe = useStripe();
  const elements = useElements();

  //HANDLE CHANGE
  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  //HANDLE SUBMIT
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.state.value,
      },
    };
    setProcessingTo(true);

    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    try {
      const { data: clientSecret } = await axios.post(
        "http://localhost:4242/api/payment_intents",
        {
          amount: total * 100,
        }
      );
      console.log(clientSecret);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }
    } catch (err) {
      setCheckoutError(err.message);
    }

    //REMEMBER TO FIX THIS
    if (user) {
      firestore
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentMethod.id)
        .set({
          basket: cart,
          amount: total,
        });
    }

    onSuccessfulCheckout();
    dispatch(clearCart());
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <BillingDetail />
        <div className="cardElementContainer">
          <CardElement onChange={handleCardDetailsChange} />
        </div>
        {checkoutError && <p>{checkoutError}</p>}
        <Button type="submit" disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $${total}`}
        </Button>
      </form>
      <div className="sumary-cart">
        {cart.map((prod, index) => {
          const productDetail = prod.prodDetail;
          const size = prod.size;
          const quantityEach = prod.quantity;
          return (
            <CheckOutProduct
              key={index}
              product={productDetail}
              size={size}
              quantityEach={quantityEach}
            />
          );
        })}
      </div>
    </>
  );
}
