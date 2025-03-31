import React, { useState } from 'react';
import { Product } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HealthBenefitsProps {
  product: Product;
}

export const HealthBenefits: React.FC<HealthBenefitsProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open state

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between "
      >
        <div className="text-left">
          <h2 className="text-3xl uppercase font-bold font-cormorant text-gray-800">Benefits</h2>
        </div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-500" />
        )}
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        
.          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-green-700 flex items-center justify-center p-2">
                    <img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-cormorant text-gray-600">
                    {benefit.title}
                  </h4>
                  <div className="h-0.5  mb-2"></div>
                  <p className="text-gray-800">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </>
  );
}; 