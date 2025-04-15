/*import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase/firebase";

interface User {
  email: string;
  uid: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  updateUserProfile: (updates: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthStateChange = async (firebaseUser: FirebaseUser | null) => {
    try {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email || "",
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || undefined,
          photoURL: firebaseUser.photoURL || undefined,
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      setError("Failed to process authentication state");
      console.error("Auth state change error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  }, []);

  const register = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
        setUser((prev) => (prev ? { ...prev, displayName } : null));
      }

      // You might want to create a user document in Firestore here
      // await createUserDocument(userCredential.user);

      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut(auth);
      navigate("/login");
    } catch (error: any) {
      setError(error.message || "Logout failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      navigate("/password-reset-sent");
    } catch (error: any) {
      setError(error.message || "Password reset failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (oobCode: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await confirmPasswordReset(auth, oobCode, newPassword);
      navigate("/login?reset=success");
    } catch (error: any) {
      setError(error.message || "Password reset failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
  }) => {
    try {
      if (!auth.currentUser) throw new Error("No authenticated user");

      setLoading(true);
      setError(null);
      await updateProfile(auth.currentUser, updates);

      setUser((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (error: any) {
      setError(error.message || "Profile update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
