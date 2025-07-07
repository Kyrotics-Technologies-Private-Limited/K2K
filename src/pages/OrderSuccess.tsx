import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/store";


export const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderTotal, paymentMethod } = location.state || {};
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              Order Placed Successfully!
            </h2>
            <p className="mt-2 text-gray-600">
              Thank you for your order. We'll send you a confirmation email
              shortly.
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ₹{localOrderSummary.subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Payment Method</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">What's Next?</h3>
            <ul className="mt-4 space-y-4 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="text-green-500">✓</span>
                <span>
                  You'll receive an order confirmation email with order details
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500">✓</span>
                <span>We'll notify you once your order has been shipped</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500">✓</span>
                <span>
                  You can track your order status in the Orders section
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="button flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/all-products")}
              className="button flex-1 bg-white text-green-600 px-4 py-2 rounded-md border border-green-600 hover:bg-green-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
