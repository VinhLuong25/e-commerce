import React from "react";
import ProductInCart from "./ProductInCart";
import Button from "./forms/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
export default function CartSlide() {
  const inCart = useSelector((state) => state.cart);
  console.log(inCart);
  const totalQuantity = inCart.count;
  const cart = inCart.cart;

  const dispatch = useDispatch();
  const subtotal = cart.reduce((acc, curr) => {
    return acc + curr.quantity * curr.prodDetail.price;
  }, 0);
  const shippingFee = cart.length < 1 ? 0 : 15 && subtotal >= 300 ? 0 : 15;

  const total = subtotal + shippingFee;
  const clearCarts = () => {
    const prod = [];
    dispatch(clearCart(prod));
  };

  const closeCart = () => {
    const cartSlide = document.querySelector(".cart-slide");
    cartSlide.style.transform = "translateX(1300px)";
  };
  return (
    <div className="cart-slide">
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
              <>
                <ProductInCart
                  key={index}
                  product={productDetail}
                  size={size}
                  quantityEach={quantityEach}
                />
                <Button onClick={() => clearCarts()}>Clear Cart</Button>
              </>
            );
          })
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
        <Button style={{ background: "white", color: "black", width: "70%" }}>
          CHECK OUT
        </Button>
      </div>
    </div>
  );
}
