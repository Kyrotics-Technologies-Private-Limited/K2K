import React from 'react';
import Zeropre from '/assets/productbadgeimg/ZERO PRESERVATIVES.png';
import Zeroadu from '/assets/productbadgeimg/ZERO ADULTERATION.png';
import chol from '/assets/productbadgeimg/NO BAD CHOLESTEROL.png';
import home from '/assets/productbadgeimg/MADE AT HOME-NOT IN FACTORIES.png';
import lab from '/assets/productbadgeimg/LAB TESTED.png';
import unpro from '/assets/productbadgeimg/UNPROCESSED.png';
import source from '/assets/productbadgeimg/SOURCED FROM BEEKEEPERS.png';
import noadd from '/assets/productbadgeimg/NO ADDED SUGAR.png';
import immunity from '/assets/productbadgeimg/IMMUNITY BOOSTER.png';
import rural from '/assets/productbadgeimg/SOURCEDFROM RURAL FARMER.png';
import cold from '/assets/productbadgeimg/COLD PRESSED.png';
import refined from '/assets/productbadgeimg/NON REFINED.png';
import { Product } from '../../types';

interface ProductBadgeProps {
  product: Product;
}

const badgeIcons: { [key: string]: string } = {
  'Zero Adulteration': Zeroadu,
  'Lab Tested': lab,
  'Made at Home- Not in Factories': home,
  'Zero Preservatives': Zeropre,
  'No Bad Cholesterol': chol,
  'No added sugar': noadd,
  'Unprocessed': unpro,
  'Immunity Booster': immunity,
  'Sourced from Beekeepers': source,
  'Sourced from Rural Farmers': rural,
  'Cold Pressed': cold,
  'Non Refined': refined,
};

export const ProductBadges: React.FC<ProductBadgeProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6">
      {product.badges.map((badge, index) => (
        <div 
          key={index}
          className="flex flex-col items-center text-center group"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2 transform transition-transform group-hover:scale-110">
            <img 
              src={badgeIcons[badge.text]} 
              alt={badge.text} 
              className="w-16 h-16" 
            />
          </div>
          <span className="text-sm font-medium text-green-800">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};