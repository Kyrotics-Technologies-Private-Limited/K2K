import { useAppDispatch, useAppSelector } from "../../store/store";
import { setStep } from "../../store/slices/checkoutSlice";
import { useMemo } from "react";

export const OrderReview = () => {
  const dispatch = useAppDispatch();
  const { selectedAddress } = useAppSelector((state) => state.checkout);
  const { buyNowItem, cartItems } = useAppSelector((state) => state.cart);
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

  const handleBack = () => {
    dispatch(setStep(1));
  };

  const handleContinue = () => {
    dispatch(setStep(3));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Address Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <div className="text-gray-600">
              <p className="font-medium">{selectedAddress?.name}</p>
              <p>{selectedAddress?.phone}</p>
              {selectedAddress?.appartment && (
                <p>{selectedAddress.appartment}</p>
              )}
              <p>{selectedAddress?.adress}</p>
              <p>
                {selectedAddress?.state}, {selectedAddress?.pincode}
              </p>
              <p>{selectedAddress?.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {itemsToCheckout.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 py-4 border-b last:border-0"
            >
              {item.product && (
                <>
                  <img
                    src={item.product.images.main}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    {item.variant && (
                      <p className="text-sm text-gray-500">
                        Weight: {item.variant.weight}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₹{(item.variant?.price || 0) * item.quantity}
                    </p>
                    {item.variant?.discount && item.variant.discount > 0 && (
                      <p className="text-sm text-green-600">
                        {item.variant.discount}% off
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal <span className="text-xs ">(including GST)</span></span>
            <span>₹{localOrderSummary.subtotal.toFixed(2)}</span>
          </div>
          {/* <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{localOrderSummary.tax.toFixed(2)}</span>
          </div> */}
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
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="button px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Selection
        </button>
        <button
          onClick={handleContinue}
          className="button px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};
