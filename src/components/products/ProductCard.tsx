import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const basePrice = product.price.variants[0].price;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.images.main}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full text-sm bg-white/90 text-[#4A5D23]">
            {product.category}
          </span>
          {product.ratings >= 4.5 && (
            <span className="px-3 py-1 rounded-full text-sm bg-[#F8D7A8] text-[#A05E2B]">
              Bestseller
            </span>
          )}
          {product.id.includes('new') && (
            <span className="px-3 py-1 rounded-full text-sm bg-[#E3F1D4] text-[#4A5D23]">
              New
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2C3639] mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#4A5D23]">
              ₹{basePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500 ml-1">onwards</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium">{product.ratings}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};