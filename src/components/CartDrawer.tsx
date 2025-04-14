// import React from 'react';
// import { X, Plus, Minus, Trash2 } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';

// interface CartDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
//   const { state, dispatch } = useCart();
//   const navigate = useNavigate();

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
//   };

//   const removeItem = (id: string) => {
//     dispatch({ type: 'REMOVE_ITEM', payload: id });
//   };

//   const handleCheckout = () => {
//     onClose();
//     navigate('/checkout');
//   };

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
//           isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={onClose}
//       />
//       <div
//         className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-[#2C3639]">Shopping Cart</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {state.items.length === 0 ? (
//             <div className="flex-1 flex flex-col items-center justify-center gap-4">
//               <p className="text-gray-500">Your cart is empty</p>
//               <button
//                 onClick={() => {
//                   onClose();
//                   navigate('/All-products');
//                 }}
//                 className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* Cart Banner */}
//               <div 
//                 className="bg-green-50 border-b border-green-100 px-6 py-3 h-[130px]"
//                 style={{
//                   backgroundImage: 'url("https://picsum.photos/200/300")'
//                 }}
//               >
//               </div>

//               {/* Cart Items */}
//               <div className="flex-1 overflow-y-auto py-4">
//                 {state.items.map(item => (
//                   <div
//                     key={`${item.id}-${item.selectedVariant}`}
//                     className="px-6 py-4 border-b border-gray-200 last:border-0"
//                   >
//                     <div className="flex gap-4">
//                       <img
//                         src={item.images.main}
//                         alt={item.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium text-[#2C3639]">{item.name}</h3>
//                         <p className="text-sm text-gray-500">
//                           {item.price.variants[item.selectedVariant].weight}
//                         </p>
//                         <div className="mt-2 flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="p-1 hover:bg-gray-100 rounded"
//                             >
//                               <Minus className="w-4 h-4" />
//                             </button>
//                             <span className="w-8 text-center">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="p-1 hover:bg-gray-100 rounded"
//                             >
//                               <Plus className="w-4 h-4" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeItem(item.id)}
//                             className="p-1 hover:bg-gray-100 rounded text-red-500"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium text-[#4A5D23]">
//                           ₹
//                           {(
//                             item.price.variants[item.selectedVariant].price * item.quantity
//                           ).toLocaleString('en-IN')}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {state.items.length > 0 && (
//             <div className="border-t border-gray-200 px-6 py-4 space-y-4">
//               <div className="flex items-center justify-between text-lg font-semibold">
//                 <span>Total</span>
//                 <span className="text-[#4A5D23]">
//                   ₹{state.total.toLocaleString('en-IN')}
//                 </span>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-[#3A4D13] transition-colors"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import cartApi, { CartItem, Cart, CartSummary } from '../services/cartApi';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch cart data when drawer opens
  useEffect(() => {
    if (isOpen) {
      fetchCartData();
    }
  }, [isOpen]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const cartResponse = await cartApi.getCart();
      const summaryResponse = await cartApi.getCartSummary();
      
      setCart(cartResponse.cart);
      setCartSummary(summaryResponse);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      setLoading(true);
      await cartApi.updateItem(itemId, quantity);
      await fetchCartData(); // Refresh cart data after update
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      console.error('Failed to update item:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      await cartApi.removeItem(itemId);
      await fetchCartData(); // Refresh cart data after removal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      console.error('Failed to remove item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Helper function to get product info from cart item
  // Note: You'll need to adapt this based on how your product data is structured
  const getProductInfo = (item: CartItem) => {
    // This is a placeholder - your actual implementation will depend on how
    // your backend returns product details with cart items
    return {
      name: `Product ${item.product_id}`,
      image: 'https://picsum.photos/200/300', // Placeholder image
      price: item.quantity * 100, // Placeholder price calculation
      variant: item.variant_id || 'default'
    };
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#2C3639]">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {loading && (
            <div className="flex-1 flex items-center justify-center">
              <p>Loading cart...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-center">
              {error}
            </div>
          )}

          {!loading && !error && (!cart || cart.items.length === 0) ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/All-products');
                }}
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Banner */}
              <div 
                className="bg-green-50 border-b border-green-100 px-6 py-3 h-32"
                style={{
                  backgroundImage: 'url("https://picsum.photos/200/300")'
                }}
              >
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {cart && cart.items.map(item => {
                  const productInfo = getProductInfo(item);
                  
                  return (
                    <div
                      key={item.id}
                      className="px-6 py-4 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex gap-4">
                        <img
                          src={productInfo.image}
                          alt={productInfo.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-[#2C3639]">{productInfo.name}</h3>
                          <p className="text-sm text-gray-500">
                            {productInfo.variant}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#4A5D23]">
                            ₹{productInfo.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!loading && cartSummary && cartSummary.item_count > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-[#4A5D23]">
                  ₹{cartSummary.total.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-[#3A4D13] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};