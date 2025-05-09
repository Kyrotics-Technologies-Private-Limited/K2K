// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Star, ShoppingCart, CreditCard, Minus, Plus } from "lucide-react";
// import { Product } from "../../types";
// import { Variant } from "../../types/variant";
// import { CartItem } from "../../types/cart";
// import { useAppDispatch } from "../../store/store";
// import { addToCart } from "../../store/slices/cartSlice";
// import VariantApi from "../../services/api/variantApi";

// interface ProductCardProps {
//   product: Product;
//   cartItem?: CartItem | null;
//   variant?: Variant;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [variants, setVariants] = useState<Variant[]>([]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

//   useEffect(() => {
//     const fetchProductVariants = async () => {
//       try {
//         setLoading(true);
//         console.log("Fetching variants for product ID:", product.id);
//         const data = await VariantApi.getProductVariants(product.id);
//         console.log("Fetched variants:", data);
//         setVariants(data);
        
//         // Set the first variant as selected by default
//         if (data && data.length > 0) {
//           console.log("Setting default variant:", data[0]);
//           setSelectedVariant(data[0]);
//         } else {
//           console.warn("No variants found for product:", product.id);
//         }
        
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching product variants:", err);
//         setError("Failed to load product variants. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductVariants();
//   }, [product.id]);

//   const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     console.log("Navigating to product page:", product.id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     // navigate(`/product/${product.id}`);
//   };

//   const handleQuantityDecrement = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("Decreasing quantity from:", quantity);
//     setQuantity(prev => Math.max(1, prev - 1));
//   };

