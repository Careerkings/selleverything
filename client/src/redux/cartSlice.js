import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${state.cartItems[itemIndex].name} quantity increased`, {
          position: "bottom-right",
          autoClose: 0.05,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-right",
          autoClose: 0.05,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },

    removeFromCart: (state, action) => {
      const removedItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      const filteredItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = filteredItems;
      if (removedItem) {
        toast.error(`${removedItem.name} removed from cart`, {
          position: "bottom-right",
          autoClose: 0.05,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.warning(`${state.cartItems[itemIndex].name} quantity decreased`, {
          position: "bottom-right",
          autoClose: 0.05,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const removedItem = state.cartItems[itemIndex];
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        toast.error(`${removedItem.name} removed from cart`, {
          position: "bottom-right",
          autoClose: 0.05,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      toast.error("Cart cleared", {
        position: "bottom-right",
        autoClose: 0.05,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },

    CartTotals: (state) => {
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
    resetCartState: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  CartTotals,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
