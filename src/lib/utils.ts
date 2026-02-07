import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MembershipStatus } from "../types/membership"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to check if membership is active (not expired)
export function isActiveKPMember(membershipStatus: MembershipStatus | null | undefined): boolean {
  if (!membershipStatus || !membershipStatus.isMember || !membershipStatus.membershipEnd) {
    return false;
  }

  // Parse the membership end date
  let endDate: Date | null = null;
  
  const membershipEnd = membershipStatus.membershipEnd as any; // Type assertion for Firestore timestamps
  
  if (typeof membershipEnd === "object" && membershipEnd !== null) {
    if (typeof membershipEnd._seconds === "number") {
      endDate = new Date(membershipEnd._seconds * 1000);
    } else if (typeof membershipEnd.seconds === "number") {
      endDate = new Date(membershipEnd.seconds * 1000);
    }
  } else if (typeof membershipEnd === "string") {
    endDate = new Date(membershipEnd);
  } else if (membershipEnd instanceof Date) {
    endDate = membershipEnd;
  }

  if (!endDate || isNaN(endDate.getTime())) {
    return false;
  }

  // Check if membership end date is in the future
  return endDate.getTime() > new Date().getTime();
}
