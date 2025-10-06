import React from 'react';
import { Product } from '../../types';

interface BenefitsBannerProps {
  product: Product;
}

export const BenefitsBanner: React.FC<BenefitsBannerProps> = ({ product }) => {
  return (
    <div 
      className="relative  shadow-lg  bg-contain bg-center  mb-10 "
      // style={{
      //   backgroundImage:product.images.banner,
      // }}

    >
      <img src={product.images.banner} alt="banner" className='w-full h-full object-contain rounded-xl' />
    </div>
  );
};
