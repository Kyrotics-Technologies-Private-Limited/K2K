import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  ChevronRight,
  CreditCard,
  Star,
  Info,
  X,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { BenefitsBanner } from "./InformationBanner";
import RecognizedBy from "../homePageComponents/RecognizedBy";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts } from "../../store/slices/productSlice";
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
import { reviewApi, Review } from "../../services/api/reviewApi";
import { WriteReviewCard } from "./WriteReviewCard";
import { MembershipStatus, MembershipSettings } from "../../types/membership";
import { isActiveKPMember } from "../../lib/utils";

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
  const { products: allProducts } = useAppSelector((state) => state.products);
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
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(true);
  const navigate = useNavigate();

  // Membership state
  const [membershipStatus, setMembershipStatus] =
    useState<MembershipStatus | null>(null);
  const [kpSettings, setKPSettings] = useState<MembershipSettings | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const ratingsSectionRef = useRef<HTMLDivElement>(null);
  const variantsCarouselRef = useRef<HTMLDivElement>(null);
  const [carouselAtStart, setCarouselAtStart] = useState(true);
  const [carouselAtEnd, setCarouselAtEnd] = useState(false);

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
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [allProducts.length, dispatch]);

  const fetchReviews = async () => {
    if (!product?.id) return;
    try {
      setReviewsLoading(true);
      const data = await reviewApi.getProductReviews(product.id);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product?.id]);

  useEffect(() => {
    if (variants.length <= 2) return;
    const run = () => {
      const el = variantsCarouselRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const threshold = 4;
      setCarouselAtStart(scrollLeft <= threshold);
      setCarouselAtEnd(scrollLeft >= scrollWidth - clientWidth - threshold);
    };
    const id = requestAnimationFrame(() => run());
    const onResize = () => run();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [variants.length]);

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

  // Debug: Log product data to check if healthBadges are present
  console.log('Product data:', product);
  console.log('Product healthBadges:', product.healthBadges);
  console.log('Health badges count:', product.healthBadges?.length || 0);

  if (product.healthBadges && product.healthBadges.length > 0) {
    product.healthBadges.forEach((badge, idx) => {
      console.log(`Health Badge ${idx}:`, {
        title: badge.title,
        description: badge.description,
        image: badge.image,
        fullBadge: badge
      });
    });
  }

  const isMember = isActiveKPMember(membershipStatus);

  // Get discount percentage - prioritize user's membership discount, then fallback to plans
  const kpDiscount = isMember
    ? (membershipStatus?.discountPercentage ?? 0)
    : (kpSettings && kpSettings.length > 0 ? kpSettings[0].discountPercentage : 0);

  // Pricing helpers: apply KP membership discount first, then GST
  const applyGst = (amount: number, gstPercentage?: number) => {
    const gst = gstPercentage ?? 0;
    return Math.floor(amount + (amount * gst) / 100);
  };

  const getPriceAfterKpDiscount = (regularPrice: number) =>
    isMember && kpDiscount > 0
      ? Math.floor(regularPrice - (regularPrice * kpDiscount) / 100)
      : regularPrice;

  const getFinalPriceWithGST = (regularPrice: number, gstPercentage?: number) => {
    const discounted = getPriceAfterKpDiscount(regularPrice);
    return applyGst(discounted, gstPercentage);
  };

  // Helper function to get KP member price for non-members
  const getKPMemberPriceWithGST = (regularPrice: number, gstPercentage?: number) => {
    const discounted = kpDiscount > 0
      ? Math.floor(regularPrice - (regularPrice * kpDiscount) / 100)
      : regularPrice;
    return applyGst(discounted, gstPercentage);
  };

  const getRegularPriceWithGST = (regularPrice: number, gstPercentage?: number) =>
    applyGst(regularPrice, gstPercentage);

  // Actual rating from reviews (fallback to product.ratings when no reviews)
  const actualRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : product.ratings ?? 0;
  const reviewCount = reviews.length;

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
                  getFinalPriceWithGST(
                    variants[selectedVariant].price,
                    variants[selectedVariant].gstPercentage
                  ) * quantity
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

  const updateVariantsCarouselArrows = () => {
    const el = variantsCarouselRef.current;
    if (!el || variants.length <= 2) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const threshold = 4;
    setCarouselAtStart(scrollLeft <= threshold);
    setCarouselAtEnd(scrollLeft >= scrollWidth - clientWidth - threshold);
  };

  const scrollVariantsCarousel = (direction: "left" | "right") => {
    const el = variantsCarouselRef.current;
    if (!el || !el.children.length) return;
    const firstCard = el.children[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth;
    const gap = 12; // gap-3 between cards
    const step = cardWidth + gap;
    el.scrollBy({ left: direction === "right" ? step : -step, behavior: "smooth" });
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
        {/* Back Navigation */}
        <div className="pt-4 lg:pt-6 pb-3 lg:pb-4">
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-800 transition-colors duration-200 text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            <span className="font-medium truncate">Back to All Products</span>
          </Link>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8">
          {/* Image Gallery - Sticky Left Side (laptop only) */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnail Gallery - horizontal strip on mobile/tablet, vertical on laptop */}
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] p-2 order-2 lg:order-1 lg:shrink-0">
                {product.images.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-14 h-14 lg:w-16 lg:h-16 overflow-hidden rounded ${selectedImage === index ? "ring-2 ring-green-800" : ""
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

              {/* Main Image Container - on lg wraps image+quantity; on max-lg contents so thumbnails can sit between image and quantity */}
              <div className="max-lg:contents lg:flex lg:flex-col lg:flex-1 lg:min-w-0 lg:order-2">
                {/* Main Image - first on mobile/tablet, then thumbnails, then quantity */}
                <div className="relative h-[280px] sm:h-[360px] lg:h-[500px] overflow-hidden rounded-lg max-lg:order-1">
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

                {/* Quantity Selector and Action Buttons - below thumbnails on mobile/tablet */}
                {variants.length > 0 && (
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-4 max-lg:order-3">
                    {/* Quantity Selector - slightly narrower on tablet only */}
                    <div className="flex border border-gray-300 rounded-xl max-sm:self-start md:scale-95 lg:scale-100 md:origin-left">
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

                    {/* Add to Cart and Buy Now Buttons */}
                    {product.stockStatus === "out_of_stock" ? (
                      <div className="w-full sm:flex-1 bg-gray-100 rounded-lg p-4 text-center">
                        <p className="text-gray-600 font-medium">
                          Currently Out of Stock
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Please check back later or contact us for availability
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-row w-full sm:flex-1 gap-3 min-w-0">
                        <button
                          onClick={handleAddToCartClick}
                          className="button flex-1 min-w-0 md:min-w-28 bg-white border-2 border-green-800 text-green-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0d6b1e] hover:text-white transition-all duration-300 whitespace-nowrap"
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
                              <ShoppingCart className="w-5 h-5 md:hidden lg:block" />
                              Add to Cart
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleBuyNowClick}
                          className="button flex-1 min-w-0 md:min-w-28 bg-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors whitespace-nowrap"
                          disabled={!variants[selectedVariant].inStock || loading}
                        >
                          {loading ? (
                            "Processing..."
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5 md:hidden lg:block" />
                              Buy Now
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6 min-w-0">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                {product.name.replace(/^div/i, "").trim()}
              </h1>
              <button
                type="button"
                onClick={() => ratingsSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center mt-2 gap-2 flex-wrap text-left cursor-pointer rounded-md py-1 pr-2 -ml-1 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                aria-label="Go to ratings and reviews"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fill = Math.min(1, Math.max(0, actualRating - i));
                    return (
                      <div key={i} className="relative w-5 h-5">
                        <Star className="w-5 h-5 stroke-gray-300 fill-transparent absolute inset-0" />
                        {fill > 0 && (
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {actualRating > 0 ? actualRating.toFixed(1) : "0"}/5
                  <span className="text-gray-500 font-normal ml-1">
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </span>
              </button>
            </div>

            {/* Product Badges - hidden on mobile (shown under Know our price there) */}
            <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 py-4 lg:py-6">
              {product.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2 transform transition-transform group-hover:scale-110">
                    <img
                      src={badge.image}
                      alt={badge.text}
                      className="w-16 h-16"
                    />
                  </div>
                  <span className="text-sm font-medium text-green-800">{badge.text}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Select Variant</h2>
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
                <>
                  {/* Mobile only: carousel with 2 variants visible, no auto-slide */}
                  <div className="relative sm:hidden">
                    <div
                      ref={variantsCarouselRef}
                      onScroll={updateVariantsCarouselArrows}
                      className="flex gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {variants.map((variant, index) => {
                        const discountedWithGst = getFinalPriceWithGST(
                          variant.price,
                          variant.gstPercentage
                        );
                        // Calculate base price and total discount for KP members
                        const basePriceValue = variant.originalPrice || variant.price;
                        const basePriceWithGST = getRegularPriceWithGST(basePriceValue, variant.gstPercentage);
                        let totalDiscountPercentage = 0;
                        if (basePriceWithGST > 0) {
                          totalDiscountPercentage = Math.round(((basePriceWithGST - discountedWithGst) / basePriceWithGST) * 100);
                        }
                        return (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(index)}
                            className={`button flex flex-col items-start p-3 rounded-lg border-2 transition-all duration-200 shrink-0 snap-start w-[calc(50%-6px)] min-w-[calc(50%-6px)] ${selectedVariant === index
                              ? "border-green-600 ring-2 ring-green-200 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                              } ${!variant.inStock || variant.units_in_stock <= 0
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                              } bg-white`}
                            disabled={
                              !variant.inStock || variant.units_in_stock <= 0
                            }
                          >
                            <div className="flex flex-col w-full space-y-1 min-w-0">
                              <div className="flex justify-between w-full items-center">
                                <span
                                  className={`text-sm font-medium truncate ${selectedVariant === index
                                    ? "text-green-800"
                                    : "text-gray-900"
                                    }`}
                                >
                                  {variant.weight}
                                </span>
                                {!variant.inStock && (
                                  <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded shrink-0">
                                    Out of stock
                                  </span>
                                )}
                              </div>
                              {isMember && kpDiscount > 0 ? (
                                <div className="flex flex-wrap items-baseline gap-1">
                                  <span className="text-base font-bold text-green-800">
                                    ₹{discountedWithGst.toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-sm font-medium text-gray-500 line-through">
                                    ₹{basePriceWithGST.toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-xs font-semibold bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                                    {totalDiscountPercentage}% OFF
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-wrap items-baseline gap-1">
                                    <span className="text-base font-bold text-gray-900">
                                      ₹{getRegularPriceWithGST(
                                        variant.price,
                                        variant.gstPercentage
                                      ).toLocaleString("en-IN")}
                                    </span>
                                    {variant.originalPrice && (
                                      <span className="text-sm line-through text-gray-500">
                                        ₹
                                        {getRegularPriceWithGST(
                                          variant.originalPrice,
                                          variant.gstPercentage
                                        ).toLocaleString("en-IN")}
                                      </span>
                                    )}
                                    {variant.discount && (
                                      <span className="text-xs font-semibold bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
                                        {variant.discount}% off
                                      </span>
                                    )}
                                  </div>
                                  {kpDiscount > 0 && (
                                    <div className="flex items-baseline gap-1 mt-0.5">
                                      <Link
                                        to="/kishan-parivar"
                                        className="flex items-baseline gap-1 hover:underline"
                                        style={{ color: "#15803d" }}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <span className="text-xs font-bold text-green-700">
                                          ₹
                                          {getKPMemberPriceWithGST(
                                            variant.price,
                                            variant.gstPercentage
                                          ).toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-xs font-bold text-green-600">
                                          KP
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
                    {variants.length > 2 && (
                      <>
                        {!carouselAtStart && (
                          <button
                            type="button"
                            onClick={() => scrollVariantsCarousel("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent border border-transparent flex items-center justify-center text-gray-700 hover:bg-white/40 hover:border-gray-200/50 z-10"
                            aria-label="Previous variants"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        )}
                        {!carouselAtEnd && (
                          <button
                            type="button"
                            onClick={() => scrollVariantsCarousel("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent border border-transparent flex items-center justify-center text-gray-700 hover:bg-white/40 hover:border-gray-200/50 z-10"
                            aria-label="Next variants"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Tablet and up: grid unchanged */}
                  <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {variants.map((variant, index) => {
                      const discountedWithGst = getFinalPriceWithGST(
                        variant.price,
                        variant.gstPercentage
                      );
                      const basePriceValue = variant.originalPrice || variant.price;
                      const basePriceWithGST = getRegularPriceWithGST(basePriceValue, variant.gstPercentage);
                      let totalDiscountPercentage = 0;
                      if (basePriceWithGST > 0) {
                        totalDiscountPercentage = Math.round(((basePriceWithGST - discountedWithGst) / basePriceWithGST) * 100);
                      }
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(index)}
                          className={`button flex flex-col items-start p-3 rounded-lg w-full border-2 transition-all duration-200 ${selectedVariant === index
                            ? "border-green-600 ring-2 ring-green-200 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                            } ${!variant.inStock || variant.units_in_stock <= 0
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
                                className={`text-sm font-medium ${selectedVariant === index
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
                                  ₹{discountedWithGst.toLocaleString("en-IN")}
                                </span>
                                <span className="text-base font-medium text-gray-500 line-through">
                                  ₹{basePriceWithGST.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs font-semibold bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                                  {totalDiscountPercentage}% OFF
                                </span>
                              </div>
                            ) : (
                              <>
                                <div className="flex flex-wrap items-baseline gap-1">
                                  <span className="text-lg font-bold text-gray-900">
                                    ₹{getRegularPriceWithGST(
                                      variant.price,
                                      variant.gstPercentage
                                    ).toLocaleString("en-IN")}
                                  </span>
                                  {variant.originalPrice && (
                                    <span className="text-sm line-through text-gray-500">
                                      ₹
                                      {getRegularPriceWithGST(
                                        variant.originalPrice,
                                        variant.gstPercentage
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  )}
                                  {variant.discount && (
                                    <span className="text-xs font-semibold bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                                      {variant.discount}% off
                                    </span>
                                  )}
                                </div>
                                {kpDiscount > 0 && (
                                  <div className="flex items-baseline gap-1 mt-0.5">
                                    <Link
                                      to="/kishanParivarPage "
                                      className="flex items-baseline gap-1 hover:underline"
                                      style={{ color: "#15803d" }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <span className="text-sm font-bold text-red-700">
                                        ₹
                                        {getKPMemberPriceWithGST(
                                          variant.price,
                                          variant.gstPercentage
                                        ).toLocaleString("en-IN")}
                                      </span>
                                      <span className="text-xs font-bold text-red-600">
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
                </>
              )}
            </div>

            {variants.length > 0 && (
              <>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex flex-row flex-wrap gap-2 lg:gap-4 relative">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                        ₹
                        {getFinalPriceWithGST(
                          variants[selectedVariant].price,
                          variants[selectedVariant].gstPercentage
                        ).toLocaleString("en-IN")}
                      </span>
                      {/* Strike-through Price Logic: Show if (OriginalPrice exists AND > Price) OR (Member AND KP Discount > 0) */}
                      {(
                        (variants[selectedVariant].originalPrice && variants[selectedVariant].originalPrice > variants[selectedVariant].price) ||
                        (isMember && kpDiscount > 0)
                      ) && (
                          <span className="text-lg font-bold text-gray-500 line-through pt-2">
                            ₹
                            {getRegularPriceWithGST(
                              variants[selectedVariant].originalPrice || variants[selectedVariant].price,
                              variants[selectedVariant].gstPercentage
                            ).toLocaleString("en-IN")}
                          </span>
                        )}
                      <span className="text-lg font-bold text-gray-500 pt-2">
                        {/* Member Savings Logic */}
                        {isMember && kpDiscount > 0 ? (
                          <span className="text-green-800">
                            save {Math.round(((getRegularPriceWithGST(variants[selectedVariant].originalPrice || variants[selectedVariant].price, variants[selectedVariant].gstPercentage) - getFinalPriceWithGST(variants[selectedVariant].price, variants[selectedVariant].gstPercentage)) / getRegularPriceWithGST(variants[selectedVariant].originalPrice || variants[selectedVariant].price, variants[selectedVariant].gstPercentage)) * 100)}% off (KP Member)
                          </span>
                        ) : (
                          /* Non-Member Product Discount Logic */
                          (variants[selectedVariant].originalPrice && variants[selectedVariant].originalPrice > variants[selectedVariant].price) && (
                            <span className="text-green-800">
                              save {Math.round(((variants[selectedVariant].originalPrice - variants[selectedVariant].price) / variants[selectedVariant].originalPrice) * 100)}% off
                            </span>
                          )
                        )}
                      </span>
                      {/* KP Member Price for Regular Users - Moved Inside */}
                      {!isMember && kpDiscount > 0 && (
                        <div className="relative inline-flex items-center ml-2 align-middle self-center">
                          <style>{`
                              @keyframes zoom-in-zoom-out {
                                0% { transform: scale(1); }
                                50% { transform: scale(1.05); }
                                100% { transform: scale(1); }
                              }
                              .animate-zoom {
                                animation: zoom-in-zoom-out 2s infinite ease-in-out;
                              }
                            `}</style>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-200 rounded-lg shadow-sm animate-zoom h-fit">
                            <span className="text-sm font-bold text-green-800 whitespace-nowrap">
                              Want to save extra {kpDiscount}% ?
                            </span>
                            <Link
                              to="/kishanParivarPage"
                              className="bg-green-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow hover:bg-green-700 transition-colors whitespace-nowrap"
                            >
                              Become a Member now
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>



                  {/* Know Your Price Section */}
                  <div className="mt-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowPricePopup(true)}
                        className="button flex items-center gap-2 text-sm sm:text-md text-green-800 hover:text-black border border-gray-300 rounded-lg px-3 py-2"
                      >
                        Know our price
                        <Info size={16} />
                      </button>
                      {showPricePopup && (
                        <div className="absolute top-full left-0 right-0 lg:right-auto mt-2 bg-white rounded-lg shadow-lg p-4 w-full max-w-[16rem] lg:w-64 z-50 border border-gray-200">
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
                                {getRegularPriceWithGST(
                                  variants[selectedVariant].price,
                                  variants[selectedVariant].gstPercentage
                                ).toLocaleString("en-IN")}
                              </span>
                            </div>
                            {isMember && kpDiscount > 0 && (
                              <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm text-gray-600">
                                  KP Member ({kpDiscount}% OFF)
                                </span>
                                <span className="text-base font-bold text-green-800">
                                  ₹
                                  {getFinalPriceWithGST(
                                    variants[selectedVariant].price,
                                    variants[selectedVariant].gstPercentage
                                  ).toLocaleString("en-IN")}
                                </span>
                              </div>
                            )}
                            {!isMember && kpDiscount > 0 && (
                              <div className="space-y-2">
                                <div className="flex justify-between items-center border-b pb-2">
                                  <span className="text-sm text-gray-600">
                                    KP Member Price
                                  </span>
                                  <span className="text-base font-bold text-green-800">
                                    ₹{getKPMemberPriceWithGST(
                                      variants[selectedVariant].price,
                                      variants[selectedVariant].gstPercentage
                                    ).toLocaleString("en-IN")}
                                  </span>
                                </div>
                                <div className="text-xs text-green-800 bg-green-50 p-2 rounded">
                                  <strong>Become a KP member for instant savings!</strong>
                                  <br />
                                  Save ₹{(
                                    getRegularPriceWithGST(
                                      variants[selectedVariant].price,
                                      variants[selectedVariant].gstPercentage
                                    ) -
                                    getKPMemberPriceWithGST(
                                      variants[selectedVariant].price,
                                      variants[selectedVariant].gstPercentage
                                    )
                                  ).toLocaleString("en-IN")} on this product
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Product Badges - mobile only: under Know our price */}
                <div className="sm:hidden grid grid-cols-2 gap-3 py-4 mt-4">
                  {product.badges.map((badge, index) => (
                    <div
                      key={`mobile-badges-${index}`}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2 transform transition-transform group-hover:scale-110">
                        <img
                          src={badge.image}
                          alt={badge.text}
                          className="w-16 h-16"
                        />
                      </div>
                      <span className="text-sm font-medium text-green-800">{badge.text}</span>
                    </div>
                  ))}
                </div>
                {variants[selectedVariant].units_in_stock <= 0 ? (
                  <h2 className="text-red-600 font-extrabold text-base">
                    Product is out of stock
                  </h2>
                ) : variants[selectedVariant].units_in_stock <= 10 && (
                  <h2 className="text-red-600 font-extrabold animate-bounce text-base">
                    Hurry, only {variants[selectedVariant].units_in_stock} left!
                  </h2>
                )}
              </>
            )}
            <div>
              <h2 className="text-lg lg:text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>
            </div>
          </div>
        </div>


        {/* Product Quality Badges */}
        <div className="mt-6 lg:mt-8 mb-6 lg:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {/* 300+ Farmer Empowered Badge */}
            <div
              className="flex flex-col items-center text-center p-6 rounded-xl"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #f0fdf4, #fef3c7)'
              }}
            >
              <div className="w-20 h-20 mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/assets/productbadgeimg/300+ Farmer empowered (1).png"
                  alt="300+ Farmer Empowered"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">300+ Farmer Empowered</h3>
              {/* <p className="text-sm text-gray-600">Supporting local farming communities across India</p> */}
            </div>

            {/* Procured from Birbhum Badge */}
            <div
              className="flex flex-col items-center text-center p-6 rounded-xl"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #f0fdf4, #fef3c7)'
              }}
            >
              <div className="w-20 h-20 mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/assets/productbadgeimg/PROCURED FROM BIRBHUM (1).png"
                  alt="Procured from Birbhum"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Procured from Birbhum</h3>
              {/* <p className="text-sm text-gray-600">Directly sourced from Birbhum district, West Bengal</p> */}
            </div>

            {/* Zero Adulteration Badge */}
            <div
              className="flex flex-col items-center text-center p-6 rounded-xl"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #f0fdf4, #fef3c7)'
              }}
            >
              <div className="w-20 h-20 mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/assets/productbadgeimg/Zero Adulteration (3).png"
                  alt="Zero Adulteration"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Zero Adulteration</h3>
              {/* <p className="text-sm text-gray-600">100% pure and authentic products guaranteed</p> */}
            </div>
          </div>
        </div>

        {/* Benefits Banner */}
        <BenefitsBanner product={product} />

        {/* Health Benefits */}
        {product.healthBadges && product.healthBadges.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setIsBenefitsOpen(!isBenefitsOpen)}
              className="w-full flex items-center justify-between"
            >
              <div className="text-left">
                <h2 className="text-2xl lg:text-3xl uppercase font-bold font-cormorant text-gray-800">Benefits</h2>
              </div>
              {isBenefitsOpen ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isBenefitsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mt-4">
                {product.healthBadges.map((healthBadges, index) => {
                  console.log(`Health Badge ${index}:`, healthBadges);
                  console.log(`Icon URL for ${healthBadges.title}:`, healthBadges.image);

                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="shrink-0">
                        <div className="w-20 h-20 rounded-full border-2 border-green-700 flex items-center justify-center p-3 bg-green-50 shadow-sm">
                          {healthBadges.image && (
                            <img
                              src={healthBadges.image}
                              alt={healthBadges.title}
                              className="w-full h-full object-contain"
                              onLoad={() => console.log(`Image loaded successfully for ${healthBadges.title}`)}
                              onError={(e) => {
                                console.error(`Image failed to load for ${healthBadges.title}:`, healthBadges.image);
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold font-cormorant text-gray-600 mb-2">
                          {healthBadges.title}
                        </h4>
                        <p className="text-gray-800 text-base leading-relaxed">
                          {healthBadges.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div
          ref={ratingsSectionRef}
          id="ratings-reviews"
          className="mt-8 lg:mt-12 px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12 border-t border-gray-200 pt-8 lg:pt-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Ratings & Reviews</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.ratings)
                      ? "fill-amber-400 stroke-amber-400"
                      : "stroke-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>

          <WriteReviewCard
            productId={product.id}
            isLoggedIn={!!user}
            onSuccess={fetchReviews}
            onLoginClick={() => setShowLoginModal(true)}
          />

          {/* Reviews list */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer reviews</h3>
            {reviewsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-700 border-t-transparent" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-500">No reviews yet.</p>
                <p className="text-sm text-gray-400 mt-1">Be the first to review this product!</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating
                              ? "fill-amber-400 stroke-amber-400"
                              : "stroke-gray-200"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        {/* Related Products or Continue Shopping */}
        <div className="mt-6 lg:mt-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">
            {relatedProducts.length > 0 ? "Related Products" : "Continue Shopping"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.length > 0
              ? relatedProducts.slice(0, 4).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))
              : allProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((prod) => <ProductCard key={prod.id} product={prod} />)}
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
