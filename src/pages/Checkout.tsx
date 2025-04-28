import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SelectStep } from "../components/checkout/SelectStep";
import { OrderReview } from "../components/checkout/OrderReview";
import { Payment } from "../components/checkout/Payment";
import { updateOrderSummary } from "../store/slices/checkoutSlice";
import { ShoppingBag } from "lucide-react";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.checkout);
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (cartItems.length === 0) {
      navigate("/all-products");
      return;
    }

    // Calculate order summary
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.variant?.price || 0) * item.quantity;
    }, 0);

    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500

    dispatch(
      updateOrderSummary({
        subtotal,
        tax,
        shipping,
        total: subtotal + tax + shipping,
      })
    );
  }, [cartItems, dispatch, navigate, user]);

  if (cartItems.length === 0) {
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
