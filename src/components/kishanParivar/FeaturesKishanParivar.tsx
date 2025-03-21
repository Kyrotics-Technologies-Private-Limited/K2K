

// // import React from 'react';
// // import { Award } from "lucide-react";

// // // Create an interface for the component props
// // interface FeaturesKishanParivarProps {
// //   scrollToTarget: () => void;
// // }

// // const FeaturesKishanParivar: React.FC<FeaturesKishanParivarProps> = ({ scrollToTarget }) => {
// //   return (
// //     <>
// //       <div className="relative h-[400px] md:h-[600px] lg:h-[750px]">
// //         {/* Background Image with Fixed Effect */}
// //         <div
// //           className="absolute inset-0 bg-fixed bg-center bg-cover"
// //           style={{
// //             backgroundImage:
// //               "url('https://images.pexels.com/photos/1287124/pexels-photo-1287124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
// //           }}
// //         />

// //         {/* Overlay */}
// //         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-center justify-center">
// //           <div className="max-w-xl rounded-md overflow-hidden shadow-lg bg-green-700 opacity-90 ">
// //             <div className="px-6 py-4">
// //               <div className="font-bold text-3xl mb-10 text-white">
// //                 Premium Features for Kishan Parivar Members!
// //               </div>
// //               <ul className="space-y-8 mb-8">
// //                 <li className="flex items-center gap-3 text-xl">
// //                   <Award size={20} className="text-green-100" />
// //                   <span className="text-green-100">
// //                     Financial support with low-interest loans
// //                   </span>
// //                 </li>
// //                 <li className="flex items-center gap-3 text-xl">
// //                   <Award size={20} className="text-green-100" />
// //                   <span className="text-green-100">
// //                     Premium crop insurance at discounted rates
// //                   </span>
// //                 </li>
// //                 <li className="flex items-center gap-3 text-xl">
// //                   <Award size={20} className="text-green-100" />
// //                   <span className="text-green-100">
// //                     Earn reward points on agricultural purchases
// //                   </span>
// //                 </li>
// //                 <li className="flex items-center gap-3 text-xl">
// //                   <Award size={20} className="text-green-100" />
// //                   <span className="text-green-100">
// //                     Exclusive discounts with partner suppliers
// //                   </span>
// //                 </li>
// //                 <li className="flex items-center gap-3 text-xl">
// //                   <Award size={20} className="text-green-100" />
// //                   <span className="text-green-100">
// //                     Seasonal payment schedules aligned with harvests
// //                   </span>
// //                 </li>
// //               </ul>
// //             </div>
// //             <div className="px-6 pt-4 pb-2">
// //               <button onClick={scrollToTarget} className="bg-white p-2 m-4 rounded-sm hover:shadow-lg">
// //                 Become Member →
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default FeaturesKishanParivar;

// import React from 'react';
// import { Award } from "lucide-react";

// // Create an interface for the component props
// interface FeaturesKishanParivarProps {
//   scrollToTarget: () => void;
// }

// const FeaturesKishanParivar: React.FC<FeaturesKishanParivarProps> = ({ scrollToTarget }) => {
//   return (
//     <>
//       <div className="relative h-[500px] md:h-[600px] lg:h-[750px]">
//         {/* Background Image with Fixed Effect */}
//         <div
//           className="absolute inset-0 bg-fixed bg-center bg-cover"
//           style={{
//             backgroundImage:
//               "url('https://images.pexels.com/photos/1287124/pexels-photo-1287124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
//           }}
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-center justify-center overflow-y-auto py-8">
//           <div className="max-w-xl w-11/12 rounded-md shadow-lg bg-green-700 opacity-90 mx-4">
//             <div className="px-4 sm:px-6 py-4">
//               <div className="font-bold text-xl sm:text-2xl md:text-3xl mb-6 md:mb-10 text-white text-center">
//                 Premium Features for Kishan Parivar Members!
//               </div>
//               <ul className="space-y-4 sm:space-y-6 md:space-y-8 mb-6 md:mb-8">
//                 <li className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
//                   <Award size={20} className="text-green-100 flex-shrink-0" />
//                   <span className="text-green-100">
//                     Financial support with low-interest loans
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
//                   <Award size={20} className="text-green-100 flex-shrink-0" />
//                   <span className="text-green-100">
//                     Premium crop insurance at discounted rates
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
//                   <Award size={20} className="text-green-100 flex-shrink-0" />
//                   <span className="text-green-100">
//                     Earn reward points on agricultural purchases
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
//                   <Award size={20} className="text-green-100 flex-shrink-0" />
//                   <span className="text-green-100">
//                     Exclusive discounts with partner suppliers
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
//                   <Award size={20} className="text-green-100 flex-shrink-0" />
//                   <span className="text-green-100">
//                     Seasonal payment schedules aligned with harvests
//                   </span>
//                 </li>
//               </ul>
//             </div>
//             <div className="px-6 pt-2 pb-4 flex justify-center">
//               <button 
//                 onClick={scrollToTarget} 
//                 className="bg-white p-2 px-4 rounded-sm hover:shadow-lg font-medium"
//               >
//                 Become Member →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FeaturesKishanParivar;

import React from 'react';
import { Award } from "lucide-react";

// Create an interface for the component props
interface FeaturesKishanParivarProps {
  scrollToTarget: () => void;
}

const FeaturesKishanParivar: React.FC<FeaturesKishanParivarProps> = ({ scrollToTarget }) => {
  return (
    <div className="relative h-auto min-h-[500px] md:min-h-[600px] lg:min-h-[750px]">
      {/* Background Image with Fixed Effect */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1287124/pexels-photo-1287124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-lg rounded-md shadow-lg bg-green-700 opacity-90 p-6 sm:p-8">
          <div className="text-center text-white">
            <h2 className="font-bold text-lg sm:text-2xl md:text-3xl mb-6">
              Premium Features for Kishan Parivar Members!
            </h2>
            <ul className="space-y-4 sm:space-y-6 mb-6">
              {[
                "Financial support with low-interest loans",
                "Premium crop insurance at discounted rates",
                "Earn reward points on agricultural purchases",
                "Exclusive discounts with partner suppliers",
                "Seasonal payment schedules aligned with harvests",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-lg">
                  <Award size={18} className="text-green-100 flex-shrink-0" />
                  <span className="text-green-100">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={scrollToTarget} 
              className="bg-white text-sm sm:text-base px-4 py-2 rounded-sm hover:shadow-lg font-medium"
            >
              Become Member →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesKishanParivar;