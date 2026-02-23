import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { membershipApi } from '../../services/api/membershipApi';
import { MembershipSettings, MembershipPlan, MembershipStatus } from '../../types/membership';
import { isActiveKPMember } from '../../lib/utils';

// Thunks

// Fetch site-wide membership plans (not user-specific) - Updated to return array
export const fetchMembershipSettings = createAsyncThunk(
  'membership/fetchSettings',
  async () => await membershipApi.getSettings()
);

// Fetch all membership plans (not user-specific) - New thunk
export const fetchMembershipPlans = createAsyncThunk(
  'membership/fetchPlans',
  async () => await membershipApi.getPlans()
);

// Fetch current user's membership status (requires auth)
export const fetchMembershipStatus = createAsyncThunk(
  'membership/fetchStatus',
  async () => await membershipApi.getStatus()
);

// Subscribe user to a plan (and update status upon success) - Updated to handle new structure
export const subscribeMembership = createAsyncThunk<
  { message: string; discountPercentage: number; duration: number },
  { planType: string },
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
  plans: MembershipPlan[] | null;
  loadingStatus: boolean;
  loadingSettings: boolean;
  loadingPlans: boolean;
  errorStatus: string | null;
  errorSettings: string | null;
  errorPlans: string | null;
}

const initialState: MembershipState = {
  status: null,
  settings: null,
  plans: null,
  loadingStatus: false,
  loadingSettings: false,
  loadingPlans: false,
  errorStatus: null,
  errorSettings: null,
  errorPlans: null,
};

// Slice
export const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    clearMembershipState: (state) => {
      state.status = null;
      state.settings = null;
      state.plans = null;
      state.errorStatus = null;
      state.errorSettings = null;
      state.errorPlans = null;
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

    // Plans
    builder
      .addCase(fetchMembershipPlans.pending, (state) => {
        state.loadingPlans = true;
        state.errorPlans = null;
      })
      .addCase(fetchMembershipPlans.fulfilled, (state, action) => {
        state.loadingPlans = false;
        state.plans = action.payload;
      })
      .addCase(fetchMembershipPlans.rejected, (state, action) => {
        state.loadingPlans = false;
        state.errorPlans = action.error.message || 'Failed to fetch membership plans';
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
      .addCase(subscribeMembership.fulfilled, (state) => {
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
export const selectMembershipStatus = (state: any) => state.membership.status;
export const selectMembershipSettings = (state: any) => state.membership.settings;
export const selectMembershipPlans = (state: any) => state.membership.plans;

export const selectIsMember = (state: any) => isActiveKPMember(state.membership.status);
export const selectKPDiscount = (state: any) => {
  // Only give discount if membership is active (not expired)
  const membershipStatus = state.membership.status;

  if (!isActiveKPMember(membershipStatus)) {
    return 0; // Return 0% discount for expired/inactive memberships
  }

  // Try to get discount from user's membership status first, then from plans
  const userDiscount = membershipStatus?.discountPercentage;
  if (userDiscount !== undefined) return userDiscount;

  // Fallback to first plan's discount if available
  const firstPlan = state.membership.plans?.[0];
  return firstPlan?.discountPercentage || 0;
};
export const selectKPPlanPrices = (state: any) => {
  const plans = state.membership.plans || [];
  return {
    plans: plans.map((plan: any) => ({
      id: plan.id,
      type: plan.type,
      price: plan.price,
      duration: plan.duration,
      discountPercentage: plan.discountPercentage
    }))
  };
};

