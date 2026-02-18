import { useAppDispatch, useAppSelector } from "../../store/store";
import { setStep } from "../../store/slices/checkoutSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { orderApi } from "../../services/api/orderApi";

export const OrderReview = () => {
  const dispatch = useAppDispatch();
  const { selectedAddress, orderSummary } = useAppSelector((state) => state.checkout);
  const { buyNowItem, cartItems } = useAppSelector((state) => state.cart);
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;
  const [isCheckingStock, setIsCheckingStock] = useState(false);

  // Check if user is a KP member
  const isKPMember = orderSummary.kpDiscountPercentage > 0 && orderSummary.kpDiscountAmount > 0;

  // Pricing helpers aligned with ProductDetail: apply KP discount first, then GST
  const applyGst = (amount: number, gstPercentage?: number) => {
    const gst = gstPercentage ?? 0;
    return Math.floor(amount + (amount * gst) / 100);
  };
  const getRegularPriceWithGST = (regularPrice: number, gstPercentage?: number) =>
    applyGst(regularPrice, gstPercentage);
  const getKPMemberPriceWithGST = (regularPrice: number, gstPercentage?: number) =>
    applyGst(
      orderSummary.kpDiscountPercentage > 0
        ? Math.floor(regularPrice - (regularPrice * orderSummary.kpDiscountPercentage) / 100)
        : regularPrice,
      gstPercentage
    );

  const handleBack = () => {
    dispatch(setStep(1));
  };

  const handleContinue = async () => {
    setIsCheckingStock(true);

    try {
      // Prepare items for stock validation
      const itemsForValidation = itemsToCheckout.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      // Validate stock using server endpoint
      const stockValidation = await orderApi.validateOrderStock(
        itemsForValidation
      );

      if (!stockValidation.valid) {
        // Show stock issues
        const stockIssues = stockValidation.results
          .filter((result: any) => !result.valid)
          .map((result: any) => {
            const item = itemsToCheckout.find(
              (i) =>
                i.productId === result.productId &&
                i.variantId === result.variantId
            );
            const itemName = item?.product?.name || "Item";
            const weight = result.weight || item?.variant?.weight || "Variant";

            if (result.error === "Variant is out of stock") {
              return `${itemName} (${weight}) - Out of stock`;
            } else if (result.error === "Insufficient stock") {
              return `${itemName} (${weight}) - Only ${result.currentStock} available. Requested: ${result.requestedQuantity}`;
            } else {
              return `${itemName} (${weight}) - ${result.error}`;
            }
          });

        // Show all stock issues
        stockIssues.forEach((issue: string) => toast.error(issue));
        return;
      }

      // All stock checks passed, proceed to payment
      dispatch(setStep(3));
    } catch (error) {
      console.error("Error checking stock:", error);
      toast.error("Failed to verify stock availability. Please try again.");
    } finally {
      setIsCheckingStock(false);
    }
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
              <p>{selectedAddress?.address}</p>
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
                    {/* Regular price with GST (crossed out for members) */}
                    <p className="text-sm text-gray-500 line-through">
                      ₹{(
                        getRegularPriceWithGST(item.variant?.price || 0, item.variant?.gstPercentage) * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                    {/* KP Member Price (with GST) */}
                    {isKPMember && (
                      <p className="text-sm text-green-600">
                        KP Member: ₹{(
                          getKPMemberPriceWithGST(item.variant?.price || 0, item.variant?.gstPercentage) * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    )}
                    {/* Regular price when not a member (with GST) */}
                    {!isKPMember && (
                      <p className="text-lg font-semibold">
                        ₹{(
                          getRegularPriceWithGST(item.variant?.price || 0, item.variant?.gstPercentage) * item.quantity
                        ).toLocaleString("en-IN")}
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
            <span>
              Subtotal <span className="text-xs ">(including GST)</span>
            </span>
            <span>₹{orderSummary.subtotal.toFixed(2)}</span>
          </div>
          
          {/* Show original subtotal for KP members */}
          {isKPMember && (
            <div className="flex justify-between text-gray-500">
              <span>Original Subtotal</span>
              <span className="line-through">₹{(orderSummary.subtotal + orderSummary.kpDiscountAmount).toFixed(2)}</span>
            </div>
          )}
          
          {/* <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{localOrderSummary.tax.toFixed(2)}</span>
          </div> */}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {orderSummary.shipping === 0
                ? "Free"
                : `₹${orderSummary.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <div className="text-right">
              {isKPMember ? (
                <>
                  <span className="text-green-600">₹{orderSummary.total.toFixed(2)}</span>
                  <div className="text-sm text-gray-500 line-through">
                    ₹{orderSummary.originalTotal.toFixed(2)}
                  </div>
                </>
              ) : (
                <span>₹{orderSummary.total.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          {/* Show total savings from KP membership */}
          {isKPMember && (
            <div className="flex justify-between text-green-600 font-medium pt-2 border-t">
              <span>Total Saved with KP Membership</span>
              <span>₹{orderSummary.kpDiscountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
        <button
          onClick={handleBack}
          className="button w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Selection
        </button>
        <button
          onClick={handleContinue}
          disabled={isCheckingStock}
          className="w-full sm:w-auto px-4 py-2.5 sm:py-3 sm:px-6 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCheckingStock ? "Checking Stock..." : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
};
