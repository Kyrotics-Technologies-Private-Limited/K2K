import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, CreditCard, Minus, Plus } from "lucide-react";
import { Product } from "../../types";
import { Variant } from "../../types/variant";
import { CartItem } from "../../types/cart";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addToCart, createCart } from "../../store/slices/cartSlice";
import VariantApi from "../../services/api/variantApi";
import { toast } from "react-toastify";

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
        const data = await VariantApi.getVariantsByProductId(product.id);
        setVariants(data);
        
        if (data && data.length > 0) {
          setSelectedVariant(data[0]);
        }
        
        setError(null);
      } catch (err) {
        setError("Failed to load product variants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductVariants();
  }, [product.id]);

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`);
  };

  const handleQuantityDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedVariant) {
      console.error("Cannot add to cart: No variant selected");
      return;
    }

    let cartId = activeCartId;
    if (!cartId) {
      try {
        const newCart = await dispatch(createCart()).unwrap();
        activeCartId = newCart.id;
      } catch (error) {
        console.error("Failed to create cart:", error);
        return;
      }
    }

    setIsAddingToCart(true);
    try {
      const itemData = {
        productId: product.id,
        variantId: selectedVariant.id,
        quantity: quantity,
      };

      const result = await dispatch(
        addToCart({
          cartId: activeCartId!,
          itemData
        })
      ).unwrap();

      toast.success(
        <div className="flex items-center gap-3">
          <img 
            src={product.images.main} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium mb-2">Added to Cart!</h3>
            <p className="text-sm text-gray-600">{product.name}</p>
            <div className="text-sm mt-2">
              <span className="text-green-600">Qty: {quantity}</span>
              <span className="mx-2">|</span>
              <span>₹{(selectedVariant.price * quantity).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      
      if (onAddToCart) {
        onAddToCart();
      }
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
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
    
    const itemData = {
      productId: product.id,
      variantId: selectedVariant.id,
      quantity: quantity,
      price: selectedVariant.price
    };
    
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

  if (error) {
    return (
      <div className="bg-white border-0.5 border-grey-50 rounded-md shadow-md p-4 h-full">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const basePrice = selectedVariant?.originalPrice || 0;
  const discountedPrice = selectedVariant?.price || 0;

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