// import React from 'react';
// import { ArrowRight, Award, CheckCircle, CreditCard, ShieldCheck, Star, Wallet } from 'lucide-react';

// const KishanParivar: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-16 md:py-24">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
//               Empower Your Agricultural Journey with Kishan Parivar
//             </h1>
//             <p className="text-lg md:text-xl text-gray-600 mb-8">
//               Exclusive benefits, tailored rewards, and financial support designed specifically for farmers and agricultural professionals.
//             </p>
//             <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all">
//               Apply Now <ArrowRight size={20} />
//             </button>
//           </div>
//           <div className="w-full md:w-2/5 order-first md:order-last mb-8 md:mb-0">
//             <div className="relative">
//               <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25"></div>
//               <div className="relative bg-white p-6 rounded-lg shadow-xl">
//                 <img
//                   src="/api/placeholder/600/400"
//                   alt="Farmers working in a field"
//                   className="w-full h-auto rounded-lg object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Card Showcase Section */}
//       <section className="bg-green-800 py-16 md:py-24">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Kishan Parivar Card</h2>
//             <p className="text-green-100 text-lg max-w-3xl mx-auto">
//               A premium card designed exclusively for the agricultural community, offering special privileges and financial benefits.
//             </p>
//           </div>
//           <div className="flex justify-center">
//             <div className="relative perspective-1000">
//               <div className="w-full max-w-md transform transition-transform duration-700 hover:rotate-y-180">
//                 <div className="relative bg-gradient-to-r from-green-700 to-green-500 p-1 rounded-xl shadow-2xl">
//                   <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 md:p-8">
//                     <div className="flex justify-between items-start mb-24">
//                       <div>
//                         <h3 className="text-xl font-semibold text-green-100">Kishan Parivar</h3>
//                         <p className="text-green-200 text-sm">Premium Member</p>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Star fill="gold" color="gold" size={24} />
//                         <Star fill="gold" color="gold" size={24} />
//                         <Star fill="gold" color="gold" size={24} />
//                       </div>
//                     </div>
//                     <div className="mb-4">
//                       <p className="text-green-100 text-lg">•••• •••• •••• 1234</p>
//                     </div>
//                     <div className="flex justify-between items-end">
//                       <div>
//                         <p className="text-green-200 text-xs">CARD HOLDER</p>
//                         <p className="text-white">Kishan Kumar</p>
//                       </div>
//                       <div>
//                         <p className="text-green-200 text-xs">VALID THRU</p>
//                         <p className="text-white">03/30</p>
//                       </div>
//                       <div>
//                         <CreditCard size={32} className="text-green-100" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="container mx-auto px-4 py-16 md:py-24">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Exclusive Benefits</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Discover how the Kishan Parivar Card can transform your agricultural business and provide valuable support.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Benefit 1 */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Wallet className="text-green-600" size={28} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Financial Support</h3>
//             </div>
//             <p className="text-gray-600">
//               Access to special credit lines, low-interest loans, and customized financial packages to support your agricultural needs.
//             </p>
//           </div>

//           {/* Benefit 2 */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <ShieldCheck className="text-green-600" size={28} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Crop Insurance</h3>
//             </div>
//             <p className="text-gray-600">
//               Premium insurance coverage at discounted rates, protecting your harvest against natural calamities and market fluctuations.
//             </p>
//           </div>

//           {/* Benefit 3 */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Award className="text-green-600" size={28} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Reward Points</h3>
//             </div>
//             <p className="text-gray-600">
//               Earn points on every purchase of agricultural equipment, seeds, and fertilizers, redeemable for future purchases.
//             </p>
//           </div>

//           {/* Benefit 4 */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <CheckCircle className="text-green-600" size={28} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Priority Service</h3>
//             </div>
//             <p className="text-gray-600">
//               Dedicated customer support, priority processing of applications, and expedited service at partner locations.
//             </p>
//           </div>

//           {/* Benefit 5 */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Star className="text-green-600" size={28} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Partner Discounts</h3>
//             </div>
//             <p className="text-gray-600">
//               Exclusive discounts with agricultural equipment manufacturers, seed suppliers, and other essential service providers.
//             </p>
//           </div>

//           {/* Benefit 6 */}
//           <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <CreditCard className="text-green-600" size={28} />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Flexible Payments</h3>
//             </div>
//             <p className="text-gray-600">
//               Interest-free installment options, seasonal repayment schedules aligned with harvest cycles, and cashback on timely payments.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-green-50 py-16">
//         <div className="container mx-auto px-4">
//           <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//             <div className="flex flex-col md:flex-row">
//               <div className="w-full md:w-1/2 bg-green-800 p-8 md:p-12">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
//                 <p className="text-green-100 mb-8">
//                   Join thousands of farmers who have transformed their agricultural practices with the Kishan Parivar Card.
//                 </p>
//                 <ul className="space-y-3 mb-8">
//                   <li className="flex items-center gap-2 text-green-100">
//                     <CheckCircle size={20} className="text-green-300" />
//                     <span>Quick approval process</span>
//                   </li>
//                   <li className="flex items-center gap-2 text-green-100">
//                     <CheckCircle size={20} className="text-green-300" />
//                     <span>Minimal documentation</span>
//                   </li>
//                   <li className="flex items-center gap-2 text-green-100">
//                     <CheckCircle size={20} className="text-green-300" />
//                     <span>Dedicated support team</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Apply for Kishan Parivar Card</h3>
//                 <div className="space-y-4 mb-6">
//                   <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all">
//                     Apply Online <ArrowRight size={20} />
//                   </button>
//                   <button className="w-full bg-white border-2 border-green-600 hover:bg-green-50 text-green-600 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all">
//                     Download Application Form
//                   </button>
//                 </div>
//                 <p className="text-gray-600 text-center">
//                   Already a member? <a href="#" className="text-green-600 font-semibold">Sign in to your account</a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default KishanParivar;

import React from "react";
import { CheckCircle, CreditCard } from "lucide-react";

const KishanParivar: React.FC = () => {
  return (
    <div className="bg-green-100  flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full lg:m-10">
        <div className="flex flex-col md:flex-row ">
          {/* Card Section - Left Side */}
          <div className="w-full md:w-2/5 p-8 bg-green-800 flex justify-center items-center">
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 w-full lg:max-w-lg shadow-xl">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <h3 className="text-xl font-semibold text-green-100">
                    Kishan Parivar
                  </h3>
                  <p className="text-green-200 text-sm">Premium Member</p>
                </div>
                <CreditCard size={28} className="text-green-100" />
              </div>
              <div className="mb-4">
                <p className="text-green-100 text-lg">•••• •••• •••• 1234</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-green-200 text-xs">CARD HOLDER</p>
                  <p className="text-white">Kishan Kumar Pandit</p>
                </div>
                <div>
                  <p className="text-green-200 text-xs">VALID THRU</p>
                  <p className="text-white">03/30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section - Right Side */}
          <div className="w-full md:w-3/5 p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              You missed to become a FARMER!
            </h2>
            <p className="text-gray-600 mb-6">
              Join the Kishan Parivar and enjoy exclusive benefits designed
              specifically for agricultural professionals.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-gray-700">
                  Financial support with low-interest loans
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-gray-700">
                  Premium crop insurance at discounted rates
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-gray-700">
                  Earn reward points on agricultural purchases
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-gray-700">
                  Exclusive discounts with partner suppliers
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-gray-700">
                  Seasonal payment schedules aligned with harvests
                </span>
              </li>
            </ul>

            {/* Simple CTA */}
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KishanParivar;
