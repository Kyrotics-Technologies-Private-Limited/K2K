import React from 'react';
import { Product } from '../../types';

interface BenefitsBannerProps {
  product: Product;
}

export const BenefitsBanner: React.FC<BenefitsBannerProps> = ({ product }) => {
  return (
    <div 
      className="relative rounded-xl shadow-lg  bg-cover bg-center h-[345px] mb-10 "
      // style={{
      //   backgroundImage:product.images.banner,
      // }}

    >
      <img src={product.images.banner} alt="banner" className='w-full h-full object-cover' />
    </div>
  );
};
