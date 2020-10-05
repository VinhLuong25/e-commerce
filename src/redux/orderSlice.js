import { createSlice } from "@reduxjs/toolkit";

const initialOrder = { orders: null };
const orderSlice = createSlice({
  name: "order",
  initialState: initialOrder,
  reducers: {
    addOrder(state, action) {
      state.orders = action.payload;
      console.log(state.orders);
    },
    clearOrder(state) {
      state.orders = null;
      console.log(state.oreders);
    },
  },
});
const { actions, reducer } = orderSlice;
export const { addOrder, clearOrder } = actions;
export default reducer;
