// import React, { useState } from "react";
// import {
//   ChevronLeft,
//   ShoppingCart,
//   ChevronRight,
//   CreditCard,
//   Star,
//   Heart,
//   X,
//   Info,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import { ProductCard } from "./ProductCard";
// import { useNavigate } from "react-router-dom";
// import { Product } from "../../types";
// import { ProductBadges } from "./Productbadge";
// import { BenefitsBanner } from "./InformationBanner";
// import { HealthBenefits } from "./HealthBenefits";
// import RecognizedBy from "../RecognizedBy";

// interface ProductDetailProps {
//   product: Product | undefined;
//   relatedProducts: Product[];
// }

// export const ProductDetail: React.FC<ProductDetailProps> = ({
//   product,
//   relatedProducts,
// }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [showPricePopup, setShowPricePopup] = useState(false);
//   const { state, dispatch } = useCart();
//   const navigate = useNavigate();

//   // Get current cart item if it exists
//   const cartItem = state.items.find(
//     (item) =>
//       item?.id === product?.id && item.selectedVariant === selectedVariant
//   );

//   // Removed unused cartQuantity variable

//   // Fixed: Added null check for product
//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <p>Product not found</p>
//       </div>
//     );
//   }

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     dispatch({
//       type: "ADD_ITEM",
//       payload: {
//         ...product,
//         quantity: quantity, // FIXED: Use the state quantity instead of cartQuantity
//         selectedVariant: selectedVariant,
//       },
//     });
//   };

//   const handleBuyNow = (e: React.MouseEvent) => {
//     e.preventDefault();
//     dispatch({
//       type: "ADD_ITEM",
//       payload: {
//         ...product,
//         quantity: quantity,
//         selectedVariant: selectedVariant,
//       },
//     });
//     navigate("/checkout");
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative aspect-square rounded-lg overflow-hidden">
//               <img
//                 src={product.images.gallery[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={() =>
//                   setSelectedImage((prev) =>
//                     prev === 0 ? product.images.gallery.length - 1 : prev - 1
//                   )
//                 }
//                 className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() =>
//                   setSelectedImage((prev) =>
//                     prev === product.images.gallery.length - 1 ? 0 : prev + 1
//                   )
//                 }
//                 className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {product.images.gallery.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
//                     selectedImage === index ? "ring-2 ring-green-800" : ""
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {product.name}
//               </h1>
//               <div className="flex items-center mt-2 space-x-2">
//                 <div className="flex items-center">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-5 h-5 ${
//                         i < Math.floor(product.ratings)
//                           ? "fill-yellow-400 stroke-yellow-400"
//                           : "stroke-gray-300"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   ({product.reviews} reviews)
//                 </span>
//               </div>
//             </div>

//             <ProductBadges product={product} />

//             <div>
//               <h2 className="text-xl font-semibold mb-4">Select Variant</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
//                 {product.price.variants.map((variant, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedVariant(index)}
//                     className={`flex flex-col items-start p-3 rounded-lg w-full ${
//                       selectedVariant === index
//                         ? "bg-green-800 text-white"
//                         : "bg-gray-50 hover:bg-gray-100"
//                     } ${
//                       !variant.inStock || product.stockStatus === "out_of_stock"
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     disabled={
//                       !variant.inStock || product.stockStatus === "out_of_stock"
//                     }
//                   >
//                     <div className="flex flex-col items-start w-full">
//                       <div className="flex justify-between w-full items-start">
//                         <span
//                           className={`text-sm font-medium ${
//                             selectedVariant === index
//                               ? "text-white"
//                               : "text-gray-900"
//                           } mb-1`}
//                         >
//                           {variant.weight}
//                         </span>
//                       </div>
//                       <div className="flex flex-wrap items-baseline gap-1 mb-1">
//                         <span
//                           className={`text-lg font-bold ${
//                             selectedVariant === index
//                               ? "text-white"
//                               : "text-gray-900"
//                           }`}
//                         >
//                           ₹{variant.price.toLocaleString("en-IN")}
//                         </span>
//                         {variant.originalPrice && (
//                           <span
//                             className={`text-xs line-through ${
//                               selectedVariant === index
//                                 ? "text-gray-200"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             ₹{variant.originalPrice.toLocaleString("en-IN")}
//                           </span>
//                         )}
//                         {variant.discount && (
//                           <span
//                             className={`text-xs ${
//                               selectedVariant === index
//                                 ? "text-white"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {variant.discount}% off
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-baseline gap-2">
//                 <div className="flex flex-row gap-4 relative">
//                   <span className="text-4xl font-bold text-black">
//                     ₹
//                     {product.price.variants[
//                       selectedVariant
//                     ].price.toLocaleString("en-IN")}
//                   </span>
//                   <span className="text-lg font-bold text-gray-500 line-through pt-2">
//                     ₹
//                     {(
//                       product.price.variants[selectedVariant].price * 1.2
//                     ).toLocaleString("en-IN")}
//                   </span>
//                   <span className="text-lg font-bold text-gray-500 pt-2">
//                     <p className="text-green-800">Save 20%</p>
//                   </span>
//                   <div className="relative">
//                     {/* <button
//                         onClick={() => setShowPricePopup(true)}
//                         className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-800 transition-colors"
//                       >
//                         Know Your Price!
//                       </button> */}

//                     <button
//                       onClick={() => setShowPricePopup(true)}
//                       className="flex items-center gap-2 pt-2 hover:text-green-800"
//                     >
//                       Know your price
//                       <Info />
//                     </button>
//                     {showPricePopup && (
//                       <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-50">
//                         <button
//                           onClick={() => setShowPricePopup(false)}
//                           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>

//                         <h2 className="text-lg font-bold text-gray-800 mb-3">
//                           Price Details
//                         </h2>

//                         <div className="space-y-3">
//                           <div className="flex justify-between items-center border-b pb-2">
//                             <span className="text-sm text-gray-600">
//                               Original Price
//                             </span>
//                             <span className="text-sm font-semibold text-gray-500 line-through">
//                               ₹
//                               {(
//                                 product.price.variants[selectedVariant].price *
//                                 1.2
//                               ).toLocaleString("en-IN")}
//                             </span>
//                           </div>

//                           <div className="flex justify-between items-center border-b pb-2">
//                             <span className="text-sm text-gray-600">
//                               Discount
//                             </span>
//                             <span className="text-sm font-semibold text-green-800">
//                               20% OFF
//                             </span>
//                           </div>

//                           <div className="flex justify-between items-center border-b pb-2">
//                             <span className="text-sm text-gray-600">
//                               Final Price
//                             </span>
//                             <span className="text-base font-bold text-green-800">
//                               ₹
//                               {product.price.variants[
//                                 selectedVariant
//                               ].price.toLocaleString("en-IN")}
//                             </span>
//                           </div>

//                           <div className="mt-2 text-xs text-gray-600">
//                             <p className="font-semibold mb-1">
//                               Why this price?
//                             </p>
//                             <ul className="list-disc list-inside space-y-1">
//                               <li>Direct sourcing from farmers</li>
//                               <li>Minimal processing costs</li>
//                               <li>No middlemen</li>
//                               <li>Bulk purchase discounts</li>
//                               <li>Special promotional offer</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3">
//               {/* <h2 className="text-xl font-semibold mb-2">Quantity</h2> */}
//               <div className="flex border border-gray-300 rounded-xl">
//                 <button
//                   onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                   className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl font-medium w-12 text-center mt-1">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                   className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>

//               {product.stockStatus === "out_of_stock" ? (
//                 <div className="flex-1 bg-gray-100 rounded-lg p-4 text-center">
//                   <p className="text-gray-600 font-medium">
//                     Currently Out of Stock
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Please check back later or contact us for availability
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleAddToCart}
//                     className="flex-1 bg-white border-2 border-green-800 text-green-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0d6b1e] hover:text-white transition-all duration-300"
//                     disabled={!product.price.variants[selectedVariant].inStock}
//                   >
//                     <ShoppingCart className="w-5 h-5" />
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={handleBuyNow}
//                     className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
//                     disabled={!product.price.variants[selectedVariant].inStock}
//                   >
//                     <CreditCard className="w-5 h-5" />
//                     Buy Now
//                   </button>
//                 </>
//               )}
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold mb-2">Description</h2>
//               <p className="text-gray-600">{product.description}</p>
//             </div>

//             {/* <div>
//                 <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
//                 <ul className="list-disc list-inside text-gray-600">
//                   {product.ingredients.map((ingredient, index) => (
//                     <li key={index}>{ingredient}</li>
//                   ))}
//                 </ul>
//               </div> */}
//           </div>
//         </div>

//         {/* Benefits Banner */}
//         <BenefitsBanner product={product} />

//         {/* Health Benefits */}
//         <HealthBenefits product={product} />

//         {/* Related Products */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">
//             Related Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {relatedProducts.slice(0, 4).map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className=" pt-4">
//         <RecognizedBy />
//       </div>
//     </div>
//   );
// };


import React, { useState } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  ChevronRight,
  CreditCard,
  Star,
  Heart,
  X,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { ProductBadges } from "./Productbadge";
import { BenefitsBanner } from "./InformationBanner";
import { HealthBenefits } from "./HealthBenefits";
import RecognizedBy from "../homePageComponents/RecognizedBy";
import cartApi from "../../services/api/cartApi";

interface ProductDetailProps {
  product: Product | undefined;
  relatedProducts: Product[];
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  relatedProducts,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showPricePopup, setShowPricePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Use the cartApi to add the item to the cart
      await cartApi.addItem(
        product.id, 
        selectedVariant.toString(), // Assuming variant_id is the index as a string
        quantity
      );
      
      setSuccess("Item added to cart successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item to cart");
      console.error("Failed to add item to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Add to cart first
      await cartApi.addItem(
        product.id, 
        selectedVariant.toString(), 
        quantity
      );
      
      // Then navigate to checkout
      navigate("/checkout");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process buy now");
      console.error("Failed to process buy now:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Status messages */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-4">
            {success}
          </div>
        )}
        
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
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === 0 ? product.images.gallery.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === product.images.gallery.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
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
                    selectedImage === index ? "ring-2 ring-green-800" : ""
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
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratings)
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-gray-300"
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
              <h2 className="text-xl font-semibold mb-4">Select Variant</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {product.price.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`flex flex-col items-start p-3 rounded-lg w-full ${
                      selectedVariant === index
                        ? "bg-green-800 text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    } ${
                      !variant.inStock || product.stockStatus === "out_of_stock"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      !variant.inStock || product.stockStatus === "out_of_stock"
                    }
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex justify-between w-full items-start">
                        <span
                          className={`text-sm font-medium ${
                            selectedVariant === index
                              ? "text-white"
                              : "text-gray-900"
                          } mb-1`}
                        >
                          {variant.weight}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-1 mb-1">
                        <span
                          className={`text-lg font-bold ${
                            selectedVariant === index
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          ₹{variant.price.toLocaleString("en-IN")}
                        </span>
                        {variant.originalPrice && (
                          <span
                            className={`text-xs line-through ${
                              selectedVariant === index
                                ? "text-gray-200"
                                : "text-gray-500"
                            }`}
                          >
                            ₹{variant.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {variant.discount && (
                          <span
                            className={`text-xs ${
                              selectedVariant === index
                                ? "text-white"
                                : "text-red-600"
                            }`}
                          >
                            {variant.discount}% off
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <div className="flex flex-row gap-4 relative">
                  <span className="text-4xl font-bold text-black">
                    ₹
                    {product.price.variants[
                      selectedVariant
                    ].price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-lg font-bold text-gray-500 line-through pt-2">
                    ₹
                    {(
                      product.price.variants[selectedVariant].price * 1.2
                    ).toLocaleString("en-IN")}
                  </span>
                  <span className="text-lg font-bold text-gray-500 pt-2">
                    <p className="text-green-800">Save 20%</p>
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowPricePopup(true)}
                      className="flex items-center gap-2 pt-2 hover:text-green-800"
                    >
                      Know your price
                      <Info />
                    </button>
                    {showPricePopup && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-50">
                        <button
                          onClick={() => setShowPricePopup(false)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <h2 className="text-lg font-bold text-gray-800 mb-3">
                          Price Details
                        </h2>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm text-gray-600">
                              Original Price
                            </span>
                            <span className="text-sm font-semibold text-gray-500 line-through">
                              ₹
                              {(
                                product.price.variants[selectedVariant].price *
                                1.2
                              ).toLocaleString("en-IN")}
                            </span>
                          </div>

                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm text-gray-600">
                              Discount
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                              20% OFF
                            </span>
                          </div>

                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm text-gray-600">
                              Final Price
                            </span>
                            <span className="text-base font-bold text-green-800">
                              ₹
                              {product.price.variants[
                                selectedVariant
                              ].price.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-gray-600">
                            <p className="font-semibold mb-1">
                              Why this price?
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Direct sourcing from farmers</li>
                              <li>Minimal processing costs</li>
                              <li>No middlemen</li>
                              <li>Bulk purchase discounts</li>
                              <li>Special promotional offer</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex border border-gray-300 rounded-xl">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center bg-gray-100"
                  disabled={loading}
                >
                  -
                </button>
                <span className="text-xl font-medium w-12 text-center mt-1">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center bg-gray-100"
                  disabled={loading}
                >
                  +
                </button>
              </div>

              {product.stockStatus === "out_of_stock" ? (
                <div className="flex-1 bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-gray-600 font-medium">
                    Currently Out of Stock
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please check back later or contact us for availability
                  </p>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white border-2 border-green-800 text-green-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0d6b1e] hover:text-white transition-all duration-300"
                    disabled={!product.price.variants[selectedVariant].inStock || loading}
                  >
                    {loading ? (
                      "Adding..."
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
                    disabled={!product.price.variants[selectedVariant].inStock || loading}
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Buy Now
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Benefits Banner */}
        <BenefitsBanner product={product} />

        {/* Health Benefits */}
        <HealthBenefits product={product} />

        {/* Related Products */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-4">
        <RecognizedBy />
      </div>
    </div>
  );
};
