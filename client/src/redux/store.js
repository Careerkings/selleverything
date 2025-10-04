import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMidleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
