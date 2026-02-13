import React, { useEffect, useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  fetchCartById,
  clearBuyNowItem,
} from "../../store/slices/cartSlice";
import { CartItemSkeleton } from "./CartItemSkeleton";
import PhoneAuth from "../authComponents/PhoneAuth";
import { toast } from "react-toastify";
import { membershipApi } from "../../services/api/membershipApi";
import { MembershipStatus } from "../../types/membership";
import { isActiveKPMember } from "../../lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    // cart,
    cartItems,
    activeCartId,
    loading: cartLoading,
    error: cartError,
  } = useAppSelector((state) => state.cart);

  // Get authentication state
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Local loading states for individual items
  const [updatingItems, setUpdatingItems] = useState<{
    [key: string]: boolean;
  }>({});

  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Membership state
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus | null>(null);
  const [kpDiscount, setKpDiscount] = useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch membership status when user is authenticated
  useEffect(() => {
    const fetchMembership = async () => {
      if (isAuthenticated) {
        try {
          const status = await membershipApi.getStatus();
          // console.log("Membership status:", status);
          setMembershipStatus(status);
          
          // Get discount from user's membership status
          let discount = status.discountPercentage || 0;
          
          // If no discount in user status, try to get it from membership plans
          if (discount === 0) {
            try {
              const plans = await membershipApi.getPlans();
              if (plans && plans.length > 0) {
                // Use the first plan's discount as fallback
                discount = plans[0].discountPercentage || 0;
                console.log("Using fallback discount from plans:", discount);
              }
            } catch (planError) {
              console.error("Failed to fetch membership plans for fallback:", planError);
            }
          }
          
          // console.log("Setting KP discount:", discount);
          setKpDiscount(discount);
        } catch (error) {
          console.error("Failed to fetch membership status:", error);
          setMembershipStatus(null);
          setKpDiscount(0);
        }
      } else {
        setMembershipStatus(null);
        setKpDiscount(0);
      }
    };

    fetchMembership();
  }, [isAuthenticated]);

  // Initial cart restoration - only if user is authenticated
  useEffect(() => {
    const restoreCart = async () => {
      // Only restore cart if user is authenticated
      if (!isAuthenticated) {
        return;
      }

      const savedCartId = localStorage.getItem("cartId");
      if (savedCartId && !activeCartId) {
        try {
          await dispatch(fetchCartById(savedCartId)).unwrap();
          await dispatch(fetchCartItems(savedCartId)).unwrap();
        } catch (error) {
          console.error("Failed to restore cart:", error);
          localStorage.removeItem("cartId");
          localStorage.removeItem("cart");
          localStorage.removeItem("cartItems");
        }
      }
    };

    restoreCart();
  }, [dispatch, activeCartId, isAuthenticated]);

  // Close login modal when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, showLoginModal]);

  // Helper function to calculate KP member price (similar to ProductDetail)
  // Pricing helpers: apply KP discount first (if member), then GST
  const applyGst = (amount: number, gstPercentage?: number) => {
    const gst = gstPercentage ?? 0;
    return Math.floor(amount + (amount * gst) / 100);
  };

  const getRegularPriceWithGST = (regularPrice: number, gstPercentage?: number) =>
    applyGst(regularPrice, gstPercentage);

  const getKPMemberPrice = (regularPrice: number) => {
    if (kpDiscount > 0) {
      return Math.floor(regularPrice - (regularPrice * kpDiscount) / 100);
    }
    return regularPrice;
  };

  const getKPMemberPriceWithGST = (regularPrice: number, gstPercentage?: number) =>
    applyGst(getKPMemberPrice(regularPrice), gstPercentage);

  // Function to get the effective discount percentage
  const getEffectiveDiscount = () => {
    // First try to get from user's membership status
    if (membershipStatus?.discountPercentage && membershipStatus.discountPercentage > 0) {
      return membershipStatus.discountPercentage;
    }
    
    // Fallback to the kpDiscount state (which includes plans fallback)
    return kpDiscount;
  };

  // Check if user is an active KP member (not expired)
  const isKPMember = isActiveKPMember(membershipStatus);

  // Get the effective discount for calculations
  const effectiveDiscount = getEffectiveDiscount();

  // console.log("CartDrawer Debug:", {
  //   isKPMember,
  //   kpDiscount,
  //   effectiveDiscount,
  //   membershipStatus,
  //   cartItemsLength: cartItems.length,
  //   membershipDetails: {
  //     isMember: membershipStatus?.isMember,
  //     membershipEnd: membershipStatus?.membershipEnd,
  //     membershipType: membershipStatus?.membershipType,
  //     discountPercentage: membershipStatus?.discountPercentage
  //   }
  // });

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!activeCartId || newQuantity < 1) return;

    // Find the cart item to get variant information
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem || !cartItem.variant) {
      console.error("Cart item or variant not found");
      return;
    }

    // Check stock availability before updating quantity
    const variant = cartItem.variant;
    if (!variant.inStock || variant.units_in_stock <= 0) {
      toast.error("This variant is out of stock");
      return;
    }

    if (newQuantity > variant.units_in_stock) {
      toast.error(
        `Only ${variant.units_in_stock} units available in stock. Requested: ${newQuantity}`
      );
      return;
    }

    try {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));
      await dispatch(
        updateCartItem({
          cartId: activeCartId,
          itemId,
          itemData: { quantity: newQuantity },
        })
      ).unwrap();
    } catch (err: any) {
      // Handle stock validation errors from server
      if (err.message && err.message.includes("stock")) {
        toast.error(err.message);
      } else {
        console.error("Failed to update item:", err);
        toast.error("Failed to update item quantity");
      }
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!activeCartId) return;

    try {
      setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));
      await dispatch(
        removeCartItem({
          cartId: activeCartId,
          itemId,
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleCheckout = () => {
    // Validate stock availability for all items before checkout
    for (const item of cartItems) {
      if (!item.variant) {
        toast.error(
          `Variant information missing for ${item.product?.name || "item"}`
        );
        return;
      }

      if (!item.variant.inStock || item.variant.units_in_stock <= 0) {
        toast.error(
          `${item.product?.name || "Item"} (${
            item.variant.weight
          }) is out of stock`
        );
        return;
      }

      if (item.quantity > item.variant.units_in_stock) {
        toast.error(
          `${item.product?.name || "Item"} (${item.variant.weight}) - Only ${
            item.variant.units_in_stock
          } units available. Requested: ${item.quantity}`
        );
        return;
      }
    }

    // Clear any previous buy now session before cart checkout
    dispatch(clearBuyNowItem());
    // Also reset checkout state to ensure step is 1 and no previous session remains
    dispatch({ type: "checkout/resetCheckout" });
    onClose();
    navigate("/checkout");
  };

  // Calculate cart total with GST and KP member discount (if applicable)
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant?.price || 0;
      const gst = item.variant?.gstPercentage;
      const unitPrice = isKPMember && effectiveDiscount > 0
        ? getKPMemberPriceWithGST(price, gst)
        : getRegularPriceWithGST(price, gst);
      return total + unitPrice * item.quantity;
    }, 0);
  };

  // Calculate original total without KP discount (but GST-inclusive)
  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.variant?.price || 0;
      const gst = item.variant?.gstPercentage;
      return total + getRegularPriceWithGST(price, gst) * item.quantity;
    }, 0);
  };

  // Calculate total items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if any items are out of stock
  const hasOutOfStockItems = () => {
    return cartItems.some(
      (item) =>
        !item.variant?.inStock ||
        (item.variant?.units_in_stock || 0) <= 0 ||
        item.quantity > (item.variant?.units_in_stock || 0)
    );
  };

  // Get out of stock items for display
  const getOutOfStockItems = () => {
    return cartItems.filter(
      (item) =>
        !item.variant?.inStock ||
        (item.variant?.units_in_stock || 0) <= 0 ||
        item.quantity > (item.variant?.units_in_stock || 0)
    );
  };

  const renderSkeletons = () => {
    return Array(3)
      .fill(null)
      .map((_, index) => <CartItemSkeleton key={index} />);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900/30 transition-opacity z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#2C3639]">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="button w-5 h-5" />
            </button>
          </div>

          {cartLoading && (
            <div className="flex-1 overflow-y-auto py-4">
              {renderSkeletons()}
            </div>
          )}

          {cartError && (
            <div className="p-4 bg-red-50 text-red-600 text-center">
              {cartError}
            </div>
          )}

          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-500">Please login to view your cart</p>
              <button
                onClick={() => {
                  setShowLoginModal(true);
                }}
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors cursor-pointer"
              >
                Login
              </button>
            </div>
          ) : !cartLoading &&
            !cartError &&
            (!cartItems || cartItems.length === 0) ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/All-products");
                }}
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-[#3A4D13] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-6 py-4 border-b border-gray-200 last:border-0"
                  >
                    {updatingItems[item.id] ? (
                      <CartItemSkeleton />
                    ) : (
                      <div className="flex gap-4">
                        <img
                          src={
                            item.product?.images.main ||
                            "https://picsum.photos/200/300"
                          }
                          alt={item.product?.name || "Product"}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-[#2C3639]">
                            {item.product?.name || "Product"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.variant?.weight || "Variant"}
                          </p>
                          {/* Stock status indicators */}
                          {item.variant && (
                            <div className="mt-1">
                              {!item.variant.inStock ||
                              item.variant.units_in_stock <= 0 ? (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                  Out of Stock
                                </span>
                              ) : item.variant.units_in_stock <= 5 ? (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  Only {item.variant.units_in_stock} left
                                </span>
                              ) : null}
                            </div>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded"
                                disabled={updatingItems[item.id]}
                              >
                                <Minus className="button w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded"
                                disabled={
                                  updatingItems[item.id] ||
                                  (item.variant &&
                                    item.quantity >=
                                      item.variant.units_in_stock)
                                }
                                title={
                                  item.variant &&
                                  item.quantity >= item.variant.units_in_stock
                                    ? `Only ${item.variant.units_in_stock} available`
                                    : "Increase quantity"
                                }
                              >
                                <Plus className="button w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-500"
                              disabled={updatingItems[item.id]}
                            >
                              <Trash2 className="button w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          {item.variant && (
                            <>
                              {/* {console.log("Cart item price rendering:", {
                                itemId: item.id,
                                isKPMember,
                                effectiveDiscount,
                                variantPrice: item.variant.price,
                                quantity: item.quantity,
                                shouldShowKPPrice: isKPMember && effectiveDiscount > 0
                              })} */}
                              {isKPMember && effectiveDiscount > 0 ? (
                                <>
                                  {/* KP Member Price */}
                                  <p className="font-medium text-[#4A5D23]">
                                    ₹
                                    {(
                                      getKPMemberPriceWithGST(item.variant.price, item.variant.gstPercentage) * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </p>
                                  {/* Original Price (crossed out) */}
                                  <p className="text-xs text-gray-500 line-through">
                                    ₹
                                    {(
                                      getRegularPriceWithGST(item.variant.price, item.variant.gstPercentage) * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </p>
                                  {/* KP Member Badge */}
                                  <p className="text-xs text-green-600 font-medium">
                                    KP Member ({effectiveDiscount}% off)
                                  </p>
                                  {/* Savings amount */}
                                  <p className="text-xs text-green-700">
                                    Save ₹{((
                                      getRegularPriceWithGST(item.variant.price, item.variant.gstPercentage) -
                                      getKPMemberPriceWithGST(item.variant.price, item.variant.gstPercentage)
                                    ) * item.quantity).toLocaleString("en-IN")}
                                  </p>
                                </>
                              ) : (
                                <>
                                  {/* Regular Price */}
                                  <p className="font-medium text-[#4A5D23]">
                                    ₹
                                    {(
                                      getRegularPriceWithGST(item.variant.price, item.variant.gstPercentage) * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </p>
                                  {/* Show KP Member Price for non-members if discount is available */}
                                  {effectiveDiscount > 0 && (
                                    <>
                                      <p className="text-xs text-green-600">
                                        KP Member: ₹
                                        {(
                                          getKPMemberPriceWithGST(item.variant.price, item.variant.gstPercentage) * item.quantity
                                        ).toLocaleString("en-IN")}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Save ₹{((
                                          getRegularPriceWithGST(item.variant.price, item.variant.gstPercentage) -
                                          getKPMemberPriceWithGST(item.variant.price, item.variant.gstPercentage)
                                        ) * item.quantity).toLocaleString("en-IN")}
                                      </p>
                                    </>
                                  )}
                                </>
                              )}
                              {/* Existing variant discount display */}
                              {item.variant.discount! > 0 && (
                                <p className="text-xs text-gray-500 line-through">
                                  ₹
                                  {(
                                    getRegularPriceWithGST(item.variant.originalPrice!, item.variant.gstPercentage) * item.quantity
                                  ).toLocaleString("en-IN")}
                                </p>
                              )}
                              {item.variant.discount! > 0 && (
                                <p className="text-xs text-green-600">
                                  {item.variant.discount}% off
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {!cartLoading && cartItems && cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              {/* Stock warnings */}
              {hasOutOfStockItems() && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-red-800 mb-2">
                    Stock Issues Detected
                  </h4>
                  <div className="space-y-1">
                    {getOutOfStockItems().map((item) => (
                      <p key={item.id} className="text-xs text-red-700">
                        • {item.product?.name || "Item"} (
                        {item.variant?.weight || "Variant"}) -
                        {!item.variant?.inStock ||
                        (item.variant?.units_in_stock || 0) <= 0
                          ? " Out of stock"
                          : ` Only ${item.variant?.units_in_stock} available (requested: ${item.quantity})`}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total ({getTotalItems()} items)</span>
                <div className="text-right">
                  {isKPMember && effectiveDiscount > 0 ? (
                    <>
                      <span className="text-[#4A5D23]">
                        ₹{calculateTotal().toLocaleString("en-IN")}
                      </span>
                      <div className="text-sm text-gray-500 line-through">
                        ₹{calculateOriginalTotal().toLocaleString("en-IN")}
                      </div>
                    </>
                  ) : (
                    <span className="text-[#4A5D23]">
                      ₹{calculateTotal().toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
              
              {/* KP Member Discount Summary */}
              {isKPMember && effectiveDiscount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-800 font-medium">
                      KP Member Discount ({effectiveDiscount}%)
                    </span>
                    <span className="text-green-700 font-bold">
                      -₹{(calculateOriginalTotal() - calculateTotal()).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
              
              {/* KP Member Promotion for Non-Members */}
              {!isKPMember && effectiveDiscount > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1">Become a KP Member!</div>
                    <div className="text-xs">
                      Save {effectiveDiscount}% on all products. 
                      <button
                        onClick={() => {
                          onClose();
                          navigate("/kishanParivarPage");
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleCheckout}
                className={`button w-full py-3 rounded-lg transition-colors ${
                  hasOutOfStockItems()
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-800 text-white hover:bg-[#3A4D13]"
                }`}
                disabled={hasOutOfStockItems()}
              >
                {hasOutOfStockItems()
                  ? "Cannot Checkout - Stock Issues"
                  : "Proceed to Checkout"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
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
    </>
  );
};
