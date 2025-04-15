// src/pages/OrdersPage.tsx
import { useState, useEffect, JSX } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, cancelOrder, getTracking } from '../services/api/orderApi';
import { Order, OrderItem, TrackingInfo } from '../types/order';
import { Loader2, Package, PackageCheck, PackageX, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        console.log('Orders API response:', response); // Debug line
        const ordersData = Array.isArray(response.data) ? response.data : [];
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err); // Debug line
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        setOrders([]); // Ensure orders is always an array
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-yellow-500" />;
      case 'delivered':
        return <PackageCheck className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <PackageX className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <Package className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">You haven't placed any orders yet.</p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              getStatusIcon={getStatusIcon} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  getStatusIcon: (status: string) => JSX.Element;
}

const OrderCard = ({ order, getStatusIcon }: OrderCardProps) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {getStatusIcon(order.status)}
          <div>
            <h2 className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">${order.total_amount.toFixed(2)}</p>
          <p className={`text-sm capitalize ${
            order.status === 'cancelled' ? 'text-red-600' : 
            order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'
          }`}>
            {order.status}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
        <OrderItemsPreview items={order.items} />
        <OrderActions order={order} />
      </div>
    </div>
  );
};

interface OrderItemsPreviewProps {
  items: OrderItem[];
}

const OrderItemsPreview = ({ items }: OrderItemsPreviewProps) => (
  <div>
    <h3 className="mb-2 text-sm font-medium text-gray-900">Items</h3>
    <div className="space-y-3">
      {items.slice(0, 3).map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-md">
            <img
              src={item.image || '/placeholder-product.jpg'}
              alt={item.name}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
      {items.length > 3 && (
        <p className="text-sm text-gray-500">+{items.length - 3} more items</p>
      )}
    </div>
  </div>
);

interface OrderActionsProps {
  order: Order;
}

const OrderActions = ({ order }: OrderActionsProps) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [showTracking, setShowTracking] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      setIsCancelling(true);
      await cancelOrder(order.id);
      // In a real app, you might want to update the local state or refetch orders
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to cancel order');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleTrackOrder = async () => {
    if (trackingInfo) {
      setShowTracking(!showTracking);
      return;
    }
    
    try {
      const { data } = await getTracking(order.id);
      setTrackingInfo(data);
      setShowTracking(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to fetch tracking info');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-900">Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/orders/${order.id}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            View Details
          </Link>
          
          <button
            onClick={handleTrackOrder}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            {showTracking ? 'Hide Tracking' : 'Track Order'}
          </button>
          
          {order.status === 'processing' && (
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>
      </div>
      
      {showTracking && trackingInfo && (
        <div className="p-4 bg-gray-50 rounded-md">
          <h4 className="font-medium text-gray-900">Tracking Information</h4>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            <p>Status: <span className="capitalize">{trackingInfo.status}</span></p>
            <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;