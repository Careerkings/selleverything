import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import productReducer from "./productslice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);
