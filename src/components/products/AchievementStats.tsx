import React from 'react';
import { Users2, MapPin, Award, ClipboardCheck, BadgeCheck, Leaf, Droplets, Sun, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';

interface AchievementStatsProps {
  product: Product;
}

const getProductAchievements = (product: Product) => {
  switch (product.category) {
    case 'ghee':
      return [
        {
          icon: <Users2 className="w-10 h-10 text-amber-800" />,
          number: "100+",
          label: "Farmers Empowered"
        },
        {
          icon: <MapPin className="w-10 h-10 text-amber-800" />,
          text: "Pampore",
          subText: "Gujrat"
        },
        {
          icon: <Award className="w-10 h-10 text-amber-800" />,
          number: "11",
          label: "Lab Tests Done"
        },
        {
          icon: <ClipboardCheck className="w-10 h-10 text-amber-800" />,
          number: "100%",
          label: "Quality Assured"
        },
        {
          icon: <BadgeCheck className="w-10 h-10 text-amber-800" />,
          number: "5+",
          label: "Years of Excellence"
        }
      ];
    case 'honey':
      return [
        {
          icon: <Leaf className="w-10 h-10 text-yellow-500" />,
          number: "100%",
          label: "Pure & Natural"
        },
        {
          icon: <Users2 className="w-10 h-10 text-yellow-500" />,
          number: "50+",
          label: "Beekeepers Network"
        },
        {
          icon: <Sun className="w-10 h-10 text-yellow-500" />,
          text: "Raw Honey",
          subText: "Unprocessed & Unheated"
        },
        {
          icon: <ShieldCheck className="w-10 h-10 text-yellow-500" />,
          number: "8",
          label: "Quality Tests"
        },
        {
          icon: <Award className="w-10 h-10 text-yellow-500" />,
          number: "4+",
          label: "Years of Trust"
        }
      ];
    case 'oils':
      return [
        {
          icon: <Droplets className="w-10 h-10 text-yellow-700" />,
          number: "100%",
          label: "Cold Pressed"
        },
        {
          icon: <Users2 className="w-10 h-10 text-yellow-700" />,
          number: "75+",
          label: "Farmer Partners"
        },
        {
          icon: <Leaf className="w-10 h-10 text-yellow-700" />,
          text: "Chemical Free",
          subText: "Traditional Extraction"
        },
        {
          icon: <ShieldCheck className="w-10 h-10 text-yellow-700" />,
          number: "10",
          label: "Quality Checks"
        },
        {
          icon: <Award className="w-10 h-10 text-yellow-700" />,
          number: "3+",
          label: "Years of Service"
        }
      ];
    default:
      return [
        {
          icon: <ShieldCheck className="w-10 h-10 text-yellow-700" />,
          number: "100%",
          label: "Quality Assured"
        },
        {
          icon: <Users2 className="w-10 h-10 text-yellow-700" />,
          number: "1000+",
          label: "Happy Customers"
        },
        {
          icon: <Leaf className="w-10 h-10 text-yellow-700" />,
          text: "Natural",
          subText: "Pure & Chemical Free"
        },
        {
          icon: <ClipboardCheck className="w-10 h-10 text-yellow-700" />,
          number: "10+",
          label: "Quality Tests"
        },
        {
          icon: <Award className="w-10 h-10 text-yellow-700" />,
          number: "4+",
          label: "Years of Trust"
        }
      ];
  }
};

export const AchievementStats: React.FC<AchievementStatsProps> = ({ product }) => {
  const achievements = getProductAchievements(product);

  return (
    <div className="relative py-12 w-full ">
      {/* Decorative Elements */}
      <div className="w-full px-4">
        <div className="flex flex-wrap justify-around gap-10 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {achievements.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative transform transition-transform group-hover:scale-110">
                <div className="absolute inset-0 bg-green-100 rounded-full  border-2 border-green-700"></div>
                <div className="relative z-10 p-6">
                  {item.icon}
                </div>
              </div>
              {item.number ? (
                <>
                  <span className="text-2xl font-bold font-cormorant mt-3 mb-1 text-black">{item.number}</span>
                  <span className="text-lg text-gray-600  max-w-[200px]">{item.label}</span>
                </>
              ) : (
                <>
                  <span className="text-xl font-bold font-cormorant mt-3 mb-1 text-black">{item.text}</span>
                  <span className="text-lg text-gray-600  max-w-[200px]">{item.subText}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 