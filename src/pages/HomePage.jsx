import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ControlledCarousel from "../components/ControlledCarousel";
import ProductCard from "../components/ProductCard";
import Title from "../components/title/Title";
import Aos from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  const { latestProduct, saleProduct, loading, hasErrors } = useSelector(
    (state) => state.product
  );
  const latestProducts = latestProduct.slice(0, 8);
  const saleProducts = saleProduct.slice(0, 8);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="homePage">
      <ControlledCarousel />
      <div className="main">
        <div className="product-display">
          <Title>Latest</Title>
          <ProductCard
            currentProducts={latestProducts}
            loading={loading}
            hasErrors={hasErrors}
          />
          <Link to="/latest-product" className="link-to">
            VIEW ALL
          </Link>
        </div>

        <div className="popular-section">
          <Title>Popular</Title>
          <div className="contain">
            <div className="bar"></div>
            <div className="text-title">
              <p>Outfit of the week</p>
            </div>
            <div className="image-container">
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
              ></div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-center"
              ></div>
              <div
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
              ></div>
            </div>
          </div>
        </div>

        <div className="product-display">
          <Title>Sale</Title>
          <ProductCard
            currentProducts={saleProducts}
            loading={loading}
            hasErrors={hasErrors}
          />
          <Link to="/sale-product" className="link-to">
            VIEW ALL
          </Link>
        </div>
      </div>
    </div>
  );
}
