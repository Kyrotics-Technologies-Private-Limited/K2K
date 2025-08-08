import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  ChevronRight,
  CreditCard,
  Star,
  Info,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { ProductBadges } from "./Productbadge";
import { BenefitsBanner } from "./InformationBanner";
import { HealthBenefits } from "./HealthBenefits";
import RecognizedBy from "../homePageComponents/RecognizedBy";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addToCart,
  setBuyNowItem,
  clearBuyNowItem,
} from "../../store/slices/cartSlice";
import VariantApi from "../../services/api/variantApi";
import { Variant } from "../../types/variant";
import { toast } from "react-toastify";
import { resetCheckout } from "@/store/slices/checkoutSlice";
import { useAuth } from "../../context/AuthContext";
import PhoneAuth from "../authComponents/PhoneAuth";
import { AuthProvider } from "../../context/AuthContext";
import { membershipApi } from "../../services/api/membershipApi";
import { MembershipStatus, MembershipSettings } from "../../types/membership";

interface ProductDetailProps {
  product: Product | undefined;
  relatedProducts: Product[];
  onAddToCart?: () => void;
}

const ProductDetailContent: React.FC<ProductDetailProps> = ({
  product,
  relatedProducts,
  onAddToCart,
}) => {
  const dispatch = useAppDispatch();
  // const { activeCartId } = useAppSelector((state) => state.cart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showPricePopup, setShowPricePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // Membership state
  const [membershipStatus, setMembershipStatus] =
    useState<MembershipStatus | null>(null);
  const [kpSettings, setKPSettings] = useState<MembershipSettings | null>(null);

  useEffect(() => {
    async function fetchMembership() {
      if (user) {
        try {
          const status = await membershipApi.getStatus();
          setMembershipStatus(status);
        } catch {
          setMembershipStatus(null);
        }
      } else {
        setMembershipStatus(null);
      }
    }
    async function fetchSettings() {
      try {
        const settings = await membershipApi.getSettings();
        setKPSettings(settings);
      } catch {
        setKPSettings(null);
      }
    }
    fetchMembership();
    fetchSettings();
  }, [user]);

  useEffect(() => {
    const fetchVariants = async () => {
      if (!product) return;
      try {
        setLoading(true);
        const fetchedVariants = await VariantApi.getVariantsByProductId(
          product.id
        );
        const parseWeightOrVolume = (w: string) => {
          if (!w) return 0;
          const match = w.match(/([\d.]+)\s*(kg|g|mg|l|ml)/i);
          if (!match) return 0;
          let value = parseFloat(match[1]);
          let unit = match[2].toLowerCase();
          if (unit === "kg") value *= 1000;
          if (unit === "mg") value /= 1000;
          if (unit === "l") value *= 1000;
          return value;
        };
        const sortedVariants = [...fetchedVariants].sort(
          (a, b) =>
            parseWeightOrVolume(a.weight) - parseWeightOrVolume(b.weight)
        );
        setVariants(sortedVariants);
        setError(null);
      } catch (err) {
        console.error("Error fetching variants:", err);
        setError("Failed to load variants");
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, [product]);

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(0);
    }
  }, [variants]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const isMember = !!(
    membershipStatus?.isMember && membershipStatus.membershipEnd
  );
  const kpDiscount = kpSettings?.discountPercentage ?? 0;
  const getFinalPrice = (regularPrice: number) =>
    isMember && kpDiscount > 0
      ? Math.round(regularPrice - (regularPrice * kpDiscount) / 100)
      : regularPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!product || !variants[selectedVariant]) {
      setError("Cannot add to cart: No product or variant selected");
      return;
    }

    // Check stock availability before adding to cart
    const selectedVariantData = variants[selectedVariant];
    if (
      !selectedVariantData.inStock ||
      selectedVariantData.units_in_stock <= 0
    ) {
      setError("This variant is out of stock");
      return;
    }

    if (quantity > selectedVariantData.units_in_stock) {
      setError(
        `Only ${selectedVariantData.units_in_stock} units available in stock. Requested: ${quantity}`
      );
      return;
    }

    // Cart will be created automatically if it doesn't exist
    setAddingToCart(true);
    setError(null);
    try {
      await dispatch(
        addToCart({
          productId: product.id,
          variantId: variants[selectedVariant].id,
          quantity,
        })
      );

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
              <span className="text-green-600">
                {variants[selectedVariant].weight}
              </span>
              <span className="mx-2">|</span>
              <span className="text-green-600">Qty: {quantity}</span>
              <span className="mx-2">|</span>
              <span>
                ₹
                {(
                  getFinalPrice(variants[selectedVariant].price) * quantity
                ).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      if (onAddToCart) onAddToCart();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      // Handle stock validation errors from server
      if (err.message && err.message.includes("stock")) {
        setError(err.message);
      } else {
        setError("Failed to add item to cart");
      }
      console.error("Failed to add item to cart:", err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) setShowLoginModal(true);
    else {
      setShowLoginModal(false);
      handleAddToCart(e);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!product || !variants[selectedVariant]) {
      setError("Cannot proceed: Missing required information");
      return;
    }

    // Check stock availability before proceeding with buy now
    const selectedVariantData = variants[selectedVariant];
    if (
      !selectedVariantData.inStock ||
      selectedVariantData.units_in_stock <= 0
    ) {
      setError("This variant is out of stock");
      return;
    }

    if (quantity > selectedVariantData.units_in_stock) {
      setError(
        `Only ${selectedVariantData.units_in_stock} units available in stock. Requested: ${quantity}`
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const buyNowItem = {
        id: `${product.id}_${variants[selectedVariant].id}_${Date.now()}`,
        productId: product.id,
        variantId: variants[selectedVariant].id,
        quantity: quantity,
        product: product,
        variant: variants[selectedVariant],
      };
      await dispatch(
        addToCart({
          productId: product.id,
          variantId: variants[selectedVariant].id,
          quantity,
        })
      );
      dispatch(clearBuyNowItem());
      dispatch(resetCheckout());
      dispatch(setBuyNowItem(buyNowItem));
      sessionStorage.setItem(
        "buyNowRemoveFromCart",
        JSON.stringify({
          productId: product.id,
          variantId: variants[selectedVariant].id,
        })
      );
      navigate("/checkout");
    } catch (err: any) {
      // Handle stock validation errors from server
      if (err.message && err.message.includes("stock")) {
        setError(err.message);
      } else {
        setError("Failed to process buy now request");
      }
      console.error("Failed to process buy now:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) setShowLoginModal(true);
    else {
      setShowLoginModal(false);
      handleBuyNow(e);
    }
  };

  const handleUpdateQuantity = (direction: "increment" | "decrement") => {
    const stock = variants[selectedVariant]?.units_in_stock || 1;
    if (direction === "increment") {
      if (quantity >= stock) {
        toast.info(`Only ${stock} left in stock.`);
        return;
      }
      setQuantity((prev) => prev + 1);
    } else if (direction === "decrement") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

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
            <div className="flex gap-2 overflow-x-auto p-2">
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
                {product.name.replace(/^div/i, "").trim()}
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
              {variants.length === 0 ? (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-center">
                    No variants available for this product.
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    Please check back later or contact us for availability.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                  {variants.map((variant, index) => {
                    const discounted = getFinalPrice(variant.price);
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`button flex flex-col items-start p-3 rounded-lg w-full border-2 transition-all duration-200 ${
                          selectedVariant === index
                            ? "border-green-600 ring-2 ring-green-200 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        } ${
                          !variant.inStock || variant.units_in_stock <= 0
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        } bg-white`}
                        disabled={
                          !variant.inStock || variant.units_in_stock <= 0
                        }
                      >
                        <div className="flex flex-col w-full space-y-1">
                          <div className="flex justify-between w-full items-center">
                            <span
                              className={`text-sm font-medium ${
                                selectedVariant === index
                                  ? "text-green-800"
                                  : "text-gray-900"
                              }`}
                            >
                              {variant.weight}
                            </span>
                            {!variant.inStock && (
                              <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                                Out of stock
                              </span>
                            )}
                          </div>
                          {isMember && kpDiscount > 0 ? (
                            <div className="flex flex-wrap items-baseline gap-1">
                              <span className="text-lg font-bold text-green-800">
                                ₹{discounted.toLocaleString("en-IN")}
                              </span>
                              <span className="text-base font-medium text-gray-500 line-through">
                                ₹{variant.price.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs font-semibold bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                                {kpDiscount}% KP Member
                              </span>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-wrap items-baseline gap-1">
                                <span className="text-lg font-bold text-gray-900">
                                  ₹{variant.price.toLocaleString("en-IN")}
                                </span>
                                {variant.originalPrice && (
                                  <span className="text-sm line-through text-gray-500">
                                    ₹
                                    {variant.originalPrice.toLocaleString(
                                      "en-IN"
                                    )}
                                  </span>
                                )}
                                {variant.discount && (
                                  <span className="text-xs font-semibold bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
                                    {variant.discount}% off
                                  </span>
                                )}
                              </div>
                              {/* KP member price row for non-members */}
                              {kpDiscount > 0 && (
                                <div className="flex items-baseline gap-1 mt-0.5">
                                  <Link
                                    to="/kishanParivarPage"
                                    className="flex items-baseline gap-1 hover:underline"
                                    style={{ color: "#15803d" }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span className="text-sm font-bold text-green-700">
                                      ₹
                                      {getFinalPrice(
                                        variant.price
                                      ).toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-xs font-bold text-green-600">
                                      for KP Member
                                    </span>
                                  </Link>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {variants.length > 0 && (
              <>
                <div>
                  <div className="flex items-baseline gap-2">
                    <div className="flex flex-row gap-4 relative">
                      <span className="text-4xl font-bold text-black">
                        ₹
                        {getFinalPrice(
                          variants[selectedVariant].price
                        ).toLocaleString("en-IN")}
                      </span>
                      {isMember && kpDiscount > 0 && (
                        <span className="text-lg font-bold text-gray-500 line-through pt-2">
                          ₹
                          {variants[selectedVariant].price.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-500 pt-2">
                        {isMember && kpDiscount > 0 && (
                          <span className="text-green-800">
                            save {kpDiscount}% off (KP Member)
                          </span>
                        )}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => setShowPricePopup(true)}
                          className="button flex items-center gap-2 pt-2 hover:text-green-800"
                        >
                          Know your price
                          <Info />
                        </button>
                        {showPricePopup && (
                          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-50">
                            <button
                              onClick={() => setShowPricePopup(false)}
                              className="button absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">
                              Price Details
                            </h2>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm text-gray-600">
                                  Regular Price
                                </span>
                                <span className="text-sm font-semibold text-gray-500 line-through">
                                  ₹
                                  {variants[
                                    selectedVariant
                                  ].price.toLocaleString("en-IN")}
                                </span>
                              </div>
                              {isMember && kpDiscount > 0 && (
                                <div className="flex justify-between items-center border-b pb-2">
                                  <span className="text-sm text-gray-600">
                                    KP Member ({kpDiscount}% OFF)
                                  </span>
                                  <span className="text-base font-bold text-green-800">
                                    ₹
                                    {getFinalPrice(
                                      variants[selectedVariant].price
                                    ).toLocaleString("en-IN")}
                                  </span>
                                </div>
                              )}
                              {!isMember && kpDiscount > 0 && (
                                <div className="text-xs text-green-800">
                                  Become a KP member for instant savings!
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {variants[selectedVariant].units_in_stock <= 10 && (
                  <h2 className="text-red-600 font-extrabold animate-bounce text-base">
                    Hurry, only {variants[selectedVariant].units_in_stock} left!
                  </h2>
                )}
                <div className="flex items-center space-x-3">
                  <div className="flex border border-gray-300 rounded-xl">
                    <button
                      onClick={() => handleUpdateQuantity("decrement")}
                      className="button w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center bg-gray-100"
                      disabled={loading || quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-xl font-medium w-12 text-center mt-1">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity("increment")}
                      className="button w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center bg-gray-100"
                      disabled={
                        loading ||
                        quantity >=
                          (variants[selectedVariant]?.units_in_stock || 1)
                      }
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
                        onClick={handleAddToCartClick}
                        className="button flex-1 bg-white border-2 border-green-800 text-green-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0d6b1e] hover:text-white transition-all duration-300"
                        disabled={
                          !variants[selectedVariant]?.inStock || addingToCart
                        }
                      >
                        {addingToCart ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-t-2 border-green-800 rounded-full animate-spin"></div>
                            Adding...
                          </div>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleBuyNowClick}
                        className="button flex-1 bg-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
                        disabled={!variants[selectedVariant].inStock || loading}
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
              </>
            )}
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
            {relatedProducts.slice(0, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4 sm:p-8">
          <div className="relative bg-green-50 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-100 animate-fade-in">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
              Login with Kishan2Kitchen
            </h2>
            <PhoneAuth />
          </div>
        </div>
      )}
      <div className="pt-4">
        <RecognizedBy />
      </div>
    </div>
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = (props) => {
  return (
    <AuthProvider>
      <ProductDetailContent {...props} />
    </AuthProvider>
  );
};
