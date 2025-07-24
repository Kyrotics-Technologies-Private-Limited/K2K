import React, { useEffect, useState } from "react";
import { membershipApi } from "../../services/api/membershipApi";
import { MembershipStatus } from "../../types/membership";

// Utility: Calculate days left (Firestore Timestamp or date string)
function getDaysLeft(membershipEnd: any): number | null {
  if (!membershipEnd) return null;
  let endDate: Date | null = null;
  if (typeof membershipEnd === "object" && membershipEnd !== null) {
    if (typeof membershipEnd._seconds === "number") {
      endDate = new Date(membershipEnd._seconds * 1000);
    } else if (typeof membershipEnd.seconds === "number") {
      endDate = new Date(membershipEnd.seconds * 1000);
    }
  } else if (typeof membershipEnd === "string" || membershipEnd instanceof Date) {
    endDate = new Date(membershipEnd);
  }
  if (!endDate || isNaN(endDate.getTime())) return null;
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
}

function formatMembershipType(type: string | null | undefined): string {
  if (!type) return "Basic";
  if (type === "monthly") return "Monthly";
  if (type === "quarterly") return "Quarterly";
  if (type === "yearly") return "Annual";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">
      <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <p className="ml-3 text-gray-600 text-lg">{text}</p>
  </div>
);

const StatusImage = ({ isExpiringSoon }: { isExpiringSoon: boolean }) => (
  <div className="hidden md:block relative bg-green-50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10"></div>
    <img
      src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      alt="Premium membership benefits"
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${isExpiringSoon ? "bg-red-100" : "bg-green-100"}`}>
          <svg className={`h-6 w-6 ${isExpiringSoon ? "text-red-600" : "text-green-brand"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {isExpiringSoon ? "Renewal Reminder" : "Unlock Premium Benefits"}
          </p>
          <p className="text-sm text-gray-600">
            {isExpiringSoon ? "Don't lose your premium benefits" : "Get more from every order"}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MembershipStatusSection: React.FC = () => {
  const [status, setStatus] = useState<MembershipStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in until proven otherwise

  useEffect(() => {
    setIsLoading(true);
    membershipApi
      .getStatus()
      .then((data) => {
        setStatus(data);
        setIsLoggedIn(true); // API succeeded, user is logged in
      })
      .catch((error) => {
        // If user is not authenticated, hide the component
        // Adjust this check if your API returns unauth for a different status code/message!
        if (error?.response?.status === 401 || error?.status === 401) {
          setIsLoggedIn(false);
        } else {
          // For other errors (server down etc.), you might want to still hide, or optionally display an error UI.
          setIsLoggedIn(false);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Hide the component if loading or not logged in
  if (!isLoggedIn || isLoading) return null;

  // ============= MEMBER VIEW =============
  if (status && status.isMember && status.membershipEnd) {
    const daysLeft = getDaysLeft(status.membershipEnd);
    const typeLabel = formatMembershipType(status.membershipType);
    const isExpiringSoon = typeof daysLeft === "number" && daysLeft <= 7;
    return (
      <div className="flex items-center justify-center h-auto py-12 sm:py-16 px-4 bg-[#fffbe8]">
        <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <div
                className={`mb-1 text-sm font-semibold tracking-wider ${
                  isExpiringSoon ? "text-red-600" : "text-green-brand"
                }`}
              >
                {isExpiringSoon
                  ? "MEMBERSHIP EXPIRING SOON"
                  : "ACTIVE MEMBERSHIP"}
              </div>
              <h1 className="mb-4 text-3xl sm:text-4xl font-bold leading-tight">
                {typeof daysLeft === "number" ? daysLeft : "—"} Days Remaining
              </h1>
              <p className="mb-6 text-lg text-gray-600">
                Your {typeLabel} membership with Kishan Parivar
              </p>
              <div className="space-y-3 mb-6">
                <FeatureItem text="Access to premium farm products" />
                <FeatureItem text="Fast delivery on all orders" />
                <FeatureItem text="Exclusive member discounts" />
              </div>
            </div>
            <StatusImage isExpiringSoon={isExpiringSoon} />
          </div>
        </div>
      </div>
    );
  }

  // ============= NON-MEMBER VIEW (user is logged in but no membership) =============
  return (
    <div className="flex items-center justify-center h-auto py-12 sm:py-16 px-4 bg-[#fffbe8]">
      <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <div className="mb-1 text-sm font-semibold tracking-wider text-green-brand">
              PREMIUM MEMBERSHIP AVAILABLE
            </div>
            <h1 className="mb-4 text-3xl sm:text-4xl font-bold leading-tight">
              Unlock the Best of Kishan Parivar!
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Become a member and enjoy exclusive benefits designed for our loyal customers.
            </p>
            <div className="space-y-3 mb-6">
              <FeatureItem text="Special discounts on all products" />
              <FeatureItem text="Fast delivery service" />
              <FeatureItem text="Priority customer support" />
              <FeatureItem text="Free shipping on orders above ₹500" />
            </div>
            {/* NO button or modal here */}
          </div>
          <StatusImage isExpiringSoon={false} />
        </div>
      </div>
    </div>
  );
};

export default MembershipStatusSection;
