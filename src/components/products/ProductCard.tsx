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

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${product.id}`);
  };

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
      onClick={handleProductClick}
      className="group bg-white rounded-md shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative w-[240px]"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.images.main}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-1.5 left-1.5 flex gap-0.5">
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/90 text-[#4A5D23]">
            {product.category}
          </span>
          {product.ratings >= 4.5 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F8D7A8] text-[#A05E2B]">
              Best
            </span>
          )}
        </div>

        {quantity > 0 && (
          <div className="absolute bottom-1.5 right-1.5 bg-white shadow rounded-md p-0.5 flex items-center gap-0.5 z-10">
            <button
              onClick={(e) => updateQuantity(e, quantity - 1)}
              className="w-5 h-5 flex items-center justify-center hover:bg-gray-100"
            >
              <Minus className="w-2.5 h-2.5 text-[#4A5D23]" />
            </button>
            <span className="w-4 text-center text-xs font-medium text-[#4A5D23]">
              {quantity}
            </span>
            <button
              onClick={(e) => updateQuantity(e, quantity + 1)}
              className="w-5 h-5 flex items-center justify-center hover:bg-gray-100"
            >
              <Plus className="w-2.5 h-2.5 text-[#4A5D23]" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-2">
        <h3 className="text-sm font-semibold text-[#2C3639] mb-0.5 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-[10px] mb-1.5 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <span className="text-base font-bold text-[#4A5D23]">
              ₹{basePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-gray-500 ml-0.5">onwards</span>
          </div>
          
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
            <span className="text-[10px] font-medium">{product.ratings}</span>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white border border-[#4A5D23] text-[#4A5D23] py-1 rounded hover:bg-[#4A5D23] hover:text-white transition-colors text-[10px] flex items-center justify-center gap-0.5"
          >
            <ShoppingCart className="w-2.5 h-2.5" />
            Add
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#4A5D23] text-white py-1 rounded hover:bg-[#3A4D13] transition-colors text-[10px] flex items-center justify-center gap-0.5"
          >
            <CreditCard className="w-2.5 h-2.5" />
            Buy
          </button>
        </div>
      </div>
    </Link>
  );
};