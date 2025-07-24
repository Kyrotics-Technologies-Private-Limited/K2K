// types/membership.ts

export type MembershipSettings = {
  discountPercentage: number;
  monthlyPrice: number;
  monthlyDuration: number;
  quarterlyPrice: number;
  quarterlyDuration: number;
  yearlyPrice: number;
  yearlyDuration: number;
  updatedAt: string; // ISO string or firestore Timestamp
};

export type MembershipStatus = {
  isMember: boolean;
  membershipType: "monthly" | "quarterly" | "yearly" | null;
  membershipStart?: string; // ISO string
  membershipEnd?: string;   // ISO string
};
