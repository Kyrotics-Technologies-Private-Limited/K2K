import React from "react";
import { MapPin, Award, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { AuthProvider } from "../../context/AuthContext";
import PhoneAuth from "../authComponents/PhoneAuth";
import { getAuth } from "firebase/auth";

// Main component content
const NatureTraceBannerContent: React.FC = () => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleRedirect =async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const auth = getAuth();
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }
    const idToken = await auth.currentUser.getIdToken();

    window.open(
      // `https://k2ktraceability.netlify.app/customer?token=${idToken}`,
      `http://localhost:3000/customer?token=${idToken}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-green-brand/40"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img
              src="/assets/images/K2K Logo.png"
              alt="Kishan2Kitchen Logo"
              className="h-32 w-32 bg-white p-2 object-cover mr-1 rounded-lg"
            />
          </div>

          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
            Trace Your Natural Journey
          </h1>

          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-xl bg-black/20 rounded-xl ">
            Uncover the story behind every product. From farm to table, we
            guarantee transparency, quality, and authenticity in every drop.
          </p>

          <div className="flex justify-center space-x-6 mb-16">
            <button
              onClick={handleRedirect}
              className="button flex items-center justify-center px-10 py-5 bg-white text-xl text-green-800 font-bold rounded-full 
                         hover:bg-green-100 transition-all duration-300 
                         transform hover:-translate-y-2 shadow-2xl hover:shadow-xl"
            >
              Check Test Report
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-12">
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <MapPin className="h-6 w-6 text-white" />
              <span className="text-white font-medium">
                100+ Sourcing Locations
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Award className="h-6 w-6 text-white" />
              <span className="text-white font-medium">Certified Organic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4 sm:p-8">
          <div className="relative bg-green-50 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-100 animate-fade-in">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
              Login with Kishan2Kitchen
            </h2>
            <PhoneAuth />
            <button
              onClick={() => {
                setShowLoginModal(false);
                window.open(
                  "https://yourcompanywebsite.com",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper component that provides Auth context
const NatureTraceBanner: React.FC = () => {
  return (
    <AuthProvider>
      <NatureTraceBannerContent />
    </AuthProvider>
  );
};

export default NatureTraceBanner;
