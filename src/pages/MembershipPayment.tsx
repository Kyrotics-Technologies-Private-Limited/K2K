import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { membershipApi } from "../services/api/membershipApi";
import { MembershipPlan } from "../types/membership";

const MembershipPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get selected plan from navigation state
  const plan = location.state?.plan as MembershipPlan;
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "credit" | "debit" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">No plan selected</h2>
          <button className="button bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentMethodChange = (method: "card" | "upi" | "credit" | "debit") => {
    setPaymentMethod(method);
    setError(null);
  };

  const handleProceedToPay = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method to continue");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await membershipApi.subscribe(plan.id);
      console.log("Membership subscribe response:", response);
      setIsProcessing(false);
      navigate("/membership-success");
    } catch (err: any) {
      setIsProcessing(false);
      let errorMsg = "Payment failed. Please try again.";
      if (err?.response) {
        // Backend error details
        errorMsg = err.response.data?.message || err.response.statusText || errorMsg;
        console.error("API error:", err.response);
      } else if (err?.message) {
        errorMsg = err.message;
        console.error("JS error:", err);
      } else {
        console.error("Unknown error:", err);
      }
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto p-4">
        {/* Membership Details Section */}
        <div className="bg-white border border-green-100 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Kishan Parivar Membership</h2>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Name:</span>
                <span className="font-semibold text-green-700">{plan.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{plan.duration} {plan.duration === 1 ? 'Month' : 'Months'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Final Price:</span>
                <span className="font-bold text-xl text-green-700">₹{plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-semibold text-green-600">{plan.discountPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Benefits:</span>
                <span className="font-semibold text-green-600">Premium Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="bg-white border border-green-100 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-4">
            {/* Credit Card */}
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "credit"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => handlePaymentMethodChange("credit")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "credit"}
                  onChange={() => handlePaymentMethodChange("credit")}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <svg className="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                  <div>
                    <label className="font-medium text-gray-900">Credit Card</label>
                    <p className="text-gray-500 text-sm">Visa, Mastercard, American Express</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Debit Card */}
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "debit"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => handlePaymentMethodChange("debit")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "debit"}
                  onChange={() => handlePaymentMethodChange("debit")}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <svg className="w-8 h-8 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                  <div>
                    <label className="font-medium text-gray-900">Debit Card</label>
                    <p className="text-gray-500 text-sm">All major debit cards accepted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* UPI */}
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "upi"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => handlePaymentMethodChange("upi")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => handlePaymentMethodChange("upi")}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <svg className="w-8 h-8 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <label className="font-medium text-gray-900">UPI</label>
                    <p className="text-gray-500 text-sm">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Cards */}
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === "card"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => handlePaymentMethodChange("card")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => handlePaymentMethodChange("card")}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <svg className="w-8 h-8 text-gray-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                  <div>
                    <label className="font-medium text-gray-900">Other Cards</label>
                    <p className="text-gray-500 text-sm">RuPay, Diners Club, Discover</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Back to Plans
          </button>
          <button
            onClick={handleProceedToPay}
            disabled={isProcessing}
            className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Processing Payment...
              </>
            ) : (
              `Proceed to Pay (₹${plan.price})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPayment;
