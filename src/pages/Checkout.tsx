import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SelectStep } from "../components/checkout/SelectStep";
import { OrderReview } from "../components/checkout/OrderReview";
import { Payment } from "../components/checkout/Payment";
import { updateOrderSummary } from "../store/slices/checkoutSlice";
import { ShoppingBag } from "lucide-react";
import { membershipApi } from "../services/api/membershipApi";
import { MembershipStatus } from "../types/membership";
import { isActiveKPMember } from "../lib/utils";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.checkout);
  const { buyNowItem, cartItems } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // If both cart and buyNowItem are empty, redirect
    if (cartItems.length === 0 && !buyNowItem) {
      navigate("/all-products");
      return;
    }

    // Calculate order summary with KP member discount and GST-inclusive pricing per item
    const calculateOrderSummary = async () => {
      try {
        // Get membership status
        let kpDiscountPercentage = 0;
        let isKPMember = false;
        
        if (isAuthenticated) {
          try {
            const membershipStatus: MembershipStatus = await membershipApi.getStatus();
            isKPMember = isActiveKPMember(membershipStatus);
            
            // Get discount percentage - only if membership is active
            if (isKPMember && membershipStatus?.discountPercentage && membershipStatus.discountPercentage > 0) {
              kpDiscountPercentage = membershipStatus.discountPercentage;
            } else if (!isKPMember) {
              // If membership is expired, set discount to 0
              kpDiscountPercentage = 0;
            } else {
              // Fallback to plans if no discount in user status (only for active members)
              try {
                const plans = await membershipApi.getPlans();
                if (plans && plans.length > 0) {
                  kpDiscountPercentage = plans[0].discountPercentage || 0;
                }
              } catch (planError) {
                console.error("Failed to fetch membership plans for fallback:", planError);
              }
            }
          } catch (error) {
            console.error("Failed to fetch membership status:", error);
          }
        }

        // If buyNowItem exists, calculate summary for it, else for cart
        const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;
        
        // Helpers inline
        const applyGst = (amount: number, gstPercentage?: number) => {
          const gst = gstPercentage ?? 0;
          return Math.floor(amount + (amount * gst) / 100);
        };
        const priceAfterKp = (price: number) =>
          isKPMember && kpDiscountPercentage > 0
            ? Math.floor(price - (price * kpDiscountPercentage) / 100)
            : price;

        // Calculate GST-inclusive subtotal
        const subtotal = itemsToCheckout.reduce((total, item) => {
          const unit = item.variant?.price || 0;
          const gst = item.variant?.gstPercentage;
          const unitAfterKp = priceAfterKp(unit);
          const unitAfterGst = applyGst(unitAfterKp, gst);
          return total + unitAfterGst * item.quantity;
        }, 0);

        // Original subtotal (GST-inclusive, without KP discount)
        const originalSubtotal = itemsToCheckout.reduce((total, item) => {
          const unit = item.variant?.price || 0;
          const gst = item.variant?.gstPercentage;
          const unitAfterGst = applyGst(unit, gst);
          return total + unitAfterGst * item.quantity;
        }, 0);

        // KP discount amount as difference between original GST-inclusive and member GST-inclusive
        const kpDiscountAmount = Math.max(originalSubtotal - subtotal, 0);

        // Shipping rule based on GST-inclusive subtotal
        const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500

        // Final totals
        const finalTotal = subtotal + shipping;
        const originalTotal = originalSubtotal + shipping;

        dispatch(
          updateOrderSummary({
            subtotal,
            tax: 0,
            shipping,
            total: finalTotal,
            kpDiscountPercentage,
            kpDiscountAmount,
            originalTotal,
          })
        );
      } catch (error) {
        console.error("Error calculating order summary:", error);
      }
    };

    calculateOrderSummary();
  }, [cartItems, buyNowItem, dispatch, navigate, user, isAuthenticated]);

  if (cartItems.length === 0 && !buyNowItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto py-16 px-4">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to add items to your cart
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/all-products")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Checkout Progress */}
      <div className="max-w-4xl mx-auto pt-8 pb-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div
              className={`h-1 w-full ${
                currentStep >= 1 ? "bg-green-600" : "bg-gray-200"
              }`}
            />
          </div>
          <div className="flex-1">
            <div
              className={`h-1 w-full ${
                currentStep >= 2 ? "bg-green-600" : "bg-gray-200"
              }`}
            />
          </div>
          <div className="flex-1">
            <div
              className={`h-1 w-full ${
                currentStep >= 3 ? "bg-green-600" : "bg-gray-200"
              }`}
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-center flex-1">
            <span
              className={`text-sm ${
                currentStep === 1
                  ? "text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              Select Address & Items
            </span>
          </div>
          <div className="text-center flex-1">
            <span
              className={`text-sm ${
                currentStep === 2
                  ? "text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              Review Order
            </span>
          </div>
          <div className="text-center flex-1">
            <span
              className={`text-sm ${
                currentStep === 3
                  ? "text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              Payment
            </span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {currentStep === 1 && <SelectStep />}
        {currentStep === 2 && <OrderReview />}
        {currentStep === 3 && <Payment />}
      </div>
    </div>
  );
};
