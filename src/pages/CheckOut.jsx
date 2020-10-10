import React, { useEffect, useState } from "react";
import Button from "../components/forms/Button";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import BillingDetail from "../components/BillingDetail";
import { useDispatch, useSelector } from "react-redux";
import { applyDiscount, clearCart, removeDiscount } from "../redux/cartSlice";
import { firestore } from "../firebase/utils";
import CheckOutProduct from "../components/CheckOutProduct";
import TotalPrice from "../components/TotalPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
export default function CheckOut({ onSuccessfulCheckout }) {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const inPut = document.querySelector(".discount > input");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currUser);
  const orders = useSelector((state) => state.order.orders);
  const inCart = useSelector((state) => state.cart);
  console.log(inCart);
  const {
    cart,
    total,
    shipping,
    subtotal,
    discountPrice,
    discount,
    disabled,
  } = inCart;
  const timeStamp = new Date();

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
        country: e.target.country.value,
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
            created_at: timeStamp,
            basket: cart,
            amount: total,
            shipping: shipping,
            discount: discount,
            discountAmount: discountPrice,
            subtotal: subtotal,
            paymentMethodReq: paymentMethodReq,
          });
      }
      onSuccessfulCheckout();
      dispatch(clearCart());
    } catch (err) {
      setCheckoutError(err.message);
      setProcessingTo(false);
    }
  };

  //HANDLE DISCOUNT SUMIT
  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    const discount = e.target.coupon.value;

    if (discount.trim() === "newuser10") {
      if (user && orders === null) {
        setLoading(true);
        dispatch(applyDiscount({ discount: 0.1 }));
      } else {
        inPut && inPut.classList.add("error");
        setErr("Are you a new user?");
      }
    } else if (discount.trim() === "abcdxyz") {
      setLoading(true);
      setTimeout(() => {
        dispatch(applyDiscount({ discount: 0.2 }));
        setLoading(false);
      }, 1200);
      console.log("success");
    } else {
      inPut && inPut.classList.add("error");
      setErr("Code is not available");
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
  console.log(discount);
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
              <form className="discount" onSubmit={handleDiscountSubmit}>
                <input
                  id="couponCode"
                  type="text"
                  placeholder="Discount Code"
                  name="coupon"
                  className="inPut"
                  disabled={disabled}
                  onFocus={() => {
                    setErr(null);
                    if (inPut && inPut.classList.contains("error")) {
                      console.log("remove success");
                      inPut.classList.remove("error");
                    }
                  }}
                />
                <p className="button">
                  {discount ? (
                    <>
                      <FontAwesomeIcon
                        icon={faCheck}
                        color="white"
                        size="2x"
                        className="icon"
                      />
                      <span className="text">Code Applied</span>
                    </>
                  ) : (
                    <>
                      {loading ? (
                        <span className="loading"></span>
                      ) : (
                        <Button type="submit" className="code-apply">
                          Apply
                        </Button>
                      )}
                    </>
                  )}
                </p>
              </form>
              {discount && (
                <div
                  className="closebtn"
                  onClick={() => {
                    dispatch(removeDiscount());
                    document.getElementById("couponCode").value = "";
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} /> <span>remove code</span>
                </div>
              )}

              {err && <div style={{ color: "#fe8c8c" }}>*{err}</div>}

              <hr />
              <TotalPrice />
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="form wrap">
        {screenSize >= 1500 && <h1 className="title">M.A.D</h1>}
        <BillingDetail user={user} />
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
