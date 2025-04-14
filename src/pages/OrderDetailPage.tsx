// src/pages/OrderDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, cancelOrder, getTracking } from '../services/orderApi';
import { useAuth } from '../context/AuthContext';
import { Order, TrackingInfo } from '../types/order';
import { Loader2, Package, PackageCheck, PackageX, Truck, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) return;
        const { data } = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      if (!id) return;
      setIsCancelling(true);
      await cancelOrder(id);
      // Refresh order data
      const { data } = await getOrder(id);
      setOrder(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to cancel order');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleTrackOrder = async () => {
    try {
      if (!id) return;
      const { data } = await getTracking(id);
      setTrackingInfo(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to fetch tracking info');
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

  if (!order) {
    return (
      <div className="p-4 text-gray-600 bg-gray-50 rounded-md">
        Order not found
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link 
        to="/orders" 
        className="flex items-center mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Orders
      </Link>
      
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col justify-between pb-6 mb-6 border-b sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h1>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Order Items</h2>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-100 rounded-md">
                      <img
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-80">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Order Actions</h2>
            
            <div className="space-y-4">
              <button
                onClick={handleTrackOrder}
                className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
              >
                Track Order
              </button>
              
              {order.status === 'processing' && (
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
            
            {trackingInfo && (
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">Tracking Information</h3>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium capitalize">{trackingInfo.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated delivery: {trackingInfo.estimatedDelivery}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;