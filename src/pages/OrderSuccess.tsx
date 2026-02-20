import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { orderApi } from "../services/api/orderApi";
// import { toast } from "react-toastify";



export const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderTotal, paymentMethod } = location.state || {};
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get orderId from URL query param
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      orderApi.getOrderById(orderId)
        .then((data) => setOrder(data))
        .catch((_err) => setError("Failed to fetch order details."))
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  // Local fallback for COD (old flow)
  const total = order?.total_amount || orderTotal;
  const payment = order?.payment_method || paymentMethod;

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
            {loading ? (
              <div>Loading order details...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Total</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{total?.toFixed(2)}
                  </dd>
                </div>

                {/* KP Member Discount Information */}
                {order?.kp_discount_amount && order.kp_discount_amount > 0 && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <dt className="text-sm">KP Member Discount ({order.kp_discount_percentage}%)</dt>
                      <dd className="text-sm font-medium">-₹{order.kp_discount_amount.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <dt className="text-sm">Original Total</dt>
                      <dd className="text-sm line-through">₹{order.original_total?.toFixed(2)}</dd>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Payment Method</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {payment === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </dd>
                </div>
                {order?.status && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Order Status</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {order.status}
                    </dd>
                  </div>
                )}
              </dl>
            )}
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
              className="cursor-pointer button flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/all-products")}
              className="cursor-pointer button flex-1 bg-white text-green-600 px-4 py-2 rounded-md border border-green-600 hover:bg-green-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
