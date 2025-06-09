// import React from "react";
// import { CheckCircle, CreditCard } from "lucide-react";

// const KishanParivar: React.FC = () => {
//   return (
//     <div className="bg-green-100  flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full lg:m-10">
//         <div className="flex flex-col md:flex-row ">
//           {/* Card Section - Left Side */}
//           <div className="w-full md:w-2/5 p-8 bg-green-800 flex justify-center items-center">
//             <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 w-full lg:max-w-lg shadow-xl">
//               <div className="flex justify-between items-start mb-16">
//                 <div>
//                   <h3 className="text-xl font-semibold text-green-100">
//                     Kishan Parivar
//                   </h3>
//                   <p className="text-green-200 text-sm">Premium Member</p>
//                 </div>
//                 <CreditCard size={28} className="text-green-100" />
//               </div>
//               <div className="mb-4">
//                 <p className="text-green-100 text-lg">•••• •••• •••• 1234</p>
//               </div>
//               <div className="flex justify-between items-end">
//                 <div>
//                   <p className="text-green-200 text-xs">CARD HOLDER</p>
//                   <p className="text-white">Kishan Kumar Pandit</p>
//                 </div>
//                 <div>
//                   <p className="text-green-200 text-xs">VALID THRU</p>
//                   <p className="text-white">03/30</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Features Section - Right Side */}
//           <div className="w-full md:w-3/5 p-8">
//             <h2 className="text-2xl font-bold text-green-800 mb-4">
//               You missed to become a FARMER!
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Join the Kishan Parivar and enjoy exclusive benefits designed
//               specifically for agricultural professionals.
//             </p>

//             {/* Features List */}
//             <ul className="space-y-4 mb-8">
//               <li className="flex items-center gap-3">
//                 <CheckCircle size={20} className="text-green-600" />
//                 <span className="text-gray-700">
//                   Financial support with low-interest loans
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <CheckCircle size={20} className="text-green-600" />
//                 <span className="text-gray-700">
//                   Premium crop insurance at discounted rates
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <CheckCircle size={20} className="text-green-600" />
//                 <span className="text-gray-700">
//                   Earn reward points on agricultural purchases
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <CheckCircle size={20} className="text-green-600" />
//                 <span className="text-gray-700">
//                   Exclusive discounts with partner suppliers
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <CheckCircle size={20} className="text-green-600" />
//                 <span className="text-gray-700">
//                   Seasonal payment schedules aligned with harvests
//                 </span>
//               </li>
//             </ul>

//             {/* Simple CTA */}
//             <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
//               Apply Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KishanParivar;

import React from "react";
import {
  CheckCircle,
  CreditCard,
  Tractor,
  Sun,
  Droplets,
  ShieldCheck,
} from "lucide-react";

const KishanParivar: React.FC = () => {
  return (
    <div className="bg-[rgba(255,255,255,0.75)] py-16 px-4 flex flex-col items-center justify-center">
      {/* New Heading Section */}
      <div className="text-center max-w-3xl mb-12 px-4">
        {/* <div className="inline-flex items-center justify-center mb-4">
          <div className="w-12 h-1 bg-green-300 mr-3"></div>
          <Leaf className="text-green-600" size={20} />
          <div className="w-12 h-1 bg-green-300 ml-3"></div>
        </div> */}
        <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold">
          The Kishan Parivar Advantage
        </h1>
        <p className="text-sm md:text-base text-gray-800/90 mx-auto mt-2">
          India's premier agricultural subscription program designed to empower
          farmers with financial tools, insurance benefits, and exclusive
          rewards.
        </p>
      </div>

      {/* Main Card Component */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden w-full max-w-6xl mx-4 lg:mx-10">
        <div className="flex flex-col md:flex-row">
          {/* Card Section - Left Side */}
          <div className="w-full md:w-2/5 p-8 bg-green-brand flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/images/K2K Logo.png"
                  alt="Kishan2Kitchen Logo"
                  className="h-20 w-20 bg-white object-cover mr-1 rounded-md"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Kishan Parivar
                  </h3>
                  <p className="text-green-200 text-sm">
                    Premium Farming Membership
                  </p>
                </div>
              </div>
              <div className="bg-green-800 p-2 rounded-lg">
                <CreditCard size={24} className="text-green-100" />
              </div>
            </div>

            {/* Card Design */}
            <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 w-full h-48 shadow-lg mb-8 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-green-700/20"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-green-500/20"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <Tractor className="text-green-200" size={24} />
                  <Sun className="text-yellow-300" size={24} />
                </div>

                <div>
                  <p className="text-green-100 text-lg tracking-wider mb-2">
                    •••• •••• •••• 1234
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-green-200 text-xs uppercase tracking-wider">
                        Card Holder
                      </p>
                      <p className="text-white font-medium">
                        Kishan Kumar Pandit
                      </p>
                    </div>
                    <div>
                      <p className="text-green-200 text-xs uppercase tracking-wider">
                        Valid Thru
                      </p>
                      <p className="text-white font-medium">03/30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-100">
              <ShieldCheck size={18} className="text-green-300" />
              <p className="text-sm">Secure & Verified Membership</p>
            </div>
          </div>

          {/* Features Section - Right Side */}
          <div className="w-full md:w-3/5 p-8 md:p-10 bg-white">
            <div className="mb-2 flex items-center gap-2 text-green-brand">
              <Droplets size={20} />
              <span className="text-sm font-medium">EXCLUSIVE OFFER</span>
            </div>
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mb-4">
              Elevate Your Farming Journey
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Join India's most trusted agricultural community and unlock
              premium benefits designed to grow your success.
            </p>

            {/* Enhanced Features List */}
            <ul className="space-y-5 mb-10">
              {[
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  text: "Low-interest agricultural loans with flexible repayment",
                  highlight: false,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  text: "Comprehensive crop insurance at special rates",
                  highlight: false,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  text: "5% bonus reward points on all agri-input purchases",
                  highlight: true,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  text: "Priority access to government subsidy programs",
                  highlight: false,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  text: "Personalized harvest payment schedules",
                  highlight: false,
                },
                {
                  icon: <CheckCircle size={22} className="text-green-brand" />,
                  text: "Free agri-tech consultation sessions",
                  highlight: true,
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  {item.icon}
                  <span
                    className={`text-gray-700 ${
                      item.highlight ? "font-semibold text-green-brand" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Enhanced CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/kishanParivarPage"
                className="button bg-green-brand text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex-1 text-center"
              >
                Apply Now - ₹499/year
              </a>
              <button className="button border-2 border-green-brand text-green-brand hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors flex-1 text-center">
                Learn More
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
              <CheckCircle size={16} className="text-green-brand" />
              <span>1,25,000+ farmers already members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KishanParivar;
