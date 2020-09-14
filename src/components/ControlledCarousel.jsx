import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function ControlledCarousel() {
  let latestProduct = [
    {
      id: 1,
      name: "Eric Emanuel - Reebok Club C85",
      url:
        "https://cdn.shopify.com/s/files/1/0286/6505/3287/files/reebok-classics-eric-emanuel-club-c-22_2000x.jpg?v=1598259777",
    },
    {
      id: 2,
      name: "Eric Emanuel - Reebok Club C85",
      url:
        "https://cdn.shopify.com/s/files/1/0286/6505/3287/files/reebok-classics-eric-emanuel-club-c-22_2000x.jpg?v=1598259777",
    },
    {
      id: 3,
      name: "Eric Emanuel - Reebok Club C85",
      url:
        "https://cdn.shopify.com/s/files/1/0286/6505/3287/files/reebok-classics-eric-emanuel-club-c-22_2000x.jpg?v=1598259777",
    },
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {latestProduct.map((product) => {
        return (
          <Carousel.Item key={product.id}>
            <img src={product.url} alt="" />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}>{product.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
