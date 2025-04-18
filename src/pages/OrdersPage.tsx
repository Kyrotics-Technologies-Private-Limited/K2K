// src/pages/OrdersPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../services/api/orderApi';
import { Order } from '../types/order';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderApi.getOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No orders found</h2>
        <Button onClick={() => navigate('/all-products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <div>
                <h3 className="font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.created_at), 'MMMM d, yyyy h:mm a')}
                </p>
              </div>
              <Badge className={statusColors[order.status]}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  <ul className="space-y-1">
                    {order.items?.slice(0, 3).map(item => (
                      <li key={item.id} className="text-sm">
                        {item.quantity} × Product {item.product_id.slice(0, 6)}
                      </li>
                    ))}
                    {order.items && order.items.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{order.items.length - 3} more items
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Total Amount</h4>
                  <p className="font-semibold">
                    ₹{order.total_amount.toLocaleString('en-IN')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Payment</h4>
                  <p className="text-sm">
                    {order.payment_id ? `Paid (${order.payment_id.slice(0, 8)})` : 'Payment pending'}
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => handleViewOrder(order.id)}
              >
                View Details
              </Button>
              {order.status === 'pending' && (
                <Button 
                  variant="destructive"
                  onClick={async () => {
                    try {
                      await orderApi.cancelOrder(order.id);
                      setOrders(orders.map(o => 
                        o.id === order.id ? {...o, status: 'cancelled'} : o
                      ));
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Failed to cancel order');
                    }
                  }}
                >
                  Cancel Order
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};