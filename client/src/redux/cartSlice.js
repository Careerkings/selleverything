import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = filteredItems;
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity = -1;
      }
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    CartTotals: (state, action) => {
      const { quantity, total } = state.cartItems.reduce(
        (cartTotal, item) => {
          const { cartQuantity, price } = item;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          quantity: 0,
          total: 0,
        }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  CartTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
