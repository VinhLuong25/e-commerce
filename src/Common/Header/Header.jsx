import React, { useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import MenuNav from "../../components/MenuNav";
import { Power3, gsap } from "gsap";
import Filter from "../../components/Filter";
import { setUser } from "../../redux/userSlice";

export default function Header(props) {
  const { currentUser } = props;
  const location = useLocation();
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.cart.count);
  const openCart = () => {
    const cartSlide = document.querySelector(".cart-slide");
    cartSlide.style.transform = "translateX(0px)";
  };

  const openMenu = () => {
    const menuNav = document.querySelector(".menu-nav");
    menuNav.style.transform = "translateX(0px)";
  };
  const openFilter = () => {
    const filterBar = document.querySelector(".filter-bar");
    filterBar.style.transform = "translateX(0px)";
  };
  //Animation
  let navigationLeft = useRef(null);
  let navigationRight = useRef(null);
  useEffect(() => {
    gsap.to(navigationLeft, 1.5, { x: 0, ease: Power3.easeInOut });
    gsap.to(navigationRight, 1.5, { x: 0, ease: Power3.easeInOut });
  });
  return (
    <>
      <div className="navBar">
        <div className="navBar__left" ref={(el) => (navigationLeft = el)}>
          <Link to="/" className="logo">
            M.A.D
          </Link>
          <div>
            <MenuNav />
            <div className="nav-btn" onClick={() => openMenu()}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          {location.pathname === "/latest-product" ||
          location.pathname === "/sale-product" ? (
            <div>
              <Filter />
              <div onClick={() => openFilter()} className="filter-btn">
                Filter +
              </div>
            </div>
          ) : (
            <p>{""}</p>
          )}
        </div>
        <div className="navBar__right" ref={(el) => (navigationRight = el)}>
          <SearchBar />
          <div>
            {currentUser ? (
              <div style={{ textAlign: "center" }}>
                <Link to="/account">
                  <i className="fa fa-user" style={{ color: "black" }}></i>
                </Link>
                <p
                  onClick={() => {
                    auth.signOut();
                    dispatch(setUser(null));
                  }}
                >
                  Log Out
                </p>
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