//   const handleQuantityIncrement = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("Increasing quantity from:", quantity);
//     setQuantity(prev => prev + 1);
//   };

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!selectedVariant) {
//       console.error("Cannot add to cart: No variant selected");
//       return;
//     }

//     console.log("--- Add to Cart Debug Info ---");
//     console.log("Product ID:", product.id);
//     console.log("Product Name:", product.name);
//     console.log("Selected Variant ID:", selectedVariant.id);
//     console.log("Selected Variant Details:", selectedVariant);
//     console.log("Quantity:", quantity);
//     console.log("-----------------------------");

//     setIsAddingToCart(true);
//     try {
//       console.log("Dispatching addToCart with:", {
//         productId: product.id,
//         variantId: selectedVariant.id,
//         quantity: quantity
//       });

//       const result = await dispatch(
//         addToCart({
//           productId: product.id,
//           variantId: selectedVariant.id,
//           quantity: quantity,
//         })
//       ).unwrap();
      
//       console.log("Add to cart successful, result:", result);
      
//       // Reset quantity after adding to cart
//       setQuantity(1);
//     } catch (error) {
//       console.error("Failed to add item to cart:", error);
//       console.error("Error details:", JSON.stringify(error, null, 2));
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleBuyNow = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!selectedVariant) {
//       console.error("Cannot buy now: No variant selected");
//       return;
//     }
    
//     console.log("Buy Now clicked with product ID:", product.id, "variant ID:", selectedVariant.id);
    
//     // Add to cart first, then navigate to checkout
//     dispatch(
//       addToCart({
//         productId: product.id,
//         variantId: selectedVariant.id,
//         quantity: quantity,
//       })
//     );
//     navigate("/checkout");
//   };

//   if (loading) {
//     return (
//       <div className="bg-white border-0.5 border-grey-50 rounded-md shadow-md p-4 h-full flex items-center justify-center">
//         <div className="animate-pulse text-sm text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   if (error || !selectedVariant) {
//     console.error("Rendering error state:", error || "No variant available");
//     return (
//       <div className="bg-white border-0.5 border-grey-50 rounded-md shadow-md p-4 h-full">
//         <p className="text-sm text-red-500">{error || "Variant not available"}</p>
//       </div>
//     );
//   }

//   const calculateDiscountPrice = (originalPrice: number, discountPercentage: number = 20) => {
//     return originalPrice * (1 - discountPercentage / 100);
//   };

//   const basePrice = selectedVariant.price;
//   const discountedPrice = calculateDiscountPrice(basePrice);

//   console.log("Rendering ProductCard with:", {
//     productId: product.id,
//     productName: product.name,
//     selectedVariantId: selectedVariant.id,
//     basePrice,
//     discountedPrice,
//     quantity
//   });

//   return (
//     <Link
//       to={`/product/${product.id}`}
//       onClick={handleProductClick}
//       className="group bg-white border-0.5 border-grey-50 rounded-md shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative w-full"
//     >
//       <div className="aspect-[39/37] overflow-hidden relative">
//         <img
//           src={product.images.main}
//           alt={product.name}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           loading="lazy"
//         />
//         <div className="absolute top-1.5 left-1.5 flex gap-0.5">
//           <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/90 text-[#4A5D23]">
//             {product.category}
//           </span>
//           {product.ratings >= 4.5 && (
//             <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F8D7A8] text-[#A05E2B]">
//               Best Seller
//             </span>
//           )}
//         </div>

//         <div className="absolute bottom-1.5 right-1.5 bg-white shadow rounded-md p-0.5 flex items-center gap-0.5 z-10">
//           <button
//             onClick={handleQuantityDecrement}
//             className="w-5 h-5 flex items-center justify-center hover:bg-gray-100"
//           >
//             <Minus className="w-2.5 h-2.5 text-[#4A5D23]" />
//           </button>
//           <span className="w-4 text-center text-xs font-medium text-[#4A5D23]">
//             {quantity}
//           </span>
//           <button
//             onClick={handleQuantityIncrement}
//             className="w-5 h-5 flex items-center justify-center hover:bg-gray-100"
//           >
//             <Plus className="w-2.5 h-2.5 text-[#4A5D23]" />
//           </button>
//         </div>
//       </div>

//       <div className="px-3 py-4">
//         <h3 className="text-sm font-semibold text-[#2C3639] mb-1 line-clamp-1">
//           {product.name}
//         </h3>
//         <p className="text-gray-600 text-[10px] mb-2 line-clamp-2">
//           {product.description}
//         </p>

//         <div className="flex items-start justify-between mb-2">
//           <div className="flex flex-col">
//             <div className="flex items-baseline gap-1.5">
//               <span className="text-base font-bold text-black">
//                 ₹{discountedPrice.toLocaleString("en-IN")}
//               </span>
//               <span className="text-xs line-through text-gray-500">
//                 ₹{basePrice.toLocaleString("en-IN")}
//               </span>
//               <span className="text-xs text-green-800">20% off</span>
//             </div>
//             {product.stockStatus === "out_of_stock" && (
//               <span className="text-[10px] text-red-500 font-medium">
//                 Out of Stock
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-0.5">
//             <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
//             <span className="text-[10px] font-medium">{product.ratings}</span>
//           </div>
//         </div>

//         <div className="flex gap-1">
//           {product.stockStatus === "out_of_stock" ? (
//             <button
//               disabled
//               className="w-full bg-gray-100 text-gray-500 py-1 rounded text-[10px] flex items-center justify-center"
//             >
//               Currently Unavailable
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isAddingToCart}
//                 className="flex-1 bg-white border border-[#0d6b1e] text-green-800 py-1.5 rounded hover:bg-green-800 hover:text-white transition-colors text-xs flex items-center justify-center gap-0.5"
//               >
//                 {isAddingToCart ? (
//                   <span className="animate-pulse">Adding...</span>
//                 ) : (
//                   <>
//                     <ShoppingCart className="w-4 h-4" />
//                     Add
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 disabled={isAddingToCart}
//                 className="flex-1 bg-[#0d6b1e] text-white py-1.5 rounded hover:bg-[#3A4D13] transition-colors text-xs flex items-center justify-center gap-0.5"
//               >
//                 <CreditCard className="w-4 h-4" />
//                 Buy
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, CreditCard, Minus, Plus } from "lucide-react";
import { Product } from "../../types";
import { Variant } from "../../types/variant";
import { CartItem } from "../../types/cart";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addToCart, createCart } from "../../store/slices/cartSlice";
import VariantApi from "../../services/api/variantApi";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem | null;
  variant?: Variant;
  onAddToCart?: () => void; // New prop to handle cart drawer opening
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { activeCartId } = useAppSelector(state => state.cart);
  // console.log('a')
  
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        setLoading(true);
        console.log("Fetching variants for product ID:", product.id);
        const data = await VariantApi.getVariantsByProductId(product.id);
        console.log("Fetched variants:", data);
        setVariants(data);
        
        // Set the first variant as selected by default
        if (data && data.length > 0) {
          console.log("Setting default variant:", data[0]);
          setSelectedVariant(data[0]);
        } else {
          console.warn("No variants found for product:", product.id);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching product variants:", err);
        setError("Failed to load product variants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductVariants();
  }, [product.id]);

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Navigating to product page:", product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`);
  };

  const handleQuantityDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Decreasing quantity from:", quantity);
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Increasing quantity from:", quantity);
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedVariant) {
      console.error("Cannot add to cart: No variant selected");
      return;
    }

    // Create a cart if one doesn't exist
    let cartId = activeCartId;
    if (!cartId) {
      console.log("No active cart, creating one first");
      try {
        const newCart = await dispatch(createCart()).unwrap();
        console.log('new cart',newCart)
        activeCartId = newCart.id;
        console.log("New cart created:", cartId);
      } catch (error) {
        console.error("Failed to create cart:", error);
        return;
      }
    }
    
    console.log("--- Add to Cart Debug Info ---");
    console.log("Product ID:", product.id);
    console.log("Product Name:", product.name);
    console.log("Selected Variant ID:", selectedVariant.id);
    console.log("Selected Variant Details:", selectedVariant);
    console.log("Quantity:", quantity);
    console.log("Cart ID:", activeCartId);
    console.log("-----------------------------");

    setIsAddingToCart(true);
    try {
      // Prepare item data based on new API structure
      const itemData = {
        productId: product.id,
        variantId: selectedVariant.id,
        quantity: quantity,
        // price: selectedVariant.price
      };

      console.log("Dispatching addToCart with:", {
        cartId: activeCartId,
        itemData
      });

      const result = await dispatch(
        addToCart({
          cartId: activeCartId!, 
          itemData
        })
      ).unwrap();
      
      console.log("Add to cart successful, result:", result);
      
      // Call onAddToCart to open the cart drawer
      if (onAddToCart) {
        onAddToCart();
      }
      
      // Reset quantity after adding to cart
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedVariant || !activeCartId) {
      console.error("Cannot buy now: No variant selected or no active cart");
      return;
    }
    
    console.log("Buy Now clicked with product ID:", product.id, "variant ID:", selectedVariant.id);
    
    // Prepare item data
    const itemData = {
      productId: product.id,
      variantId: selectedVariant.id,
      quantity: quantity,
      price: selectedVariant.price
    };
    
    // Add to cart first, then navigate to checkout
    dispatch(
      addToCart({
        cartId: activeCartId,
        itemData
      })
    );
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="bg-white border-0.5 border-grey-50 rounded-md shadow-md p-4 h-full flex items-center justify-center">
        <div className="animate-pulse text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error ) {
    console.error("Rendering error state:", error || "No variant available");
    return (
      <div className="bg-white border-0.5 border-grey-50 rounded-md shadow-md p-4 h-full">
        <p className="text-sm text-red-500">{error || "Variant not available"}</p>
      </div>
    );
  }

  // const calculateDiscountPrice = (originalPrice: number, discountPercentage: number = 20) => {
  //   return originalPrice * (1 - discountPercentage / 100);
  // };
    
    const basePrice = selectedVariant?.originalPrice || 0;
    const discountedPrice = selectedVariant?.price || 0;

  // console.log("Rendering ProductCard with:", {
  //   productId: product.id,
  //   productName: product.name,
  //   selectedVariantId: selectedVariant!.id,
  //   basePrice,
  //   discountedPrice,
  //   quantity
  // });

  return (
    <Link
      to={`/product/${product.id}`}
      onClick={handleProductClick}
      className="group bg-white border-0.5 border-grey-50 rounded-md shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative w-full"
    >
      <div className="aspect-[39/37] overflow-hidden relative">
        <img
          src={product.images.main}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-1.5 left-1.5 flex gap-0.5">
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/90 text-[#4A5D23]">
            {product.category}
          </span>
          {product.ratings >= 4.5 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F8D7A8] text-[#A05E2B]">
              Best Seller
            </span>
          )}
        </div>

        <div className="absolute bottom-1.5 right-1.5 bg-white shadow rounded-md p-0.5 flex items-center gap-0.5 z-10">
          <button
            onClick={handleQuantityDecrement}
            className="w-5 h-5 flex items-center justify-center hover:bg-gray-100"
          >
            <Minus className="w-2.5 h-2.5 text-[#4A5D23]" />
          </button>
          <span className="w-4 text-center text-xs font-medium text-[#4A5D23]">
            {quantity}
          </span>
          <button
            onClick={handleQuantityIncrement}
            className="w-5 h-5 flex items-center justify-center hover:bg-gray-100"
          >
            <Plus className="w-2.5 h-2.5 text-[#4A5D23]" />
          </button>
        </div>
      </div>

      <div className="px-3 py-4">
        <h3 className="text-sm font-semibold text-[#2C3639] mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-[10px] mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-black">
                ₹{discountedPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xs line-through text-gray-500">
                ₹{basePrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-green-800">{selectedVariant?.discount} off</span>
            </div>
            {product.stockStatus === "out_of_stock" && (
              <span className="text-[10px] text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
            <span className="text-[10px] font-medium">{product.ratings}</span>
          </div>
        </div>

        <div className="flex gap-1">
          {product.stockStatus === "out_of_stock" ? (
            <button
              disabled
              className="w-full bg-gray-100 text-gray-500 py-1 rounded text-[10px] flex items-center justify-center"
            >
              Currently Unavailable
            </button>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                // disabled={isAddingToCart || !activeCartId}
                className="flex-1 bg-white border border-[#0d6b1e] text-green-800 py-1.5 rounded hover:bg-green-800 hover:text-white transition-colors text-xs flex items-center justify-center gap-0.5"
              >
                {isAddingToCart ? (
                  <span className="animate-pulse">Adding...</span>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isAddingToCart || !activeCartId}
                className="flex-1 bg-[#0d6b1e] text-white py-1.5 rounded hover:bg-[#3A4D13] transition-colors text-xs flex items-center justify-center gap-0.5"
              >
                <CreditCard className="w-4 h-4" />
                Buy
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};