// // src/AppProvider.tsx
// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { store, useAppDispatch } from './store/store';
// import { getCurrentUser } from './store/slices/authSlice';

// interface AppProviderProps {
//   children: React.ReactNode;
// }

// // AuthInitializer to handle Firebase auth state on app load
// export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const dispatch = useAppDispatch();
  
//   useEffect(() => {
//     // Check for existing user session on app initialization
//     dispatch(getCurrentUser());
//   }, [dispatch]);
  
//   return <>{children}</>;
// };

// // Main App Provider to wrap the application with necessary context providers
// const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   return (
//     <Provider store={store}>
//       <AuthInitializer>
//         {children}
//       </AuthInitializer>
//     </Provider>
//   );
// };

// export default AppProvider;

// src/AppProvider.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store/store';
import { setUser, resetAuth } from './store/slices/authSlice';
import { auth } from './services/firebase/firebase';
import * as authService from './services/api/authApi';

interface AppProviderProps {
  children: React.ReactNode;
}

// AuthInitializer to handle Firebase auth state on app load
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        try {
          // Get additional user data from your backend
          const userData = await authService.getCurrentUser();
          
          // Dispatch the setUser action with user data
          dispatch(setUser({
            uid: firebaseUser.uid,
            name: userData?.name || null,
            email: userData?.email || null,
            phone: firebaseUser.phoneNumber || '',
            needsProfileCompletion: !userData
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
          
          // If backend fails, at least set the basic Firebase user info
          dispatch(setUser({
            uid: firebaseUser.uid,
            name: null,
            email: null,
            phone: firebaseUser.phoneNumber || '',
            needsProfileCompletion: true
          }));
        }
      } else {
        // User is signed out
        dispatch(resetAuth());
      }
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
  
  return <>{children}</>;
};

// Main App Provider to wrap the application with necessary context providers
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
};

export default AppProvider;