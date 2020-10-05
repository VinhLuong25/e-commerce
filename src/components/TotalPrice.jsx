import React from "react";

export default function TotalPrice(props) {
  const { subtotal, discount, shipping, amount } = props;
  return (
    <table className="sub-table">
      <thead style={{ visibility: "hidden" }}>
        <tr>
          <th>
            <span>title</span>
          </th>
          <th>
            <span>price</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Subtotal:</td>
          <td>${subtotal}</td>
        </tr>

        {/* start - discount here */}
        {discount && (
          <tr>
            <td>Discount:</td>
            <td>discount</td>
          </tr>
        )}
        {/* end - discount here */}

        <tr>
          <td>Shipping fee:</td>
          <td>${shipping}</td>
        </tr>

        <tr>
          <td
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(0, 0, 0, 0.1)",
            }}
          ></td>
          <td
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(0, 0, 0, 0.1)",
            }}
          ></td>
        </tr>

        <tr>
          <th>Total</th>
          <th>${amount}</th>
        </tr>
      </tbody>
    </table>
  );
}
