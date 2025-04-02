import React from 'react';
import { 
  HandCoins, 
  ShieldCheck, 
  Gift, 
  Percent, 
  CalendarCheck, 
  BadgeCheck, 
  GraduationCap, 
  Sprout,
  ChevronRight 
} from "lucide-react";

interface FeaturesKishanParivarProps {
  scrollToTarget: () => void;
}

const FeaturesKishanParivar: React.FC<FeaturesKishanParivarProps> = ({ scrollToTarget }) => {
  const features = [
    {
      text: "Financial support with low-interest loans",
      icon: HandCoins
    },
    {
      text: "Premium crop insurance at discounted rates",
      icon: ShieldCheck
    },
    {
      text: "Earn reward points on agricultural purchases",
      icon: Gift
    },
    {
      text: "Exclusive discounts with partner suppliers",
      icon: Percent
    },
    {
      text: "Seasonal payment schedules aligned with harvests",
      icon: CalendarCheck
    },
    {
      text: "Priority access to government schemes",
      icon: BadgeCheck
    },
    {
      text: "Free agricultural workshops and training",
      icon: GraduationCap
    },
    {
      text: "Personalized farming advisory services",
      icon: Sprout
    }
  ];

  const mobileFeatures = features.slice(0, 5);

  return (
    <div className="relative h-auto min-h-[600px] md:min-h-[700px] overflow-hidden"> {/* Increased mobile height */}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1287124/pexels-photo-1287124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl rounded-xl shadow-2xl bg-green-brand/70 backdrop-blur-sm p-6 sm:p-8">
          <div className="text-center text-white space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Premium Features
              </h2>
              <p className="text-green-100 text-sm sm:text-base">
                Exclusive benefits for Kishan Parivar members
              </p>
            </div>

            {/* Mobile: Show only 5 features */}
            <div className="md:hidden space-y-4"> {/* Added space-y-4 for better spacing */}
              <ul className="grid grid-cols-1 gap-3 text-left">
                {mobileFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-lg bg-green-900/40"
                    >
                      <div className="p-2 bg-green-800 rounded-lg">
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className="text-white text-sm">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-4">
                <button 
                  onClick={scrollToTarget} 
                  className="w-full inline-flex items-center group justify-center px-6 py-3 font-medium text-green-800 bg-white rounded-lg shadow hover:shadow-md hover:bg-green-50 transition-colors"
                >
                  <span className="font-semibold">Become a Member</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Desktop: Show all features */}
            <div className="hidden md:block">
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 text-left">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-green-900/40 hover:bg-green-900/60 transition-colors"
                    >
                      <div className="p-2 bg-green-800 rounded-lg">
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-white text-sm sm:text-base">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-6"> {/* Increased padding-top */}
                <button 
                  onClick={scrollToTarget} 
                  className="inline-flex items-center group justify-center px-8 py-3 font-medium text-green-800 bg-white rounded-lg shadow hover:shadow-md hover:bg-green-50 transition-colors"
                >
                  <span className="font-semibold">Become a Member</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesKishanParivar;