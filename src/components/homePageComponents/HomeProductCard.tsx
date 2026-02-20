import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "../../types";
import { Variant } from "../../types/variant";
import { CartItem } from "../../types/cart";
// import { useAppDispatch, useAppSelector } from "../../store/store";
// import { addToCart, createCart } from "../../store/slices/cartSlice";
import VariantApi from "../../services/api/variantApi";
import { reviewApi } from "../../services/api/reviewApi";
// import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem | null;
  variant?: Variant;
  onAddToCart?: () => void; // New prop to handle cart drawer opening
}

export const HomeProductCard: React.FC<ProductCardProps> = ({ product, }) => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // let { activeCartId } = useAppSelector(state => state.cart);

  //   const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  // const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        setLoading(true);
        const data = await VariantApi.getVariantsByProductId(product.id);
        setVariants(data);

        // Variants loaded successfully

        setError(null);
      } catch (err) {
        setError("Failed to load product variants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductVariants();
  }, [product.id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await reviewApi.getProductReviews(product.id);
        if (reviews.length > 0) {
          const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
          setAverageRating(avg);
        } else {
          setAverageRating(product.ratings ?? 0);
        }
      } catch (err) {
        setAverageRating(product.ratings ?? 0);
      }
    };
    fetchReviews();
  }, [product.id, product.ratings]);

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`);
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

  const lowestPriceVariant = variants.length > 0
    ? variants.reduce((min, v) => (v.price < min.price ? v : min), variants[0])
    : null;

  const imageSrc = product?.images?.main ?? product?.images?.gallery?.[0] ?? "";

  if (!product) return null;

  return (
    <div className="group bg-white border-0.5 border-grey-50 rounded-md shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative w-full h-full flex flex-col min-h-0">
      <Link
        to={`/product/${product.id}`}
        onClick={handleProductClick}
        className="flex flex-col h-full"
      >
        <div className="aspect-[39/37] overflow-hidden relative flex-shrink-0">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name ?? "Product"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
          {/* Show lowest price variant info */}
          {lowestPriceVariant && (
            <div className="text-xs text-gray-600 mb-1">
              {lowestPriceVariant.weight}
            </div>
          )}
          <div className="absolute top-1.5 left-1.5 flex gap-0.5">
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/90 text-[#4A5D23]">
              {product.category}
            </span>
            {(product.isBestseller || averageRating >= 4.5) && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F8D7A8] text-[#A05E2B] font-semibold">
                🏆 Best Seller
              </span>
            )}
          </div>

          {/* <div className="absolute bottom-1.5 right-1.5 bg-white shadow rounded-md p-0.5 flex items-center gap-0.5 z-10">
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
        </div> */}
        </div>

        <div className="px-3 py-4 flex-1 flex flex-col min-h-0">
          <h3 className="text-sm font-semibold text-[#2C3639] mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-[10px] mb-2 line-clamp-2 min-h-[2rem]">
            {product.description}
          </p>

          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-black">
                  ₹{lowestPriceVariant ? lowestPriceVariant.price.toLocaleString("en-IN") : "-"}
                </span>
                {lowestPriceVariant?.originalPrice && (
                  <span className="text-xs line-through text-gray-500">
                    ₹{lowestPriceVariant.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {lowestPriceVariant?.discount && (
                  <span className="text-xs text-green-800">{lowestPriceVariant.discount}% off</span>
                )}
              </div>
              {product.stockStatus === "out_of_stock" && (
                <span className="text-[10px] text-red-500 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
              <span className="text-[10px] font-medium">
                {averageRating > 0 ? averageRating.toFixed(1) : (product.ratings ?? 0)}
              </span>
            </div>
          </div>

          {/* <div className="flex gap-1">
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
        </div> */}
        </div>
      </Link>
    </div>
  );
};