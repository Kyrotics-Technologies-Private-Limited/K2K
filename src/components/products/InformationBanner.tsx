import React from 'react';
import { Product } from '../../types';

interface BenefitsBannerProps {
  product: Product;
}

export const BenefitsBanner: React.FC<BenefitsBannerProps> = ({ product }) => {
  return (
    <div 
      className="relative rounded-xl shadow-lg p-8 my-4 bg-cover bg-center h-[300px]"
      style={{
        backgroundImage: 'url("/assets/bannerimg/banner.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">DID YOU KNOW ?</h1>
        <p className="text-gray-100 max-w-2xl mx-auto">
          Carefully sourced from nature, minimally processed, and delivered fresh to your door. Each
          product maintains its natural goodness and nutritional integrity.
        </p>
      </div>
    </div>
  );
};
