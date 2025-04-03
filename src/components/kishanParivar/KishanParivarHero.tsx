// import React from "react";
// import { CreditCard, BadgePercent } from "lucide-react";

// const KishanParivarHero: React.FC = () => {
//   return (
//     <header className="w-full h-auto flex flex-col-reverse lg:flex-row items-center justify-center md:p-10 bg-[#fffbe8]">
//       {/* Left Section */}
//       <div className="w-full lg:w-1/2 p-6 sm:p-10">
//         <div className="p-6 sm:p-10 bg-white rounded-lg flex flex-col justify-center items-center gap-6 sm:gap-10 shadow-xl">
//           {/* Heading */}
//           <div className="text-center flex items-center">
//             {/* <BadgePercent size={40} className="text-yellow-500" /> */}
//             <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-green-700 font-semibold px-2 sm:px-4">
//               <h1>Become a Premium Member With Kishan Parivar</h1>
//             </span>
//             {/* <BadgePercent size={40} className="text-yellow-500" /> */}
//           </div>

//           {/* Green Card */}
//           <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 sm:p-6 w-11/12 sm:w-[400px] max-w-lg shadow-xl aspect-[16/9] flex flex-col justify-between">
//             <div className="flex justify-between items-start mb-10 sm:mb-16">
//               <div>
//                 <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-100">
//                   Kishan Parivar
//                 </h3>
//                 <p className="text-green-200 text-xs sm:text-sm">Premium Member</p>
//               </div>
//               <CreditCard size={22} className="text-green-100" />
//             </div>
//             <div className="mb-2 sm:mb-4">
//               <p className="text-green-100 text-sm sm:text-lg">•••• •••• •••• 1234</p>
//             </div>
//             <div className="flex justify-between items-end">
//               <div>
//                 <p className="text-green-200 text-[10px] sm:text-xs">CARD HOLDER</p>
//                 <p className="text-white text-sm sm:text-base">Kishan Kumar Pandit</p>
//               </div>
//               <div>
//                 <p className="text-green-200 text-[10px] sm:text-xs">VALID THRU</p>
//                 <p className="text-white text-sm sm:text-base">03/30</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Image */}
//       <div className="w-full lg:w-1/2 flex justify-center">
//         <img
//           className="w-[90%] sm:w-[800px] p-4 sm:p-10"
//           src="/assets/images/KishanParivarImage.png"
//           alt="Kishan Parivar"
//         />
//       </div>
//     </header>
//   );
// };

// export default KishanParivarHero;

import React from "react";
import { CreditCard } from "lucide-react";

interface HeroKishanParivarProps {
  scrollToTarget: () => void;
}

const KishanParivarHero: React.FC<HeroKishanParivarProps> = ({ scrollToTarget }) => {
  return (
    <header className="w-full min-h-[85vh] flex flex-col-reverse lg:flex-row items-center justify-center bg-[#fffbe8] px-4 overflow-hidden pt-16 lg:pt-0">
      {/* Left Section - Compact Content */}
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex justify-center">
        <div className="max-w-md w-full">
          {/* Compact Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-green-brand leading-tight">
              Kishan Parivar Premium
            </h1>
            <p className="mt-2 text-gray-600">Exclusive benefits for farmers</p>
          </div>

          {/* Premium Card - Compact Version */}
          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 w-full aspect-[16/9] flex flex-col justify-between shadow-xl">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Kishan Parivar</h3>
                  <p className="text-green-200 text-sm">Premium Member</p>
                </div>
                <CreditCard className="text-white" />
              </div>
              <div>
                <p className="text-white text-xl tracking-widest font-mono mb-4">•••• •••• •••• 1234</p>
                <div className="flex justify-between text-white text-sm">
                  <div>
                    <p className="text-green-200 text-xs">CARD HOLDER</p>
                    <p>Kishan Kumar</p>
                  </div>
                  <div>
                    <p className="text-green-200 text-xs">VALID THRU</p>
                    <p>03/30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Single CTA Button */}
          <button onClick={scrollToTarget} className="w-full py-3 bg-green-brand hover:scale-[1.01] text-white font-medium rounded-lg shadow hover:shadow-md flex items-center justify-center gap-2">
            Apply Now
          </button>
        </div>
      </div>

      {/* Right Section - Image Only */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 mt-8 lg:mt-0">
        <div className="relative h-full w-full max-w-xl">
          <img
            className="h-full w-full object-contain object-center"
            src="/assets/images/KishanParivarImage.png"
            alt="Kishan Parivar Premium Benefits"
          />
        </div>
      </div>
    </header>
  );
};

export default KishanParivarHero;
