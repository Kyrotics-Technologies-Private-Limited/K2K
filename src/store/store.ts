// // src/store/index.ts
// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// // Import reducers
// import authReducer from "./slices/authSlice";
// import cartReducer from "./slices/cartSlice";
// import checkoutReducer from "./slices/checkoutSlice";
// import orderReducer from "./slices/orderSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     cart: cartReducer,
//     checkout: checkoutReducer,
//     order: orderReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types (Firebase auth returns non-serializable objects)
//         ignoredActions: ["auth/loginSuccess", "auth/verifyOtpSuccess"],
//         // Ignore these field paths in the state
//         ignoredPaths: ["auth.confirmationResult"],
//       },
//     }),
// });

// // Export types for TypeScript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Create typed hooks
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// src/store/store.ts (or index.ts if that's your store file)
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import membershipReducer from "./slices/membershipSlice"; // << ADD THIS LINE

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    membership: membershipReducer,  // << REGISTER THE SLICE
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/loginSuccess", "auth/verifyOtpSuccess"],
        ignoredPaths: ["auth.confirmationResult"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




