import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, ChevronRight, CreditCard, Star, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductCard } from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { ProductBadges } from './Productbadge';
import { BenefitsBanner } from './BenefitsBanner';

interface ProductDetailProps {
  product: Product | undefined; 
  relatedProducts: Product[];
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, relatedProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // Get current cart item if it exists
  const cartItem = state.items.find(
    item => item?.id === product?.id && item.selectedVariant === selectedVariant
  );
  
  // Removed unused cartQuantity variable

  // Fixed: Added null check for product
  if (!product) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p>Product not found</p>
    </div>;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity: quantity, // FIXED: Use the state quantity instead of cartQuantity
        selectedVariant: selectedVariant,
      },
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity: quantity,
        selectedVariant: selectedVariant,
      },
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.images.gallery[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => 
                    Math.min(product.images.gallery.length - 1, prev + 1)
                  )}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md"
                  disabled={selectedImage === product.images.gallery.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-green-700' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.ratings)
                            ? 'fill-yellow-400 stroke-yellow-400'
                            : 'stroke-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <ProductBadges product={product} />

              <div>
                <h2 className="text-xl font-semibold mb-2">Select Variant</h2>
                <div className="flex flex-wrap gap-3">
                  {product.price.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedVariant === index
                          ? 'border-green-700 bg-green-700 text-white'
                          : 'border-gray-300 hover:border-green-700'
                      } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!variant.inStock}
                    >
                      {variant.weight}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-700">
                    ₹{product.price.variants[selectedVariant].price.toLocaleString('en-IN')}
                  </span>
                  {selectedVariant > 0 && (
                    <span className="text-sm text-gray-500">
                      per {product.price.variants[selectedVariant].weight}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Quantity</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border-2 border-green-700 text-green-700 py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 hover:text-white transition-all duration-300"
                  disabled={!product.price.variants[selectedVariant].inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
                  disabled={!product.price.variants[selectedVariant].inStock}
                >
                  <CreditCard className="w-5 h-5" />
                  Buy Now
                </button>
                <button 
                  className="p-3 rounded-lg border border-gray-300 hover:border-green-700 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* <div>
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>

         {/* Benefits Banner */}
         <BenefitsBanner product={product} />


        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};