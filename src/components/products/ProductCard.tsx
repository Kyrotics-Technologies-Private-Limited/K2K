import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "../../types";
import { Variant } from "../../types/variant";
import { CartItem } from "../../types/cart";
// import { useAppDispatch, useAppSelector } from "../../store/store";
// import { addToCart, setBuyNowItem, clearBuyNowItem } from "../../store/slices/cartSlice";
// import { resetCheckout } from "../../store/slices/checkoutSlice";
import VariantApi from "../../services/api/variantApi";
// import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem | null;
  variant?: Variant;
  onAddToCart?: () => void; 
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, }) => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // let { activeCartId } = useAppSelector(state => state.cart);
  
  // const [, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  // const [quantity, setQuantity] = useState(1);
  // const [setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        setLoading(true);
        const data = await VariantApi.getVariantsByProductId(product.id);
        setVariants(data);
        
        // if (data && data.length > 0) {
        //   setSelectedVariant(data[0]);
        // }
        
        setError(null);
      } catch (err) {
        setError("Failed to load product variants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductVariants();
  }, [product.id]);

  // GST helpers: no membership here; show regular price including GST
  const applyGst = (amount: number, gstPercentage?: number) => {
    const gst = gstPercentage ?? 0;
    return Math.floor(amount + (amount * gst) / 100);
  };

  const getRegularPriceWithGST = (regularPrice: number, gstPercentage?: number) =>
    applyGst(regularPrice, gstPercentage);

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

  // Find the variant with the lowest GST-inclusive regular price
  const lowestPriceVariant = variants.length > 0
    ? variants.reduce((min, v) => {
        const vPrice = getRegularPriceWithGST(v.price, v.gstPercentage);
        const mPrice = min ? getRegularPriceWithGST(min.price, min.gstPercentage) : Number.POSITIVE_INFINITY;
        return vPrice < mPrice ? v : min;
      }, variants[0])
    : null;

  const imageSrc = product?.images?.main ?? product?.images?.gallery?.[0] ?? "";

  if (!product) return null;

  return (
    <Link
      to={`/product/${product.id}`}
      onClick={handleProductClick}
      className="group bg-white border-0.5 border-grey-50 rounded-md shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative w-full"
    >
      <div className="aspect-[39/37] overflow-hidden relative">
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
      </div>

      <div className="px-3 py-4">
        {/* Show product name */}
        <h3 className="text-sm font-semibold text-[#2C3639] mb-1 line-clamp-1">
          {product.name}
        </h3>
        {/* Show lowest price variant info */}
        {lowestPriceVariant && (
          <div className="text-xs text-gray-600 mb-1">
            {lowestPriceVariant.weight}
          </div>
        )}
        <p className="text-gray-600 text-[10px] mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-black">
                ₹{lowestPriceVariant ? getRegularPriceWithGST(
                  lowestPriceVariant.price,
                  lowestPriceVariant.gstPercentage
                ).toLocaleString("en-IN") : "-"}
              </span>
              {lowestPriceVariant?.originalPrice && (
                <span className="text-xs line-through text-gray-500">
                  ₹{getRegularPriceWithGST(
                    lowestPriceVariant.originalPrice,
                    lowestPriceVariant.gstPercentage
                  ).toLocaleString("en-IN")}
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
            <span className="text-[10px] font-medium">{product.ratings}</span>
          </div>
        </div>
        {/* No Add/Buy buttons here */}
      </div>
    </Link>
  );
};