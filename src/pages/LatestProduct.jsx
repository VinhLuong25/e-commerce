import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LatestProduct() {
  const { products, loading, hasErrors } = useSelector(
    (state) => state.product
  );
  const renderProduct = () => {
    if (loading) return <p>Loading ...</p>;
    if (hasErrors) return <p>Cannot display products...</p>;
    return products.map((product, index) => {
      const { id, image, brand, name, price } = product;
      const mainImg = image[0].name;
      return (
        <Col lg="3" md="4" sm="6" xs="12" key={index}>
          <Card key={id} className="card">
            <Link to={{ pathname: `/latest-product/${id}` }}>
              <Card.Img src={mainImg} />
            </Link>
            <div className="detail">
              <p className="brand">{brand}</p>
              <p className="title">{name}</p>
              <p className="price">AUD$ {price}</p>
            </div>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <Container fluid>
        <Row>{renderProduct()}</Row>
      </Container>
    </>
  );
}
