import React from "react";
import { useSelector } from "react-redux";

export default function TotalPrice() {
  const inCart = useSelector((state) => state.cart);
  const { subtotal, total, shipping, discountPrice, discount } = inCart;
  return (
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
              <td>-{discountPrice}</td>
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
            <th>${total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
