// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { ShoppingBag, CreditCard, Plus, Minus, Trash2 } from 'lucide-react';

// interface ShippingDetails {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// export const CheckoutPage: React.FC = () => {
//   // Add dispatch to the destructuring
//   const { state, dispatch } = useCart();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
//   const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });
  
//   console.log("total price:", state.total);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setShippingDetails(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
  
//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       dispatch({ type: 'REMOVE_ITEM', payload: id });
//       setStatusMessage({
//         type: 'success',
//         message: 'Item removed from cart'
//       });
//       setTimeout(() => setStatusMessage(null), 3000);
//       return;
//     }
    
//     if (newQuantity > 99) {
//       setStatusMessage({
//         type: 'error',
//         message: 'Maximum quantity limit reached'
//       });
//       setTimeout(() => setStatusMessage(null), 3000);
//       return;
//     }

//     dispatch({
//       type: 'UPDATE_QUANTITY',
//       payload: { id, quantity: newQuantity }
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     // Simulate payment processing
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     setIsProcessing(false);
//     // Here you would typically integrate with a payment gateway
//     alert('Order placed successfully!');
//     navigate('/');
//   };

//   if (state.items.length === 0) {
//     return (
//       <div className="bg-[#E0E7D7]">
//         <div className="bg-green-800 py-8"></div>
//         <div className='py-40 flex items-center justify-center'>
//           <div className="max-w-3xl mx-auto text-center">
//             <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//             <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
//             <button
//               onClick={() => navigate('/all-products')}
//               className="bg-[#4A5D23] text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#F5F5DC]">
     
      
//       {/* Status message notification */}
//       {statusMessage && (
//         <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
//           statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//         }`}>
//           {statusMessage.message}
//         </div>
//       )}
      
//       <div className="py-10 flex items-center justify-center">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Shipping Details Form */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-2xl font-semibold text-[#2C3639] mb-6">Shipping Details</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       required
//                       value={shippingDetails.firstName}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       required
//                       value={shippingDetails.lastName}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={shippingDetails.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       value={shippingDetails.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     required
//                     value={shippingDetails.address}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       required
//                       value={shippingDetails.city}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       name="state"
//                       required
//                       value={shippingDetails.state}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Pincode
//                     </label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       required
//                       value={shippingDetails.pincode}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//             {/* Order Summary */}
//             <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
//               <h2 className="text-2xl font-semibold text-[#2C3639] mb-6">Order Summary</h2>
//               <div className="space-y-4 mb-6">
//                 {state.items.map(item => (
//                   <div
//                     key={`${item.id}-${item.selectedVariant}`}
//                     className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4 border-b border-gray-200 last:border-0"
//                   >
//                     <img
//                       src={item.images.main}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-lg"
//                     />
                    
//                     <div className="flex-1">
//                       <h3 className="font-medium text-[#2C3639]">{item.name}</h3>
//                       <p className="text-sm text-gray-500">
//                         {item.price.variants[item.selectedVariant].weight}
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 hover:bg-gray-200 transition-colors"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus className="w-4 h-4" />
//                       </button>
                      
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
//                         min="1"
//                         max="99"
//                         className="w-12 text-center border rounded-lg py-1 px-2 focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
//                       />
                      
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 hover:bg-gray-200 transition-colors"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </button>

//                       <button
//                         onClick={() => updateQuantity(item.id, 0)}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors ml-2"
//                         aria-label="Remove item"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <p className="font-medium text-[#4A5D23] text-right md:text-left ml-auto">
//                       ₹{(item.price.variants[item.selectedVariant].price * item.quantity).toLocaleString('en-IN')}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <div className="space-y-2 py-4 border-t border-gray-200">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>₹{state.total.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span>Free</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
//                   <span>Total</span>
//                   <span className="text-[#4A5D23]">₹{state.total.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 disabled={isProcessing}
//                 className="w-full mt-6 bg-green-800 text-white py-3 rounded-lg hover:bg-[#3A4D13] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isProcessing ? (
//                   <>Processing...</>
//                 ) : (
//                   <>
//                     <CreditCard className="w-5 h-5" />
//                     Proceed to Pay
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, CreditCard, Plus, Minus, Trash2 } from 'lucide-react';
import { createOrder } from '../services/orderApi';
import cartApi, { CartItem as ApiCartItem, CartSummary } from '../services/cartApi';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface LocalCartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;
}

