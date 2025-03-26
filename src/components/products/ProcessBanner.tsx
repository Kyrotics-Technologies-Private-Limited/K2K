import React from 'react';
import { Product } from '../../types';

interface ProcessBannerProps {
  product: Product;
}

export const ProcessBanner: React.FC<ProcessBannerProps> = ({ product }) => {
  const processSteps = [
    {
      name: 'Boiling',
      image: '/assets/process/boiling.png'
    },
    {
      name: 'Curdling',
      image: '/assets/process/curdling.png'
    },
    {
      name: 'Churning',
      image: '/assets/process/churning.png'
    },
    {
      name: 'Separating',
      image: '/assets/process/separating.png'
    },
    {
      name: 'Heating',
      image: '/assets/process/heating.png'
    }
  ];

  return (
    <div className="bg-[#1a1a1a] text-white py-12 mt-8 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Process</h2>
        <div className="relative">
          {/* Process Steps */}
          <div className="flex justify-between items-center">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2a2a2a] p-3 mb-3">
                  <img
                    src={step.image}
                    alt={step.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm md:text-base text-[#9ca3af]">{step.name}</span>
              </div>
            ))}
          </div>
          
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-[#4a5d23]" style={{ width: '80%', margin: '0 auto' }}>
            {/* Arrow markers */}
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${(index + 1) * 25 - 12.5}%` }}
              >
                <div className="w-3 h-3 transform rotate-45 border-t-2 border-r-2 border-[#4a5d23]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 