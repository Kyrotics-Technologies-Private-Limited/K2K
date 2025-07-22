import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setStep,
  setPaymentMethod,
  setProcessing,
  resetCheckout,
} from "../../store/slices/checkoutSlice";
import { orderApi } from "../../services/api/orderApi";
import { deleteCart, removeCartItem } from "../../store/slices/cartSlice";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAddress, paymentMethod, isProcessing } =
    useAppSelector((state) => state.checkout);
  const { activeCartId, cartItems, buyNowItem } = useAppSelector((state) => state.cart);
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;

  // Local order summary calculation for itemsToCheckout
  const localOrderSummary = useMemo(() => {
    const subtotal = itemsToCheckout.reduce((total, item) => {
      return total + (item.variant?.price || 0) * item.quantity;
    }, 0);
    const tax = 0; // GST removed
    const shipping = subtotal > 500 ? 0 : 40;
    return {
      subtotal,
      tax,
      shipping,
      total: subtotal + shipping,
    };
  }, [itemsToCheckout]);

  const [error, setLocalError] = useState<string | null>(null);

  const handleBack = () => {
    dispatch(setStep(2));
  };

  const handlePaymentMethodChange = (method: "cod" | "online") => {
    dispatch(setPaymentMethod(method));
    setLocalError(null);
  };

      console.log("cartItems:", cartItems);


  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      setLocalError("Please select a payment method");
      return;
    }

    if (!selectedAddress) {
      setLocalError("Missing required information");
      return;
    }

    try {
      dispatch(setProcessing(true));
      setLocalError(null);

      // Create order payload
      const orderPayload = {
        address_id: selectedAddress.id || "", // Add this line to fix the error
        address: {
          id: selectedAddress.id || "",
          user_id: selectedAddress.userId || "",
          first_name: selectedAddress.name || "",
          last_name: "", // You can split name if needed
          street: selectedAddress.appartment || "",
          city: "", // Fill if you have city
          state: selectedAddress.state,
          postal_code: selectedAddress.pincode,
          country: selectedAddress.country,
          phone: selectedAddress.phone,
          email: "", // Fill if you have email
          appartment: selectedAddress.appartment,
          name: selectedAddress.name,
          address: selectedAddress.address,
          pincode: selectedAddress.pincode,
        },
        items: itemsToCheckout.map((item) => ({
          product_id: item.productId, // Changed from productId to product_id
          variant_id: item.variantId, // Changed from variantId to variant_id
          quantity: item.quantity,
          name: item.product?.name || "",
          image: item.product?.images?.main || "",
          variant_name: item.variant?.weight || "",
          unit_price: item.variant?.price || 0,
        })),
        payment_id: "asdasdlfkjlkasdfioeklj",
        total_amount: localOrderSummary.total,
        payment_method: paymentMethod,
      };

      console.log("Order payload:", orderPayload);

      // Place order
      const response = await orderApi.createOrder(orderPayload);

      // Remove buy now item from cart if needed (option C)
      if (buyNowItem) {
        const removeInfo = sessionStorage.getItem("buyNowRemoveFromCart");
        if (removeInfo && activeCartId) {
          const { productId, variantId } = JSON.parse(removeInfo);
          // Find the cart item with matching productId and variantId
          const cartItem = cartItems.find(
            (item) =>
              item.productId === productId && item.variantId === variantId
          );
          if (cartItem) {
            await dispatch(
              removeCartItem({
                cartId: activeCartId,
                itemId: cartItem.id,
              })
            ).unwrap();
          }
          sessionStorage.removeItem("buyNowRemoveFromCart");
        }
      }

      // Clear cart only if not buy now
      if (!buyNowItem && activeCartId) {
        await dispatch(deleteCart(activeCartId)).unwrap();
      }
      // Reset checkout state
      dispatch(resetCheckout());

      // If online payment, redirect to payment gateway
      if (paymentMethod === "online" && response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        // For COD, redirect to success page and pass paymentMethod and total
        navigate(`/order-success`, {
          state: { paymentMethod, orderTotal: localOrderSummary.total },
        });
      }
    } catch (err) {
      setLocalError("Failed to place order. Please try again.");
      console.error("Order placement error:", err);
      dispatch(setProcessing(false));
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* Final Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Items</span>
            <span>{itemsToCheckout.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{localOrderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {localOrderSummary.shipping === 0
                ? "Free"
                : `₹${localOrderSummary.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>₹{localOrderSummary.total.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
      </div>


      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

        <div className="space-y-4">

          {/* Online Payment */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "online"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => handlePaymentMethodChange("online")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "online"}
                onChange={() => handlePaymentMethodChange("online")}
                className="button h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <div className="ml-3">
                <label className="button font-medium text-gray-900">
                  Online Payment
                </label>
                <p className="text-gray-500 text-sm">
                  Pay securely with UPI, Card, or Net Banking
                </p>
              </div>
            </div>
          </div>

          {/* Cash on Delivery */}
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "cod"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => handlePaymentMethodChange("cod")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => handlePaymentMethodChange("cod")}
                className="button h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <div className="ml-3">
                <label className="button font-medium text-gray-900">
                  Cash on Delivery
                </label>
                <p className="text-gray-500 text-sm">
                  Pay when your order arrives
                </p>
              </div>
            </div>
          </div>
 
        </div>
      </div>

      

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          disabled={isProcessing}
        >
          Back to Review
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !paymentMethod}
          className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            `Place Order (₹${localOrderSummary.total.toFixed(2)})`
          )}
        </button>
      </div>
    </div>
  );
};
