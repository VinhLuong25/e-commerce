import React from "react";
import SearchBar from "../../components/SearchBar";
import "./Header.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useSelector } from "react-redux";

export default function Header(props) {
  const { currentUser } = props;
  const totalQuantity = useSelector((state) => state.cart.count);
  const openCart = () => {
    const cartSlide = document.querySelector(".cart-slide");
    cartSlide.style.transform = "translateX(0px)";
  };
  return (
    <>
      <div className="navBar">
        <div className="navBar__left">
          <Link to="/" className="logo">
            M.A.D
          </Link>

          <p>abc</p>
          <p>abc</p>
        </div>
        <div className="navBar__right">
          <SearchBar />
          <div>
            {currentUser ? (
              <div style={{ textAlign: "center" }}>
                <Link to="/login">
                  <i className="fa fa-user" style={{ color: "black" }}></i>
                </Link>
                <p onClick={() => auth.signOut()}>Log Out</p>
              </div>
            ) : (
              <Link to="/login">
                <i className="fa fa-user" style={{ color: "black" }}></i>
              </Link>
            )}
          </div>
          <div className="shopping-bag" onClick={() => openCart()}>
            <svg
              className="bag"
              width="35"
              height="40"
              viewBox="0 0 45 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.4375 16.4375H7.33125L3 51H42.375L38.4375 16.4375Z"
                stroke="#737373"
                strokeWidth="4"
              />

              <path
                d="M14.4188 11.625C14.8126 8.41667 16.9388 2 22.2938 2C27.6488 2 29.7751 8.41667 30.1688 11.625"
                stroke="#737373"
                strokeWidth="4"
              />
            </svg>
            <p className="total-quantity">{totalQuantity}</p>
          </div>

          <div className="social-icon">
            <a
              href="https://www.youtube.com/watch?v=JluTWLrk2JQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/watch?v=JluTWLrk2JQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook"></i>
            </a>
            <a
              href="https://www.youtube.com/watch?v=JluTWLrk2JQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
