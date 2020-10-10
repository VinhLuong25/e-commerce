import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayOut from "../Common/LayOut";
import Order from "../components/Order";
import { firestore } from "../firebase/utils";

export default function PaymentSuccess({ user }) {
  const orders = useSelector((state) => state.order.orders);
  const [show, setShow] = useState(false);
  console.log(orders);
  const oldOrder = orders && orders.slice(1);
  const newOrder = orders && orders.slice(0, 1);
  return (
    <LayOut>
      <div className="payment-success">
        <div className="order-confirmation">
          <p>order confirmation</p>
          <p>
            <span>{user?.displayName}</span>, thank you for your order!
          </p>
          <p>
            We've received your order and will contact you as soon as your
            package is shipped
          </p>
        </div>

        <p className="yourOrder">Your Order</p>
        <div className="new-purchase">
          {newOrder?.map((item, idx) => (
            <Order order={item} key={idx} />
          ))}
        </div>
        <div onClick={() => setShow(!show)}>
          {orders.length >= 1 && "Last Purchase"}
        </div>
        {show && (
          <div className="old-purchase">
            {oldOrder?.map((item, idx) => (
              <Order order={item} key={idx} />
            ))}
          </div>
        )}
      </div>
    </LayOut>
  );
}
