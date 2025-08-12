
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
