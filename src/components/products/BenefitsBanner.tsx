import React from 'react';
import { Product } from '../../types';

interface BenefitsBannerProps {
  product: Product;
}

export const BenefitsBanner: React.FC<BenefitsBannerProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 my-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {product.benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full bg-[#F5F5DC] flex items-center justify-center mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-green-100 group-hover:shadow-lg">
              <img 
                src={benefit.icon} 
                alt={benefit.title}
                className="w-16 h-16 object-contain"
              />
            </div>
            <h3 className="text-[#2C3639] font-semibold mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};