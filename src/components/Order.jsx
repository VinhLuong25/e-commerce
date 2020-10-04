import React from "react";
import moment from "moment";
import CheckOutProduct from "./CheckOutProduct";
export default function Order({ order }) {
  console.log(order);

  const { amount, basket, created_at } = order;

  return (
    <div className="order">
      <p>{moment.unix(created_at.seconds).format("DD-MM-YYYY hh:mm:ss A")}</p>
      <div className="order__detail">
        {basket.map((ord, index) => (
          <CheckOutProduct
            key={index}
            product={ord.prodDetail}
            size={ord.size}
            quantityEach={ord.quantity}
          />
        ))}
      </div>
    </div>
  );
}
