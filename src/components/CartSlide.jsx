import React from "react";
import { useRef, useEffect } from "react";
import ProductInCart from "./ProductInCart";
import Button from "./forms/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalDetail } from "../redux/cartSlice";
import { Link } from "react-router-dom";
export default function CartSlide() {
  const inCart = useSelector((state) => state.cart);
  const discount = inCart.discount;
  console.log(discount);
  const ref = useRef(null);
  const cart = inCart.cart;

  const dispatch = useDispatch();
  const subtotal = cart.reduce((acc, curr) => {
    if (curr.prodDetail.sale) {
      return acc + curr.quantity * curr.prodDetail.sale;
    } else {
      return acc + curr.quantity * curr.prodDetail.price;
    }
  }, 0);
  const shippingFee = cart.length < 1 ? 0 : 15 && subtotal >= 300 ? 0 : 15;
  const totalNoDiscount = subtotal + shippingFee;
  const discountPrice = totalNoDiscount * discount;
  const total = discount ? totalNoDiscount - discountPrice : totalNoDiscount;
  dispatch(
    getTotalDetail({
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: total,
      discountPrice: discountPrice,
    })
  );
  const clearCarts = () => {
    dispatch(clearCart());
  };

  //Handle close cart
  const closeCart = () => {
    const cartSlide = document.querySelector(".cart-slide");
    cartSlide.style.transform = "translateX(1300px)";
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
    <div className="cart-slide" ref={ref}>
      <div className="title">
        <h2>Your Cart</h2>
        <h3 onClick={() => closeCart()}>X</h3>
      </div>
      <div className="middle">
        {cart.length < 1 ? (
          <div className="empty-cart"> No Items </div>
        ) : (
          cart.map((prod, index) => {
            const productDetail = prod.prodDetail;
            const size = prod.size;
            const quantityEach = prod.quantity;
            return (
              <ProductInCart
                key={index}
                product={productDetail}
                size={size}
                quantityEach={quantityEach}
              />
            );
          })
        )}
        {cart.length >= 1 && (
          <Button onClick={() => clearCarts()}>Clear Cart</Button>
        )}
      </div>

      <div className="check-out">
        <div className="subTotal">
          <div>
            <p>Subtotal: </p>
            <p>Shipping: </p>
            <p>Total: </p>
          </div>
          <div>
            <p>${cart.length >= 1 ? subtotal : 0}</p>
            <p>${shippingFee}</p>
            <p>${total}</p>
          </div>
        </div>
        <Link to="/checkout">
          <Button className="checkout-btn" onClick={() => closeCart()}>
            CHECK OUT
          </Button>
        </Link>
      </div>
    </div>
  );
}
