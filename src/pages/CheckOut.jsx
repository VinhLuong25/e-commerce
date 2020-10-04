import React, { useEffect, useState } from "react";
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
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.currUser);
  const timeStamp = new Date();
  console.log(timeStamp);
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
            created_at: timeStamp,
          });
      }
      onSuccessfulCheckout();
      dispatch(clearCart());
    } catch (err) {
      setCheckoutError(err.message);
      setProcessingTo(false);
    }
  };

  //GET WIDTH (screen size)
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    screenSize < 1500 && setShow(false);
  }, [screenSize]);

  return (
    <div className="checkout-page">
      <div className="checkout-cart">
        <div className="show-hide" onClick={() => setShow(!show)}>
          {screenSize < 1500 ? (
            <div className="wrap">
              <span>{show ? "Hide" : "Show"} Order Summary</span>
              <span>${total}</span>
            </div>
          ) : (
            <div className="wrap">
              <span> Order Summary</span>
            </div>
          )}
        </div>
        <div className="summary-cart">
          {(show || screenSize >= 1500) && (
            <div className="wrap">
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
              <hr />
              <form className="discount">
                <input type="text" placeholder="Discount Code" />
                <input type="submit" value="APPLY" />
              </form>
              <hr />
              <div className="total">
                <p>
                  <span>Total</span>
                  <br />
                  <span>*Shipping fee included</span>
                </p>

                <p>${total}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="form wrap">
        {screenSize >= 1500 && <h1 className="title">M.A.D</h1>}
        <BillingDetail />
        <div className="cardElementContainer">
          <CardElement onChange={handleCardDetailsChange} />
        </div>
        {checkoutError && <p>{checkoutError}</p>}
        <Button
          type="submit"
          style={{ height: "7vh" }}
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? "Processing..." : `Pay $${total}`}
        </Button>
      </form>
    </div>
  );
}
