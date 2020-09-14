import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initalProduct = {
  products: [],
  prodId: [],
  loading: false,
  hasErrors: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initalProduct,
  reducers: {
    getProductLoading(state) {
      state.loading = true;
    },
    getProductList(state, action) {
      state.products = action.payload;
      state.loading = false;
      state.hasError = false;
    },
    getProductFail(state) {
      state.loading = false;
      state.hasError = true;
    },
  },
});
const { actions, reducer } = productSlice;
export const {
  getProductLoading,
  getProductList,
  getProductFail,
  getProductDetail,
} = actions;
export default reducer;

export function fetchProduct() {
  return async (dispatch) => {
    dispatch(getProductLoading());
    try {
      const productRes = await axios({
        method: "GET",
        url: "http://localhost:1337/products",
      });

      dispatch(getProductList(productRes.data));
    } catch (error) {
      dispatch(getProductFail());
    }
  };
}
