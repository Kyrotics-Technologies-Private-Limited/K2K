import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../types/address";

interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface CheckoutState {
  currentStep: number;
  addresses: Address[];
  selectedAddress: Address | null;
  isAddingNewAddress: boolean;
  orderSummary: OrderSummary;
  paymentMethod: "cod" | "online" | null;
  isProcessing: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  currentStep: 1,
  addresses: [],
  selectedAddress: null,
  isAddingNewAddress: false,
  orderSummary: {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  },
  paymentMethod: null,
  isProcessing: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<Address | null>) => {
      state.selectedAddress = action.payload;
    },
    setIsAddingNewAddress: (state, action: PayloadAction<boolean>) => {
      state.isAddingNewAddress = action.payload;
    },
    updateOrderSummary: (state, action: PayloadAction<OrderSummary>) => {
      state.orderSummary = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<"cod" | "online">) => {
      state.paymentMethod = action.payload;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetCheckout: (state) => {
      return initialState;
    },
  },
});

export const {
  setStep,
  setAddresses,
  setSelectedAddress,
  setIsAddingNewAddress,
  updateOrderSummary,
  setPaymentMethod,
  setProcessing,
  setError,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
