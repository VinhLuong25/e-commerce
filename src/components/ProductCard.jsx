import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const { currentProducts, loading, hasErrors } = props;
  const renderProduct = () => {
    if (loading) return <p>Loading ...</p>;
    if (hasErrors) return <p>Cannot display products...</p>;

    return currentProducts.map((product, index) => {
      const { id, image, brand, name, price, sale, size } = product;
      const mainImg = image[0].name;
      const stockCheck = (size) => size.every((siz) => siz.quantity === 0);

      return (
        <Col lg="3" md="4" sm="6" xs="12" key={index}>
          <Card key={id} className="card">
            <Link to={{ pathname: `/latest-product/${id}` }}>
              <Card.Img src={mainImg} />
            </Link>
            <div className="detail">
              <span className="brand">{brand}</span> <br></br>
              <span className="title">{name}</span> <br></br>
              <span className="price">
                {sale ? (
                  <span className="sale-price">
                    <s>${price}</s> ${sale}
                  </span>
                ) : (
                  <span>${price}</span>
                )}
                {stockCheck(size) && (
                  <span className="sold-out"> Sold Out </span>
                )}
              </span>
            </div>
          </Card>
        </Col>
      );
    });
  };
  return <Row>{renderProduct()}</Row>;
}
