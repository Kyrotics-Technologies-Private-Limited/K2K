import api from './api';
import { MembershipSettings, MembershipPlan, MembershipStatus } from '../../types/membership';
import { getAuth } from "firebase/auth";

// Helper to get current user's auth token
const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated. Please sign in to continue.");
  }
  return await user.getIdToken(true); // Fresh token
};

// Helper to create authenticated config
const createAuthConfig = async () => {
  const token = await getAuthToken();
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const membershipApi = {
  // Get current membership plans (no auth required) - Updated to return array
  getSettings: async (): Promise<MembershipSettings> => {
    const response = await api.get<MembershipSettings>('/membership/settings');
    return response.data;
  },

  // Get all membership plans (no auth required) - New method
  getPlans: async (): Promise<MembershipPlan[]> => {
    const response = await api.get<MembershipPlan[]>('/membership/plans');
    return response.data;
  },

  // Get specific membership plan by ID (no auth required) - New method
  getPlanById: async (id: string): Promise<MembershipPlan> => {
    const response = await api.get<MembershipPlan>(`/membership/plan/${id}`);
    return response.data;
  },

  // Get current user's membership status (auth required)
  getStatus: async (): Promise<MembershipStatus> => {
    const config = await createAuthConfig();
    const response = await api.get<MembershipStatus>('/membership/status', config);
    return response.data;
  },

  // Subscribe to a membership plan (auth required) - Updated to handle new structure
  subscribe: async (planType: string): Promise<{ message: string; discountPercentage: number; duration: number }> => {
    const config = await createAuthConfig();
    const response = await api.post<{ message: string; discountPercentage: number; duration: number }>(
      '/membership/subscribe',
      { planType },
      config
    );
    return response.data;
  }
};

// Optionally, if you want to export hooks or helpers for React Query/etc, do that here.
