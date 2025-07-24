import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { membershipApi } from '../../services/api/membershipApi';
import { MembershipSettings, MembershipStatus } from '../../types/membership';
import { RootState } from '../store';

// Thunks

// Fetch site-wide membership plan details (not user-specific)
export const fetchMembershipSettings = createAsyncThunk(
  'membership/fetchSettings',
  async () => await membershipApi.getSettings()
);

// Fetch current user's membership status (requires auth)
export const fetchMembershipStatus = createAsyncThunk(
  'membership/fetchStatus',
  async () => await membershipApi.getStatus()
);

// Subscribe user to a plan (and update status upon success)
export const subscribeMembership = createAsyncThunk<
  { message: string },
  { planType: 'monthly' | 'quarterly' | 'yearly' },
  { dispatch: any }
>(
  'membership/subscribe',
  async ({ planType }, { dispatch }) => {
    const result = await membershipApi.subscribe(planType);
    // Refresh status after activating
    await dispatch(fetchMembershipStatus());
    return result;
  }
);

// State shape
export interface MembershipState {
  status: MembershipStatus | null;
  settings: MembershipSettings | null;
  loadingStatus: boolean;
  loadingSettings: boolean;
  errorStatus: string | null;
  errorSettings: string | null;
}

const initialState: MembershipState = {
  status: null,
  settings: null,
  loadingStatus: false,
  loadingSettings: false,
  errorStatus: null,
  errorSettings: null,
};

// Slice
export const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    clearMembershipState: (state) => {
      state.status = null;
      state.settings = null;
      state.errorStatus = null;
      state.errorSettings = null;
    },
  },
  extraReducers: (builder) => {
    // Settings
    builder
      .addCase(fetchMembershipSettings.pending, (state) => {
        state.loadingSettings = true;
        state.errorSettings = null;
      })
      .addCase(fetchMembershipSettings.fulfilled, (state, action) => {
        state.loadingSettings = false;
        state.settings = action.payload;
      })
      .addCase(fetchMembershipSettings.rejected, (state, action) => {
        state.loadingSettings = false;
        state.errorSettings = action.error.message || 'Failed to fetch membership settings';
      });

    // Status
    builder
      .addCase(fetchMembershipStatus.pending, (state) => {
        state.loadingStatus = true;
        state.errorStatus = null;
      })
      .addCase(fetchMembershipStatus.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.status = action.payload;
      })
      .addCase(fetchMembershipStatus.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = action.error.message || 'Failed to fetch membership status';
        state.status = null; // treat as not logged in or no membership
      });

    // Subscribe
    builder
      .addCase(subscribeMembership.pending, (state) => {
        state.loadingStatus = true; // Use status loading, since this impacts it
        state.errorStatus = null;
      })
      .addCase(subscribeMembership.fulfilled, (state, action) => {
        state.loadingStatus = false;
        // The actual status refresh happens in the thunk above
      })
      .addCase(subscribeMembership.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = action.error.message || 'Failed to subscribe to membership';
      });
  },
});

export const { clearMembershipState } = membershipSlice.actions;

export default membershipSlice.reducer;

// Selectors
export const selectMembershipStatus = (state: RootState) => state.membership.status;
export const selectMembershipSettings = (state: RootState) => state.membership.settings;
export const selectIsMember = (state: RootState) => !!(state.membership.status?.isMember);
export const selectKPDiscount = (state: RootState) => state.membership.settings?.discountPercentage || 0;
export const selectKPPlanPrices = (state: RootState) => ({
  monthly: state.membership.settings?.monthlyPrice,
  quarterly: state.membership.settings?.quarterlyPrice,
  yearly: state.membership.settings?.yearlyPrice,
});