interface CartState {
  items: LocalCartItem[];
  summary: CartSummary;
  loading: boolean;
}

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartState>({
    items: [],
    summary: {
      item_count: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
      cart_id: ''
    },
    loading: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const [cartResponse, summary] = await Promise.all([
          cartApi.getCart(),
          cartApi.getCartSummary()
        ]);

        // Transform API cart items to local format
        const items: LocalCartItem[] = cartResponse.cart.items.map(item => ({
          id: item.id,
          product_id: item.product_id,
          name: `Product ${item.product_id}`, // Replace with actual product name from your API
          price: 0, // You'll need to get the actual price from your product API
          quantity: item.quantity,
          image: '/placeholder-product.jpg', // Replace with actual image URL
          variant: item.variant_id || 'Default' // Replace with actual variant name
        }));

        setCart({
          items,
          summary,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setStatusMessage({
          type: 'error',
          message: 'Failed to load your cart. Please try again.'
        });
        setCart(prev => ({ ...prev, loading: false }));
      }
    };

    fetchCartData();
  }, []);

  // Auto-fill user email if available
  useEffect(() => {
    if (user?.email && !shippingDetails.email) {
      setShippingDetails(prev => ({
        ...prev,
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      try {
        await cartApi.removeItem(id);
        setCart(prev => ({
          ...prev,
          items: prev.items.filter(item => item.id !== id)
        }));
        setStatusMessage({
          type: 'success',
          message: 'Item removed from cart'
        });
      } catch (error) {
        setStatusMessage({
          type: 'error',
          message: 'Failed to remove item'
        });
      }
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }
    
    if (newQuantity > 99) {
      setStatusMessage({
        type: 'error',
        message: 'Maximum quantity limit reached'
      });
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    try {
      await cartApi.updateItem(id, newQuantity);
      setCart(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      }));
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Failed to update quantity'
      });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const validateForm = (): boolean => {
    if (!user) {
      setStatusMessage({
        type: 'error',
        message: 'Please login to place an order'
      });
      return false;
    }

    if (cart.items.length === 0) {
      setStatusMessage({
        type: 'error',
        message: 'Your cart is empty'
      });
      return false;
    }

    const requiredFields: (keyof ShippingDetails)[] = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'pincode'
    ];

    for (const field of requiredFields) {
      if (!shippingDetails[field]) {
        setStatusMessage({
          type: 'error',
          message: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      // Prepare order items
      const orderItems = cart.items.map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        variant: item.variant,
      }));

      // Prepare shipping address
      const shippingAddress = {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        email: shippingDetails.email,
        phone: shippingDetails.phone,
        street: shippingDetails.address,
        city: shippingDetails.city,
        state: shippingDetails.state,
        postalCode: shippingDetails.pincode,
        country: 'India',
      };

      // Create order payload
      const orderData = {
        user_id: user?.uid || '',
        address_id: '', // Will be created on backend
        total_amount: cart.summary.total,
        status: 'pending',
        payment_id: `pay_${Math.random().toString(36).substring(2, 11)}`,
        shipping_address: shippingAddress,
        cart_id: cart.summary.cart_id,
      };

      // Call the createOrder API
      const { data } = await createOrder(orderData, orderItems);
      
      // Clear cart on successful order
      await cartApi.clearCart();

      // Redirect to order confirmation
      navigate(`/orders/${data.id}`, { 
        state: { 
          orderSuccess: true,
          orderId: data.id
        } 
      });

    } catch (error) {
      console.error('Order creation failed:', error);
      setStatusMessage({
        type: 'error',
        message: 'Failed to place order. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.loading) {
    return (
      <div className="bg-[#E0E7D7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A5D23] mx-auto mb-4"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#E0E7D7]">
        <div className="bg-green-800 py-8"></div>
        <div className='py-40 flex items-center justify-center'>
          <div className="max-w-3xl mx-auto text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate('/all-products')}
              className="bg-[#4A5D23] text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5DC]">
      {/* Status message notification */}
      {statusMessage && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
          statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {statusMessage.message}
        </div>
      )}
      
      <div className="py-10 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Details Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-[#2C3639] mb-6">Shipping Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={shippingDetails.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={shippingDetails.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={shippingDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode*
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={shippingDetails.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                    />
                  </div>
                </div>
              </form>
            </div>
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
              <h2 className="text-2xl font-semibold text-[#2C3639] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-[#2C3639]">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.variant}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 hover:bg-gray-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        max="99"
                        className="w-12 text-center border rounded-lg py-1 px-2 focus:ring-2 focus:ring-[#4A5D23] focus:border-transparent"
                      />
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 hover:bg-gray-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors ml-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-medium text-[#4A5D23] text-right md:text-left ml-auto">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cart.summary.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{cart.summary.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#4A5D23]">₹{cart.summary.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !user}
                className="w-full mt-6 bg-green-800 text-white py-3 rounded-lg hover:bg-[#3A4D13] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : !user ? (
                  <>Please Login to Checkout</>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Pay
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};