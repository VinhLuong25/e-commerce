import { createSlice } from "@reduxjs/toolkit";

const initialCart = { cart: [], count: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart(state, action) {
      const a = JSON.stringify(state.cart);
      const b = JSON.parse(a);
      if (!b) {
        state.cart.push(action.payload);
        state.count++;
      } else {
        const product = b.find(
          (item) =>
            item.prodDetail.id === action.payload.prodDetail.id &&
            item.size === action.payload.size
        );
        if (!product) {
          state.cart.push(action.payload);
          state.count++;
        } else {
          product.quantity++;
          state.cart = b;
          state.count++;
        }
      }
    },

    clearCart(state, action) {
      state.cart = action.payload;
      state.count = 0;
    },

    removeProduct(state, action) {
      const a = JSON.stringify(state.cart);
      const b = JSON.parse(a);
      const index = b.findIndex(
        (item) =>
          item.prodDetail.id === action.payload.id &&
          item.size === action.payload.size
      );

      state.count = state.count - b[index].quantity;
      b.splice(index, 1);
      state.cart = b;
    },

    increment(state, action) {
      const a = JSON.stringify(state.cart);
      const b = JSON.parse(a);
      const product = b.find(
        (item) =>
          item.prodDetail.id === action.payload.id &&
          item.size === action.payload.size
      );
      product.quantity++;
      state.cart = b;
      state.count++;
    },

    decrement(state, action) {
      const a = JSON.stringify(state.cart);
      const b = JSON.parse(a);
      const product = b.find(
        (item) =>
          item.prodDetail.id === action.payload.id &&
          item.size === action.payload.size
      );
      product.quantity--;
      state.cart = b;
      state.count--;
    },
  },
});
const { actions, reducer } = cartSlice;
export const {
  addToCart,
  clearCart,
  increment,
  decrement,
  removeProduct,
} = actions;
export default reducer;
