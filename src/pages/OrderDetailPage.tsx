import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchOrderById, cancelOrder } from "../store/slices/orderSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  PackageOpen,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Ban,
} from "lucide-react";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <PackageOpen className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      case "cancelled":
        return <Ban className="h-5 w-5" />;
      default:
        return <PackageOpen className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-700 text-white";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;

    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await dispatch(cancelOrder(order.id)).unwrap();
      } catch (error) {
        console.error("Failed to cancel order:", error);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Error Loading Order
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {error || "Order not found"}
        </p>
        <Button onClick={() => navigate("/orders")} variant="outline">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/orders")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600">
            Order #{order.id.slice(-6).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {order.items?.map((item: any, idx: number) => {
                  // Try to get the image and name from possible new locations
                  const productImage =
                    item.product?.images?.main || null;
                  const productName = item.name || item.product?.name || "Product";
                  return (
                    <div
                      key={item.id || idx}
                      className="flex gap-4 p-4 rounded-lg border bg-gray-50 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={productName}
                            className="w-24 h-24 object-cover rounded-md border"
                          />
                        ) : (
                          <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md text-gray-400 border">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">
                            {productName}
                          </h3>
                          {item.variant && (
                            <p className="text-xs text-gray-500 mb-1">
                              {item.variant?.weight}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mb-1">
                            Quantity:{" "}
                            <span className="font-medium text-gray-700">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                        <div className="mt-2">
                          <span className="text-base font-bold text-green-700">
                            ₹{item.quantity * item.variant?.price}
                          </span>
                          {item.variant?.price && (
                            <span className="ml-2 text-xs text-gray-400">
                              (₹{item.variant?.price} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          {order.address && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {order.address.first_name} {order.address.last_name}
                  </p>
                  <p className="text-gray-600">{order.address.street}</p>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.state}{" "}
                    {order.address.postal_code}
                  </p>
                  <p className="text-gray-600">{order.address.phone}</p>
                  {order.address.email && (
                    <p className="text-gray-600">{order.address.email}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Order Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Order Date</span>
                  <span>{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Items</span>
                  <span>{order.items?.length ?? 0} items</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.total_amount}</span>
                </div>
                {order.tax > 0 && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{order.tax}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{order.shipping_fee}</span>
                </div>
                <div className="flex justify-between py-2 font-medium">
                  <span>Total</span>
                  <span>₹{order.total_amount }</span>
                </div>

                {/* Payment Information */}
                {order.payment && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">
                      Payment Information
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Method</span>
                        <span className="capitalize">
                          {order.payment.method}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status</span>
                        <span className="capitalize">
                          {order.payment.status}
                        </span>
                      </div>
                      {order.payment.transaction_id && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Transaction ID</span>
                          <span className="font-mono">
                            {order.payment.transaction_id}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {order.status.toLowerCase() === "processing" && (
                <Button
                  variant="destructive"
                  className="w-full mt-6"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
