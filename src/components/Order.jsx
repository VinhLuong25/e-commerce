import React from "react";
import moment from "moment";
import CheckOutProduct from "./CheckOutProduct";
import TotalPrice from "./TotalPrice";
export default function Order({ order }) {
  const {
    amount,
    basket,
    created_at,
    shipping,
    subtotal,
    discount,
    discountAmount,
    paymentMethodReq,
  } = order;
  const { address, name } = paymentMethodReq.paymentMethod.billing_details;
  const {
    brand,
    exp_month,
    exp_year,
    last4,
  } = paymentMethodReq.paymentMethod.card;
  return (
    <div className="order">
      <p style={{ textAlign: "center" }}>
        Order date: {""}
        {moment.unix(created_at.seconds).format("DD MMM YYYY")}
      </p>
      <hr />

      {/* START - ORDER SUMMARY */}
      <div className="order__detail">
        {basket.map((ord, index) => (
          <CheckOutProduct
            key={index}
            product={ord.prodDetail}
            size={ord.size}
            quantityEach={ord.quantity}
          />
        ))}
        <hr />

        <div>
          <table className="first-table">
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td>${subtotal}</td>
              </tr>

              {/* start - discount here */}
              {discount && (
                <tr>
                  <td>Discount:</td>
                  <td>-{discountAmount}</td>
                </tr>
              )}
              {/* end - discount here */}

              <tr style={{ paddingBottom: "20px" }}>
                <td>Shipping fee:</td>
                <td>${shipping}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table className="second-table">
            <tbody>
              <tr>
                <th>Total</th>
                <th>${amount}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* END - ORDER SUMMARY */}

      {/* BILLING-SHIPPING DETAIL  */}
      <div className="all-detail">
        <hr style={{ margin: "25px auto" }} />
        <div className="info">
          <div className="shipping-detail">
            <p>
              <b> Delivery address</b>
            </p>
            <span>{name}</span>
            <br />
            <span>{address.line1}</span>
            <br />
            <span>
              {address.city}, {address.postal_code}
            </span>
            <br />
            <span>{address.state}</span>
            <br />
          </div>
          <br />
          <div className="payment-info">
            <p>
              <b>Payment Info</b>
            </p>
            <span style={{ textTransform: "uppercase" }}>{brand}</span>
            <br />
            <span>Ending in *{last4}</span>
            <br />
            <span>
              Exp. {exp_month}/{exp_year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
