import { createSlice } from "@reduxjs/toolkit";

const initialOrder = { orders: [] };
const orderSlice = createSlice({
  name: "order",
  initialState: initialOrder,
  reducers: {
    addOrder(state, action) {
      console.log(action.payload);
      state.orders = action.payload;
      console.log(state.orders);
    },
    clearOrder(state) {
      state.orders = [];
      console.log(state.orders);
    },
  },
});
const { actions, reducer } = orderSlice;
export const { addOrder, clearOrder } = actions;
export default reducer;
