import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "../components/forms/Button";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Row, Col } from "react-bootstrap";
import InfoBox from "../components/InfoBox";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
export default function ProductDetail(props) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const { match } = props;
  let paramId = match.params.prodId;

  useEffect(() => {
    const productIdFetch = async () => {
      const productRes = await axios({
        method: "GET",
        url: `http://localhost:1337/products/${paramId}`,
      });
      setProduct(productRes.data);
    };
    productIdFetch();
  }, [paramId]);

  const handleCart = () => {
    const s = document.querySelector(".activate");
    if (!s) return console.log("pls select size");
    const productToAdded = {
      size: s.innerHTML,
      prodDetail: product,
      quantity: 1,
    };
    dispatch(addToCart(productToAdded));
  };
  const renderProduct = () => {
    if (!product) return;

    const {
      image,
      brand,
      name,
      color,
      description,
      price,
      size,
      sale,
    } = product;

    const stockCheck = (size) => size.every((siz) => siz.quantity === 0);
    return (
      <div className="detail-product">
        <Carousel className="carousel">
          {image.map((img, idx) => {
            return (
              <div key={idx}>
                <img src={img.name} alt="" />
              </div>
            );
          })}
        </Carousel>

        <div className="detail">
          <p className="brand">{brand}</p>
          <h2 className="name">
            {name} - {color}
          </h2>
          <div className="description">
            <p>{description}</p>
          </div>
          {size && (
            <div className="size">
              <Row>
                <Col sm="4">
                  <p style={{ paddingTop: "15px", fontSize: "18px" }}>
                    Select Size:
                  </p>
                </Col>
                <Col sm="8" className="choose-size">
                  {size.map((siz, idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={(e) => {
                          if (siz.quantity === 0) return;
                          const target = e.target;
                          const b = document.querySelectorAll(".size-box");
                          b.forEach((c) => {
                            c.className = "size-box";
                          });

                          target.classList.add("activate");
                        }}
                        className="size-box"
                      >
                        {siz.quantity === 0 ? (
                          <s className="disable">{siz.name}</s>
                        ) : (
                          siz.name
                        )}
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </div>
          )}

          <h3 className="price">
            {sale ? (
              <span className="sale-price">
                <s>${price}</s> ${sale}
              </span>
            ) : (
              <span>${price}</span>
            )}
            {stockCheck(size) && <span className="sold-out"> Sold Out </span>}
          </h3>

          <InfoBox infoTitle="Size Information" info="asbdasjkdb" />
          <InfoBox
            infoTitle="Shipping Information"
            info={
              <>
                {" "}
                <p style={{ fontWeight: "bold" }}>
                  Free Express Delivery on orders over $150 Australia Wide
                </p>
                <p>
                  The courier will text and email you with shipment tracking
                  details. Please allow 1-3 business days (Mon-Fri) transit
                  time. We do our best to dispatch your order within 24 hours.
                </p>
                <p style={{ fontWeight: "bold" }}>
                  $10 Express Delivery on orders under $150 Australia Wide
                </p>
                <p>
                  The courier will text and email you with shipment tracking
                  details. Please allow 1-3 business days (Mon-Fri) transit
                  time. We do our best to dispatch your order within 24 hours.
                </p>{" "}
              </>
            }
          />

          <Button
            className="btn"
            style={{ width: "150px", margin: "20px 0px" }}
            onClick={() => handleCart()}
          >
            Add to bag
          </Button>
        </div>
      </div>
    );
  };

  return <>{renderProduct()}</>;
}
