import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const MembershipSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 to-green-200"
    >
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-12 max-w-lg w-full flex flex-col items-center">
        <CheckCircle className="w-16 h-16 text-green-600 mb-4"/>
        <h1 className="text-3xl font-bold mb-2 text-green-700 text-center">
          Membership Activated!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to <span className="font-semibold text-green-600">Kishan Parivar</span>.<br />
          You now have exclusive member benefits, special discounts, and priority service.
        </p>
        <button
          className="button bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-150"
          onClick={() => navigate("/")}
        >
          Start Shopping
        </button>
        <span className="text-sm text-gray-400 mt-6">
          Thank you for supporting natural products and local farmers!
        </span>
      </div>
    </div>
  );
};

export default MembershipSuccess;
