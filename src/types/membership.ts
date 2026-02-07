// types/membership.ts

export type MembershipPlan = {
  id: string;
  type: string;
  description: string;
  price: number;
  duration: number;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
};

export type MembershipSettings = MembershipPlan[]; // For backward compatibility

export type MembershipStatus = {
  isMember: boolean;
  membershipType: string | null;
  membershipStart?: string; // ISO string
  membershipEnd?: string;   // ISO string
  membershipPlanId?: string; // Reference to the membership plan
  discountPercentage?: number; // Stored discount for quick access
};

// Legacy types for backward compatibility
export type LegacyMembershipSettings = {
  discountPercentage: number;
  monthlyPrice: number;
  monthlyDuration: number;
  quarterlyPrice: number;
  quarterlyDuration: number;
  yearlyPrice: number;
  yearlyDuration: number;
  updatedAt: string; // ISO string or firestore Timestamp
};
