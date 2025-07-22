import React, { RefObject, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PhoneAuth from '../authComponents/PhoneAuth';
import { X } from 'lucide-react';

interface KishanParivarFormProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

const KishanParivarForm: React.FC<KishanParivarFormProps> = ({ targetRef }) => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      duration: '1 Month',
      price: '₹299',
      originalPrice: '₹349',
      discount: '15%',
      delivery: 'Fast',
      popular: false,
      features: [
        '15% discount on all products',
        'Fast delivery (2-3 days)',
        'Priority customer support',
        'Free shipping on orders above ₹500'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      duration: '3 Months',
      price: '₹799',
      originalPrice: '₹999',
      discount: '15%',
      delivery: 'Fast',
      popular: true,
      features: [
        '15% discount on all products',
        'Fast delivery (2-3 days)',
        'Priority customer support',
        'Free shipping on orders above ₹500'
      ]
    },
    {
      id: 'annually',
      name: 'Annual',
      duration: '12 Months',
      price: '₹2,999',
      originalPrice: '₹3,999',
      discount: '15%',
      delivery: 'Fast',
      popular: false,
      features: [
        '15% discount on all products',
        'Fast delivery (2-3 days)',
        'Priority customer support',
        'Free shipping on orders above ₹500'
      ]
    }
  ];

  const handlePayNowClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      // Proceed with payment logic here
      setShowLoginModal(false);
      // Add actual payment logic as needed
    }
  };

  return (
    <div
      ref={targetRef}
      className="relative min-h-screen flex items-center justify-center py-8 px-4 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Premium gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))",
        }}
      ></div>

      {/* Floating decorative elements */}
      <div
        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #22c55e, transparent)",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, #16a34a, transparent)",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "2s",
        }}
      ></div>

      {/* Main container */}
      <div className="w-full max-w-6xl relative z-10 mx-auto">
        {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="bg-green-brand text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Premium Membership Plans
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Kishan Parivar
          </h2>
          <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join our exclusive family and unlock premium benefits on the finest
            natural products
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.popular ? "border-2 lg:scale-105" : "border"
              }`}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderColor: plan.popular
                  ? "#22c55e"
                  : "rgba(255, 255, 255, 0.3)",
                boxShadow: plan.popular
                  ? "0 20px 40px -10px rgba(34, 197, 94, 0.3)"
                  : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = plan.popular
                  ? "0 25px 50px -10px rgba(34, 197, 94, 0.4)"
                  : "0 15px 40px -5px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = plan.popular
                  ? "0 20px 40px -10px rgba(34, 197, 94, 0.3)"
                  : "0 10px 30px -5px rgba(0, 0, 0, 0.3)";
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-green-brand text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🌟 Most Popular
                  </div>
                </div>
              )}

              {/* Card content */}
              <div className="relative z-10">
                {/* Plan header */}
                <div className="text-center mb-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 line-through">
                      {plan.originalPrice}
                    </span>
                    <div className="text-3xl font-bold text-green-brand">
                      {plan.price}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">for {plan.duration}</p>
                </div>

                {/* Key benefits cards */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div
                    className="text-center rounded-lg p-3 border"
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      borderColor: "rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div className="text-lg font-bold text-green-brand mb-1">
                      {plan.discount}
                    </div>
                    <div className="text-xs text-gray-600">Discount</div>
                  </div>
                  <div
                    className="text-center rounded-lg p-3 border"
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      borderColor: "rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div className="text-sm font-bold text-green-brand mb-1">
                      {plan.delivery}
                    </div>
                    <div className="text-xs text-gray-600">Delivery</div>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-5">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-brand rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className="button w-full py-3 px-6 rounded-xl font-semibold text-white bg-green-brand transition-all duration-300"
                  style={{
                    transform: "translateY(0)",
                  }}
                  onClick={handlePayNowClick}
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-6">
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            All plans include premium natural products, dedicated support, and
            exclusive member benefits
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-base text-white max-w-2xl mx-auto mb-4 leading-relaxed">
            <span>🌱 100% Natural</span>
            <span>🚛 Free Delivery</span>
            <span>🔒 Secure Payment</span>
            <span>⭐ Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

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
               </div>
             </div>
           )}
    </div>
  );
};

export default KishanParivarForm;
