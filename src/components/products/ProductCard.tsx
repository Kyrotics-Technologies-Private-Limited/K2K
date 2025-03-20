import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, CreditCard, Minus, Plus } from 'lucide-react';
import { Product } from '../../types';
import {useCart} from '../../context/CartContext'

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const basePrice = product.price.variants[0].price;

  const cartItem = state.items.find(
    item => item.id === product.id && item.selectedVariant === 0
  );
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity: 1,
        selectedVariant: 0,
      },
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity: 1,
        selectedVariant: 0,
      },
    });
    navigate('/checkout');
  };

  const updateQuantity = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    if (newQuantity < 0) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: newQuantity },
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative"
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

        {/* Quantity Badge */}
        {quantity > 0 && (
          <div 
            className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-1 flex items-center gap-2 z-10"
            aria-label={`Quantity: ${quantity}`}
            role="status"
          >
            <button
              onClick={(e) => updateQuantity(e, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4A5D23] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-[#4A5D23]" />
            </button>
            <span className="w-8 text-center font-medium text-[#4A5D23]">
              {quantity}
            </span>
            <button
              onClick={(e) => updateQuantity(e, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4A5D23] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-[#4A5D23]" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2C3639] mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
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

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white border-2 border-[#4A5D23] text-[#4A5D23] py-2 rounded-lg hover:bg-[#4A5D23] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#4A5D23] text-white py-2 rounded-lg hover:bg-[#3A4D13] transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
};