import { clearCart, resetCartState } from "../redux/cartSlice";
import { resetProductState } from "../redux/productslice";
import { resetUserState } from "../redux/userslice";
import { persistor, store } from "../redux/store";

export const cleanupRedux = async () => {
  store.dispatch(resetCartState());
  store.dispatch(resetUserState());
  store.dispatch(resetProductState());
  store.dispatch(clearCart());
  await persistor.purge();
};
