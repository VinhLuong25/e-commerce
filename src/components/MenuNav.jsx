import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MenuNav() {
  const ref = useRef(null);
  const closeCart = () => {
    const menuNav = document.querySelector(".menu-nav");
    menuNav.style.transform = "translateX(-1300px)";
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeCart();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className="menu-nav" ref={ref}>
      <div className="head">
        <h1>Menu</h1>
        <h2 onClick={() => closeCart()}>X</h2>
      </div>
      <div className="menu-list">
        <Link to="/latest-product" onClick={() => closeCart()}>
          <p>Releases</p>
        </Link>
        <Link
          to="/latest-product"
          onClick={() => {
            closeCart();
          }}
        >
          <p>Latest</p>
        </Link>
        <Link to="/latest-product" onClick={() => closeCart()}>
          <p>Popular</p>
        </Link>
        <Link to="/latest-product" onClick={() => closeCart()}>
          <p>Accessories</p>
        </Link>
        <Link to="/sale-product" onClick={() => closeCart()}>
          <p>Sale</p>
        </Link>
      </div>
    </div>
  );
}
