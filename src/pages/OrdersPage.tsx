import React, { useEffect, useState } from "react";
import { orderApi } from "../services/api/orderApi";
import { Order, OrderItem } from "@/types/order";
import { format } from "date-fns";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await orderApi.getAllOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching admin orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">All Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md border border-green-200 p-5"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Order ID: {order.id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Created: {format(new Date(order.created_at), "PPPpp")}
                  </p>
                </div>

                <div className="text-right mt-2 sm:mt-0">
                  <p className="text-lg font-bold text-green-700">
                    ₹{order.total_amount}
                  </p>
                  <span
                    className={`mt-1 inline-block px-3 py-1 text-sm rounded-full ${
                      order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Expand Button */}
              <button
                className="text-blue-600 mt-4 text-sm hover:underline"
                onClick={() =>
                  setExpandedOrderId((prev) =>
                    prev === order.id ? null : order.id
                  )
                }
              >
                {expandedOrderId === order.id ? "Hide Items" : "View Items"}
              </button>

              {/* Order Items */}
              {expandedOrderId === order.id && (
                <div className="mt-4 border-t pt-4 space-y-3">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: OrderItem) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start bg-gray-50 rounded p-3"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            Product ID: {item.product_id}
                          </p>
                          {item.variant_id && (
                            <p className="text-sm text-gray-500">
                              Variant: {item.variant_id}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-green-700">
                            ₹{item.unit_price}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No items found.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default AdminOrders;
