// import React, { useEffect } from "react";
// import { Provider } from "react-redux";
// import { store, useAppDispatch } from "./store/store";
// import { setUser, resetAuth } from "./store/slices/authSlice";
// import { initializeCart, fetchCartItems } from "./store/slices/cartSlice";
// import { auth } from "./services/firebase/firebase";
// import * as authService from "./services/api/authApi";

// interface AppProviderProps {
//   children: React.ReactNode;
// }

// // AuthInitializer to handle Firebase auth state and cart initialization
// export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const initializeApp = async () => {
//       // Initialize cart first
//       const result = await dispatch(initializeCart()).unwrap();

//       // If we have a cart, fetch the items with product and variant details
//       if (result.cart?.id) {
//         await dispatch(fetchCartItems(result.cart.id)).unwrap();
//       }
//     };

//     initializeApp();

//     // Subscribe to Firebase auth state changes
//     const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
//       if (firebaseUser) {
//         // User is signed in
//         try {
//           // Get additional user data from your backend
//           const userData = await authService.getCurrentUser();

//           // Dispatch the setUser action with user data
//           dispatch(
//             setUser({
//               uid: firebaseUser.uid,
//               name: userData?.name || null,
//               email: userData?.email || null,
//               phone: firebaseUser.phoneNumber || "",
//               needsProfileCompletion: !userData,
//             })
//           );

//           // Re-initialize cart after user signs in to get their server-side cart with full product details
//           const result = await dispatch(initializeCart()).unwrap();
//           if (result.cart?.id) {
//             await dispatch(fetchCartItems(result.cart.id)).unwrap();
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);

//           dispatch(
//             setUser({
//               uid: firebaseUser.uid,
//               name: null,
//               email: null,
//               phone: firebaseUser.phoneNumber || "",
//               needsProfileCompletion: true,
//             })
//           );
//         }
//       } else {
//         // User is signed out
//         dispatch(resetAuth());
//         // Re-initialize cart after sign out to get guest cart with full product details
//         const result = await dispatch(initializeCart()).unwrap();
//         if (result.cart?.id) {
//           await dispatch(fetchCartItems(result.cart.id)).unwrap();
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return <>{children}</>;
// };

// // Main App Provider to wrap the application with necessary context providers
// const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   return (
//     <Provider store={store}>
//       <AuthInitializer>{children}</AuthInitializer>
//     </Provider>
//   );
// };

// export default AppProvider;


import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "./store/store";
import { setUser, resetAuth } from "./store/slices/authSlice";
import { initializeCart, fetchCartItems } from "./store/slices/cartSlice";
import { auth } from "./services/firebase/firebase";
import * as authService from "./services/api/authApi";

interface AppProviderProps {
  children: React.ReactNode;
}

// AuthInitializer to handle Firebase auth state and cart initialization
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await authService.getCurrentUser();

          dispatch(
            setUser({
              uid: firebaseUser.uid,
              name: userData?.name || null,
              email: userData?.email || null,
              phone: firebaseUser.phoneNumber || "",
              needsProfileCompletion: !userData,
            })
          );

          const result = await dispatch(initializeCart()).unwrap();
          if (result.cart?.id) {
            await dispatch(fetchCartItems(result.cart.id)).unwrap();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);

          dispatch(
            setUser({
              uid: firebaseUser.uid,
              name: null,
              email: null,
              phone: firebaseUser.phoneNumber || "",
              needsProfileCompletion: true,
            })
          );

          const result = await dispatch(initializeCart()).unwrap();
          if (result.cart?.id) {
            await dispatch(fetchCartItems(result.cart.id)).unwrap();
          }
        }
      } else {
        dispatch(resetAuth());

        const result = await dispatch(initializeCart()).unwrap();
        if (result.cart?.id) {
          await dispatch(fetchCartItems(result.cart.id)).unwrap();
        }
      }

      // ✅ Auth state has been resolved
      setFirebaseInitialized(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!firebaseInitialized) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Main App Provider to wrap the application with necessary context providers
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};

export default AppProvider;
