// import { CreditCard, BadgePercent } from "lucide-react";

// const KishanParivarHero = () => {
//   return (
//     <>
//       <header className="w-full h-auto flex flex-col-reverse lg:flex-row items-center justify-center md:p-10 bg-green-100">
//         <div className="w-full max-w-1/2 p-10">
//           <div className="p-10 border-2 border-yellow-500 bg-white rounded-lg h-full flex flex-col justify-center items-center gap-10 shadow-xl">
//             <div className="text-center flex">
//               <BadgePercent size={60} className="text-yellow-500" />
//               <span className="lg:text-4xl md:text-2xl sm:text-lg text-green-700 font-semibold px-0">
//                 Become a Premium member with Kishan Parivar
//               </span>
//               <BadgePercent size={60} className="text-yellow-500" />
//             </div>
//             {/* card */}
//             <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 sm:w-[400px] w-full lg:max-w-lg shadow-xl">
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
//         </div>
//         <div className="w-full max-w-1/2">
//           <img
//             className="w-[800px] p-10"
//             src="/assets/images/KishanParivarHeroImage.png"
//             alt=""
//           />
//         </div>
//       </header>
//     </>
//   );
// };

// export default KishanParivarHero;

import React from "react";
import { CreditCard, BadgePercent } from "lucide-react";

const KishanParivarHero: React.FC = () => {
  return (
    <header className="w-full h-auto flex flex-col-reverse lg:flex-row items-center justify-center md:p-10 bg-green-100">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10">
        <div className="p-6 sm:p-10 border-2 border-yellow-500 bg-white rounded-lg flex flex-col justify-center items-center gap-6 sm:gap-10 shadow-xl">
          {/* Heading */}
          <div className="text-center flex items-center">
            <BadgePercent size={40} className="text-yellow-500" />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-green-700 font-semibold px-2 sm:px-4">
              Become a Premium Member with Kishan Parivar
            </span>
            <BadgePercent size={40} className="text-yellow-500" />
          </div>

          {/* Green Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 sm:p-6 w-11/12 sm:w-[400px] max-w-lg shadow-xl aspect-[16/9] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-10 sm:mb-16">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-100">
                  Kishan Parivar
                </h3>
                <p className="text-green-200 text-xs sm:text-sm">Premium Member</p>
              </div>
              <CreditCard size={22} className="text-green-100" />
            </div>
            <div className="mb-2 sm:mb-4">
              <p className="text-green-100 text-sm sm:text-lg">•••• •••• •••• 1234</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-green-200 text-[10px] sm:text-xs">CARD HOLDER</p>
                <p className="text-white text-sm sm:text-base">Kishan Kumar Pandit</p>
              </div>
              <div>
                <p className="text-green-200 text-[10px] sm:text-xs">VALID THRU</p>
                <p className="text-white text-sm sm:text-base">03/30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          className="w-[90%] sm:w-[800px] p-4 sm:p-10"
          src="/assets/images/KishanParivarHeroImage.png"
          alt="Kishan Parivar"
        />
      </div>
    </header>
  );
};

export default KishanParivarHero;
