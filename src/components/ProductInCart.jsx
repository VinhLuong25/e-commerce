import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { increment, removeProduct, decrement } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductInCart(props) {
  const { product, size, quantityEach } = props;
  const { name, color, price, image, id } = product;
  const img = image[0].name;
  const dispatch = useDispatch();

  const decrementProd = () => {
    dispatch(
      decrement({
        id: id,
        size: size,
      })
    );
    if (quantityEach <= 1) {
      dispatch(
        removeProduct({
          id: id,
          size: size,
        })
      );
    }
  };

  const incrementProd = () => {
    dispatch(
      increment({
        id: id,
        size: size,
      })
    );
  };

  const removeProd = () => {
    console.log("ababab");
    dispatch(
      removeProduct({
        id: id,
        size: size,
      })
    );
  };
  return (
    <Container className="productInCart">
      <div style={{ border: "solid 1px #a7a6a6", marginBottom: "20px" }}></div>
      <Row style={{ paddingLeft: "10px" }}>
        <Col xs="3">
          <img src={img} alt="" className="image" />
        </Col>
        <Col xs="6" className="col-2">
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
          <FontAwesomeIcon icon={faMinus} onClick={() => decrementProd()} />
          <span>{quantityEach}</span>
          <FontAwesomeIcon icon={faPlus} onClick={() => incrementProd()} />
        </Col>
        <Col xs="3" className="price-col">
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => removeProd()} />
          <p>${price * quantityEach}</p>
        </Col>
      </Row>
    </Container>
  );
}
