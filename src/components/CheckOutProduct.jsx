import React from "react";

export default function CheckOutProduct(props) {
  const { product, size, quantityEach } = props;
  const { name, color, price, image, sale } = product;
  const img = image[0].name;
  return (
    <table className="product-table">
      <thead className="header">
        <tr>
          <th>
            <span>image</span>
          </th>
          <th>
            <span>description</span>
          </th>
          <th>
            <span>price</span>
          </th>
        </tr>
      </thead>
      <tbody className="body">
        <tr>
          <td className="product-image">
            <div className="product-thumbnail">
              <div className="product-wrapper">
                <img src={img} alt="" className="image-fluid" />
              </div>
              <span className="quantity">{quantityEach}</span>
            </div>
          </td>
          <td>
            <span>
              <b>{name}</b>
            </span>
            <br />
            <span>{color}</span>
            <br />
            <span>
              <b>{size}</b>
            </span>
          </td>
          <td className="price">
            {sale ? (
              <p>${sale * quantityEach}</p>
            ) : (
              <p>${price * quantityEach}</p>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
