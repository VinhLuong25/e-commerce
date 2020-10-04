import React, { useEffect, useSelector, useState } from "react";
import LayOut from "../Common/LayOut";
import Order from "../components/Order";
import { firestore } from "../firebase/utils";

export default function PaymentSuccess({ user }) {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) {
      firestore
        .collection("users")
        .doc(user?.id)
        .collection("orders")
        .orderBy("created_at", "desc")
        .get()
        .then((snapshot) => {
          const orderArr = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            orderArr.push(data);
          });
          setOrders(orderArr);
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  const oldOrder = orders.slice(1);
  const newOrder = orders.slice(0, 1);
  return (
    <LayOut>
      <p>Thank you for your purchase</p>
      <p>Your Order</p>

      <div className="new-purchase">
        {newOrder?.map((item, idx) => (
          <Order order={item} key={idx} />
        ))}
      </div>
      <div onClick={() => setShow(!show)}>{oldOrder && "Last Purchase"}</div>
      {show && (
        <div className="old-purchase">
          {oldOrder?.map((item, idx) => (
            <Order order={item} key={idx} />
          ))}
        </div>
      )}
    </LayOut>
  );
}
