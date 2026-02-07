import{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchOrders } from "../store/slices/orderSlice";
import { orderApi } from "../services/api/orderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageOpen, ShoppingCart, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order
  );
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCancelOrder = async (orderId: string) => {
    // Find the order to check its status
    const order = orders?.find(o => o.id === orderId);
    if (!order) return;
    
    // Check if order can be cancelled
    const orderStatus = order.status.toLowerCase();
    const nonCancellableStatuses = ['cancelled', 'delivered', 'shipped'];
    
    if (nonCancellableStatuses.includes(orderStatus)) {
      toast.error(`Order cannot be cancelled. Current status: ${order.status}`);
      return;
    }
    
    // Show confirmation popup
    setCancellingOrderId(orderId);
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = async () => {
    if (!cancellingOrderId) return;
    
    try {
      await orderApi.cancelOrder(cancellingOrderId);
      toast.success("Order cancelled successfully!");
      // Refresh orders list
      dispatch(fetchOrders());
    } catch (error: any) {
      console.error("Failed to cancel order:", error);
      const errorMessage = error?.response?.data?.message || "Failed to cancel order. Please try again.";
      toast.error(errorMessage);
    } finally {
      setCancellingOrderId(null);
      setShowCancelConfirm(false);
    }
  };

  const cancelCancelOrder = () => {
    setCancellingOrderId(null);
    setShowCancelConfirm(false);
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
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

  // const formatDate = (date: string) => {
  //   return new Date(date).toLocaleDateString("en-IN", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });
  // };
  // Helper functions for date and time formatting
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";
    try {
      // Handle Firestore Timestamp
      if (timestamp?.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }
      // Handle ISO string or number
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "-";
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  };

  // Sort orders by created_at descending (latest first)
  const sortedOrders = [...(orders || [])].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    return dateB - dateA;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Error Loading Orders
        </h2>
        <p className="text-gray-600 text-center mb-4">{error}</p>
        <Button onClick={() => dispatch(fetchOrders())} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No Orders Found
        </h2>
        <p className="text-gray-600 text-center mb-4">
          You haven't placed any orders yet.
        </p>
        <Button onClick={() => navigate("/All-products")} variant="default">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>
      <div className="grid gap-6">
        {sortedOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Order #{order.id.slice(-6).toUpperCase()}
              </CardTitle>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Order Date
                  </p>
                  <p className="text-sm">{formatDate(order.created_at)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Items</p>
                  <p className="text-sm">{order.items?.length ?? 0} items</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Total Amount
                  </p>
                  <p className="text-sm">₹{order.total_amount}</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="button"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <PackageOpen className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  {order.status.toLowerCase() !== "cancelled" && 
                   order.status.toLowerCase() !== "delivered" && 
                   order.status.toLowerCase() !== "shipped" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelOrder(order.id)}
                      className="button"
                    >
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cancel Order Confirmation Popup */}
      {showCancelConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Cancel Order
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={cancelCancelOrder}
                className="button"
              >
                No, Keep Order
              </Button>
              <Button
                variant="destructive"
                onClick={confirmCancelOrder}
                className="button"
              >
                Yes, Cancel Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
