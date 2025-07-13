// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import * as authService from '../../services/api/authApi';

// Define types
interface User {
  uid: string;
  name: string | null;
  email: string | null;
  phone: string;
  needsProfileCompletion?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  confirmationResult: ConfirmationResult | null;
  error: string | null;
  phone: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  confirmationResult: null,
  error: null,
  phone: '',
};

// Async thunks
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async ({ phone, recaptchaVerifier }: { phone: string, recaptchaVerifier: RecaptchaVerifier }, { rejectWithValue }) => {
    try {
      const confirmationResult = await authService.sendOTP(phone, recaptchaVerifier);
      return { confirmationResult, phone };
    } catch (error: any) {
      let errorMessage = 'Error sending OTP';
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please wait before retrying.';
      } else if (error.message?.includes('reCAPTCHA')) {
        errorMessage = 'reCAPTCHA check failed. Please refresh the page.';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (
    { confirmationResult, otp }: { confirmationResult: ConfirmationResult, otp: string }, 
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await authService.verifyOTP(confirmationResult, otp);
      
      // Check if user info exists in database
      const userCheck = await authService.checkUserExists();
      
      if (userCheck.exists && userCheck.user) {
        return {
          uid: userCredential.user.uid,
          name: userCheck.user.name,
          email: userCheck.user.email,
          phone: userCredential.user.phoneNumber || '',
        };
      } else {
        // User authenticated but not in database
        return {
          uid: userCredential.user.uid,
          name: null,
          email: null,
          phone: userCredential.user.phoneNumber || '',
          needsProfileCompletion: true,
        };
      }
    } catch (error: any) {
      let errorMessage = 'Verification failed';
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = 'Invalid OTP code';
      } else if (error.code === 'auth/code-expired') {
        errorMessage = 'OTP expired. Request a new one.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Try again later.';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const saveUserInfo = createAsyncThunk(
  'auth/saveUserInfo',
  async (
    { name, phone, email }: { name: string, phone: string, email: string }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.saveUserInfo({ name, phone, email });
      return response;
    } catch (error: any) {
      return rejectWithValue('Failed to save user information. Please try again.');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      if (!authService.isAuthenticated()) {
        return null;
      }
      
      const userData = await authService.getCurrentUser();
      return userData;
    } catch (error: any) {
      return rejectWithValue('Failed to get user information.');
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await authService.signOutUser();
      return null;
    } catch (error: any) {
      return rejectWithValue('Failed to sign out.');
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: () => initialState,
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    clearConfirmationResult: (state) => {
      state.confirmationResult = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Add the setUser action to directly set user and auth state
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // sendOTP
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmationResult = action.payload.confirmationResult;
        state.phone = action.payload.phone;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // verifyOTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload as User;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        
        // Clear confirmationResult if OTP expired
        if (action.payload === 'OTP expired. Request a new one.') {
          state.confirmationResult = null;
        }
      })
      
      // saveUserInfo
      .addCase(saveUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && action.payload) {
          state.user = {
            ...state.user,
            name: action.payload.name,
            email: action.payload.email,
            needsProfileCompletion: false
          };
        }
      })
      .addCase(saveUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
      })
      
      // signOut
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, () => {
        return initialState;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearError, 
  resetAuth, 
  setPhone, 
  clearConfirmationResult, 
  setError,
  setUser  // Export the new action
} = authSlice.actions;

export default authSlice.reducer;