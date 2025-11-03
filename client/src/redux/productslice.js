import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productFetchPending: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    productFetchSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    productFetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetProductState: () => initialState,
  },
});

export const {
  productFetchPending,
  productFetchSuccess,
  productFetchFailure,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
