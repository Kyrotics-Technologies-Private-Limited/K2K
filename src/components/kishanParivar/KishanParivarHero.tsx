
import React from "react";


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
              Kishan Parivar Membership
            </h1>
            {/* <p className="mt-2 text-gray-600">Exclusive benefits for farmers</p> */}
          </div>

          {/* Premium Card - Compact Version */}
          {/* Premium Image */}
          <div className="relative mb-6 w-full flex justify-center">
            <img
              src="/assets/membershiphomeimg/FINAL.png"
              alt="Kishan Parivar Membership"
              className="w-full h-auto object-contain rounded-xl shadow-lg mix-blend-multiply"
            />
          </div>

          {/* Single CTA Button */}
          <button onClick={scrollToTarget} className="button w-full py-3 bg-green-brand hover:scale-[1.01] text-white font-medium rounded-lg shadow hover:shadow-md flex items-center justify-center gap-2">
           Subscribe Now
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
