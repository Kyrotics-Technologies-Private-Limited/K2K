// import React, { RefObject } from 'react';

// interface KishanParivarFormProps {
//   targetRef: RefObject<HTMLDivElement | null>;
// }

// const KishanParivarForm: React.FC<KishanParivarFormProps> = ({ targetRef }) => {
//   return (
//     <div 
//       ref={targetRef} 
//       className="flex items-center justify-center py-16 px-4 relative min-h-screen"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Enhanced overlay with gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-950/90"></div>
    
//       {/* Form container with improved styling */}
//       <form className="w-full max-w-2xl border border-green-300/30 p-4 sm:p-6 md:p-8 rounded-xl bg-white backdrop-blur-sm shadow-2xl relative z-10 mx-2 sm:mx-4 transition-all duration-300 hover:shadow-green-200/20">
//         <h2 className="text-3xl font-bold text-center text-green-brand mb-8">
//           Kishan Parivar Membership
//         </h2>
        
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-first-name"
//             >
//               First Name
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-first-name"
//               type="text"
//               placeholder="Jane"
//             />
//             <p className="text-red-500 text-xs italic">
//               Please fill out this field.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-last-name"
//             >
//               Last Name
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-last-name"
//               type="text"
//               placeholder="Doe"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-email"
//             >
//               Email
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-email"
//               type="email"
//               placeholder="abc@gmail.com"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-password"
//             >
//               Password
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-password"
//               type="password"
//               placeholder="******************"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-confirm-password"
//             >
//               Confirm Password
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-confirm-password"
//               type="password"
//               placeholder="******************"
//             />
//             <p className="text-gray-500 text-xs italic mt-1">
//               Enter the same password
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-date-of-birth"
//             >
//               Date of birth
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-date-of-birth"
//               type="date"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-city"
//             >
//               City
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-city"
//               type="text"
//               placeholder="Kolkata"
//             />
//           </div>
//           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-state"
//             >
//               State
//             </label>
//             <div className="relative">
//               <select
//                 className="block appearance-none w-full bg-gray-50 border-b-2 border-green-300 text-gray-700 py-3 px-4 pr-8 rounded-t leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//                 id="grid-state"
//                 defaultValue="Select"
//               >
//                 <option>Select</option>
//                 <option>West Bengal</option>
//                 <option>Telengana</option>
//                 <option>Bihar</option>
//                 <option>Karnataka</option>
//                 <option>Punjab</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-zip"
//             >
//               PIN
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
//               id="grid-zip"
//               type="text"
//               placeholder="700001"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center mt-10">
//           <button 
//             type="submit" 
//             className="button relative overflow-hidden px-8 py-3 bg-green-brand text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1"
//           >
//             <span className="relative z-10">Submit Application</span>
//             <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default KishanParivarForm;


import React, { RefObject } from 'react';

interface KishanParivarFormProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

const KishanParivarForm: React.FC<KishanParivarFormProps> = ({ targetRef }) => {
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      duration: '1 Month',
      price: '₹299',
      originalPrice: '₹349',
      discount: '5%',
      delivery: 'Standard',
      popular: false,
      features: [
        '5% discount on all products',
        'Standard delivery (4-5 days)',
        'Priority customer support',
        'Basic newsletter access'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      duration: '3 Months',
      price: '₹799',
      originalPrice: '₹999',
      discount: '10%',
      delivery: 'Fast',
      popular: true,
      features: [
        '10% discount on all products',
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
      delivery: 'Express',
      popular: false,
      features: [
        '15% discount on all products',
        'Express delivery (1-2 days)',
        'Dedicated premium support',
        'Free shipping on all orders'
      ]
    }
  ];

  return (
    <div 
      ref={targetRef} 
      className="relative min-h-screen flex items-center justify-center py-8 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Premium gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))'
        }}
      ></div>
      
      {/* Floating decorative elements */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #22c55e, transparent)',
          animation: 'float 6s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(circle, #16a34a, transparent)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '2s'
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
            Join our exclusive family and unlock premium benefits on the finest natural products
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 lg:scale-105' 
                  : 'border'
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderColor: plan.popular ? '#22c55e' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: plan.popular 
                  ? '0 20px 40px -10px rgba(34, 197, 94, 0.3)' 
                  : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                transform: 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = plan.popular 
                  ? '0 25px 50px -10px rgba(34, 197, 94, 0.4)' 
                  : '0 15px 40px -5px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = plan.popular 
                  ? '0 20px 40px -10px rgba(34, 197, 94, 0.3)' 
                  : '0 10px 30px -5px rgba(0, 0, 0, 0.3)';
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
                  <p className="text-gray-600 text-sm">
                    for {plan.duration}
                  </p>
                </div>

                {/* Key benefits cards */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div 
                    className="text-center rounded-lg p-3 border"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      borderColor: 'rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    <div className="text-lg font-bold text-green-brand mb-1">
                      {plan.discount}
                    </div>
                    <div className="text-xs text-gray-600">
                      Discount
                    </div>
                  </div>
                  <div 
                    className="text-center rounded-lg p-3 border"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      borderColor: 'rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    <div className="text-sm font-bold text-green-brand mb-1">
                      {plan.delivery}
                    </div>
                    <div className="text-xs text-gray-600">
                      Delivery
                    </div>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-5">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-green-brand rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.4)';
                    e.currentTarget.style.background = '#16a34a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = '#0c6908';
                  }}
                >
                  Choose {plan.name} Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-6">
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            All plans include premium natural products, dedicated support, and exclusive member benefits
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
    </div>
  );
};

export default KishanParivarForm;