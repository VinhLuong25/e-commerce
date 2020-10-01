import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initalProduct = {
  products: [],
  saleProduct: [],
  latestProduct: [],
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
    getSaleProductList(state, action) {
      state.saleProduct = action.payload;
      state.loading = false;
      state.hasError = false;
    },
    getLatestProductList(state, action) {
      state.latestProduct = action.payload;
      state.loading = false;
      state.hasError = false;
    },

    filterByBrandLatest(state, action) {
      //reset latest product list
      state.latestProduct = state.products.filter((prod) => prod.sale === null);
      if (
        (action.payload.brand === "All" && action.payload.size === "All") ||
        (action.payload.brand === null && action.payload.size === null)
      )
        return;

      //filter

      if (!action.payload.size || action.payload.size === "All") {
        const a = state.latestProduct.filter(
          (prod) => prod.brand === action.payload.brand
        );
        state.latestProduct = a;
      } else if (!action.payload.brand || action.payload.brand === "All") {
        const a = JSON.stringify(state.latestProduct);
        const b = JSON.parse(a);
        const c = b.filter((prod) => {
          const d = prod.size.find(
            (siz) => siz.name === action.payload.size && siz.quantity !== 0
          );
          return d;
        });
        state.latestProduct = c;
      } else if (action.payload.brand && action.payload.size) {
        const brandProduct = state.latestProduct.filter(
          (prod) => prod.brand === action.payload.brand
        );
        const filterBy = brandProduct.filter((prod) => {
          const d = prod.size.find(
            (siz) => siz.name === action.payload.size && siz.quantity !== 0
          );
          return d;
        });
        state.latestProduct = filterBy;
      }
    },
    filterByBrandSale(state, action) {
      //reset latest product list
      state.saleProduct = state.products.filter((prod) => prod.sale !== null);
      if (
        (action.payload.brand === "All" && action.payload.size === "All") ||
        (action.payload.brand === null && action.payload.size === null)
      )
        return;

      //filter

      if (!action.payload.size || action.payload.size === "All") {
        const a = state.saleProduct.filter(
          (prod) => prod.brand === action.payload.brand
        );
        state.saleProduct = a;
      } else if (!action.payload.brand || action.payload.brand === "All") {
        const a = JSON.stringify(state.saleProduct);
        const b = JSON.parse(a);
        const c = b.filter((prod) => {
          const d = prod.size.find(
            (siz) => siz.name === action.payload.size && siz.quantity !== 0
          );
          return d;
        });
        state.saleProduct = c;
      } else if (action.payload.brand && action.payload.size) {
        const brandProduct = state.saleProduct.filter(
          (prod) => prod.brand === action.payload.brand
        );
        const filterBy = brandProduct.filter((prod) => {
          const d = prod.size.find(
            (siz) => siz.name === action.payload.size && siz.quantity !== 0
          );
          return d;
        });
        state.saleProduct = filterBy;
      }
    },
    sortByLatest(state, action) {
      const a = JSON.stringify(state.latestProduct);
      const b = JSON.parse(a);
      if (action.payload.sort === "high to low") {
        const priceDes = b.sort((a, b) => b.price - a.price);
        state.latestProduct = priceDes;
      } else if (action.payload.sort === "low to high") {
        const priceDes = b.sort((a, b) => a.price - b.price);
        state.latestProduct = priceDes;
      }
    },
    sortBySale(state, action) {
      const a = JSON.stringify(state.saleProduct);
      const b = JSON.parse(a);
      if (action.payload.sort === "high to low") {
        const priceDes = b.sort((a, b) => b.sale - a.sale);
        state.saleProduct = priceDes;
      } else if (action.payload.sort === "low to high") {
        const priceDes = b.sort((a, b) => a.sale - b.sale);
        state.saleProduct = priceDes;
      }
    },
    clearFilter(state, action) {
      if (action.payload.pathName === "/latest-product") {
        state.latestProduct = state.products.filter(
          (prod) => prod.sale === null
        );
      } else if (action.payload.pathName === "/sale-product") {
        state.saleProduct = state.products.filter((prod) => prod.sale !== null);
      }
    },
  },
});
const { actions, reducer } = productSlice;
export const {
  getProductLoading,
  getProductList,
  getProductFail,
  getProductDetail,
  getSaleProductList,
  getLatestProductList,
  filterByBrandLatest,
  filterByBrandSale,
  sortByLatest,
  sortBySale,
  clearFilter,
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

      //descending order
      const product = productRes.data.sort((a, b) => b.id - a.id);

      const latestProduct = product.filter((prod) => prod.sale === null);
      const saleProduct = product.filter((prod) => prod.sale !== null);

      dispatch(getProductList(product));
      dispatch(getSaleProductList(saleProduct));
      dispatch(getLatestProductList(latestProduct));
    } catch (error) {
      dispatch(getProductFail());
    }
  };
}
