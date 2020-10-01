import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function CheckOutProduct(props) {
  const { product, size, quantityEach } = props;
  const { name, color, price, image, sale } = product;
  const img = image[0].name;
  return (
    <Container fluid style={{ position: "relative" }}>
      <Row>
        <Col xs="4" style={{ position: "relative" }}>
          <img
            src={img}
            alt=""
            className="image-fluid"
            style={{ position: "relative" }}
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30px",
              height: "30px",
              textAlign: "center",
              border: "solid 1px black",
              borderRadius: "50%",
              background: "grey",
              color: "white",
              right: "0",
              top: "0",
            }}
          >
            {quantityEach}
          </div>
        </Col>
        <Col xs="4">
          {" "}
          <div className="detail-text">
            <span>
              <b>{name}</b>
            </span>
            <br></br>
            <span>{color}</span>
            <br />
            <span>
              <b> Size: {size}</b>
            </span>
          </div>
        </Col>
        <Col xs="4">
          {sale ? (
            <p>${sale * quantityEach}</p>
          ) : (
            <p>${price * quantityEach}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
