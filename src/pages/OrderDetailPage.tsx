// src/pages/OrderDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Order,
  OrderStatus,
  OrderItem,
  OrderAddress,
  OrderPayment,
  TrackingInfo,
} from "../types/order";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-gray-100 text-gray-800",
};

const paymentMethodIcons = {
  card: "💳",
  upi: "📱",
  netbanking: "🏦",
  wallet: "💰",
};

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await mockFetchOrder(orderId!);
        setOrder(response);

        if (response.status === "shipped" || response.status === "delivered") {
          const tracking = await mockFetchTrackingInfo(response.id);
          setTrackingInfo(tracking);
        }
      } catch (err) {
        setError("Failed to load order details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderTotal = (order: Order) => {
    return (
      order.total_amount ||
      (order.subtotal || 0) + (order.tax || 0) + (order.shipping_fee || 0)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Order not found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          We couldn't find the order you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/orders"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Your Orders
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{order.id.substring(0, 8)}...
          </h1>
          <div className="mt-2 md:mt-0">
            <span
              className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                statusColors[order.status]
              }`}
            >
              {statusLabels[order.status]}
            </span>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-sm font-medium">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Placed</p>
                      <p className="text-sm font-medium">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    {order.tracking_number && (
                      <div>
                        <p className="text-sm text-gray-500">Tracking Number</p>
                        <p className="text-sm font-medium">
                          {order.tracking_number}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-lg font-medium text-gray-900 mt-6 mb-4">
                  Shipping Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {order.address ? (
                    <div>
                      <p className="font-medium">
                        {order.address.first_name} {order.address.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.address.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.address.city}, {order.address.state}{" "}
                        {order.address.postal_code}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.address.country}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Phone: {order.address.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        Email: {order.address.email}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No shipping information available
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Payment Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {order.payment ? (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Method:</span>
                        <span className="text-sm font-medium">
                          {paymentMethodIcons[order.payment.method]}{" "}
                          {order.payment.method.charAt(0).toUpperCase() +
                            order.payment.method.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className="text-sm font-medium">
                          {order.payment.status.charAt(0).toUpperCase() +
                            order.payment.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Amount:</span>
                        <span className="text-sm font-medium">
                          ${order.payment.amount.toFixed(2)}
                        </span>
                      </div>
                      {order.payment.transaction_id && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Transaction ID:
                          </span>
                          <span className="text-sm font-medium">
                            {order.payment.transaction_id}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No payment information available
                    </p>
                  )}
                </div>

                <h2 className="text-lg font-medium text-gray-900 mt-6 mb-4">
                  Order Summary
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-start">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover mr-3"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            {item.variant_name && (
                              <p className="text-xs text-gray-500">
                                {item.variant_name}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          ${item.unit_price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Subtotal</span>
                      <span className="text-sm">
                        ${order.subtotal?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Shipping</span>
                      <span className="text-sm">
                        ${order.shipping_fee?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tax</span>
                      <span className="text-sm">
                        ${order.tax?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${getOrderTotal(order).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(order.status === "shipped" || order.status === "delivered") && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Tracking Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {trackingInfo ? (
                    <div>
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Carrier</p>
                          <p className="text-sm font-medium">
                            {trackingInfo.carrier || "Standard Shipping"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Tracking Number
                          </p>
                          <p className="text-sm font-medium">
                            {trackingInfo.tracking_number}
                          </p>
                        </div>
                        {trackingInfo.estimated_delivery && (
                          <div>
                            <p className="text-sm text-gray-500">
                              Estimated Delivery
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(trackingInfo.estimated_delivery)}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        {trackingInfo.history.map((event, index) => (
                          <div key={index} className="flex">
                            <div className="flex flex-col items-center mr-4">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  index === 0 ? "bg-green-500" : "bg-gray-300"
                                }`}
                              ></div>
                              {index < trackingInfo.history.length - 1 && (
                                <div className="w-px h-8 bg-gray-300"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="text-sm font-medium">
                                {event.status}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(event.timestamp)}
                              </p>
                              {event.location && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {event.location}
                                </p>
                              )}
                              {event.description && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Loading tracking information...
                    </p>
                  )}
                </div>
              </div>
            )}

            {order.status === "delivered" && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Support
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Need Help?
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        If you have any questions about your order, our customer
                        service team is happy to help.
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Contact Support
                      </button>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Return Items
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        If you need to return any items, you can start the
                        return process here.
                      </p>
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        Start Return
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data functions
const mockFetchOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAddresses: OrderAddress[] = [
        {
          id: "addr_1",
          user_id: "user_1",
          first_name: "John",
          last_name: "Doe",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          postal_code: "10001",
          country: "USA",
          phone: "+1 (555) 123-4567",
          email: "john.doe@example.com",
        },
        {
          id: "addr_2",
          user_id: "user_2",
          first_name: "Jane",
          last_name: "Smith",
          street: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          postal_code: "90001",
          country: "USA",
          phone: "+1 (555) 987-6543",
          email: "jane.smith@example.com",
        },
      ];

      const mockPayments: OrderPayment[] = [
        {
          id: "pay_1",
          method: "card",
          status: "completed",
          amount: 125.97,
          transaction_id: "txn_123456789",
          created_at: "2023-05-15T10:30:00Z",
        },
        {
          id: "pay_2",
          method: "upi",
          status: "completed",
          amount: 24.99,
          transaction_id: "txn_987654321",
          created_at: "2023-05-14T14:45:00Z",
        },
        {
          id: "pay_3",
          method: "netbanking",
          status: "completed",
          amount: 69.98,
          transaction_id: "txn_192837465",
          created_at: "2023-05-13T09:15:00Z",
        },
      ];

      const mockItems: OrderItem[] = [
        {
          id: "item_1",
          order_id: "order_1",
          product_id: "prod_1",
          variant_id: "var_1",
          quantity: 1,
          unit_price: 99.99,
          created_at: "2023-05-15T10:30:00Z",
          name: "Ghee",
          image:
            "https://media.istockphoto.com/id/1413268611/photo/ghee-butter-oil.jpg?s=2048x2048&w=is&k=20&c=K18ttyAf75d02uDCoKWe7R8-AleXS-BxsvsRqthxRbA=",
          variant_name: "200gm",
        },
        {
          id: "item_2",
          order_id: "order_1",
          product_id: "prod_2",
          quantity: 2,
          unit_price: 12.99,
          created_at: "2023-05-15T10:30:00Z",
          name: "Honey",
          image:
            "https://media.istockphoto.com/id/1093966722/photo/honey-jar-with-honey-dipper-shot-on-rustic-wooden-table.jpg?s=612x612&w=is&k=20&c=HZ-eIz4KEaS7J1h72xmzt8sOtKNlNCgjhOJt8nBj2G0=",
        },
        {
          id: "item_3",
          order_id: "order_2",
          product_id: "prod_3",
          quantity: 1,
          unit_price: 24.99,
          created_at: "2023-05-14T14:45:00Z",
          name: "Organic Ghee",
          image:
            "https://media.istockphoto.com/id/1413268611/photo/ghee-butter-oil.jpg?s=2048x2048&w=is&k=20&c=K18ttyAf75d02uDCoKWe7R8-AleXS-BxsvsRqthxRbA=",
          variant_name: "Clear",
        },
      ];

      const mockOrders: Order[] = [
        {
          id: "order_1",
          user_id: "user_1",
          address_id: "addr_1",
          address: mockAddresses[0],
          total_amount: 125.97,
          subtotal: 125.97,
          tax: 0,
          shipping_fee: 0,
          status: "pending",
          payment_id: "pay_1",
          payment: mockPayments[0],
          items: mockItems.filter((item) => item.order_id === "order_1"),
          created_at: "2023-05-15T10:30:00Z",
          updated_at: "2023-05-15T10:30:00Z",
        },
        {
          id: "order_2",
          user_id: "user_2",
          address_id: "addr_2",
          address: mockAddresses[1],
          total_amount: 24.99,
          subtotal: 24.99,
          tax: 0,
          shipping_fee: 0,
          status: "confirmed",
          payment_id: "pay_2",
          payment: mockPayments[1],
          items: mockItems.filter((item) => item.order_id === "order_2"),
          created_at: "2023-05-14T14:45:00Z",
          updated_at: "2023-05-14T14:45:00Z",
        },
        {
          id: "order_3",
          user_id: "user_1",
          address_id: "addr_1",
          address: mockAddresses[0],
          total_amount: 69.98,
          subtotal: 69.98,
          tax: 0,
          shipping_fee: 0,
          status: "processing",
          payment_id: "pay_3",
          payment: mockPayments[2],
          items: [
            {
              id: "item_4",
              order_id: "order_3",
              product_id: "prod_4",
              variant_id: "var_2",
              quantity: 1,
              unit_price: 59.99,
              created_at: "2023-05-13T09:15:00Z",
              name: "Bluetooth Speaker",
              image:
                "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
              variant_name: "Blue",
            },
            {
              id: "item_5",
              order_id: "order_3",
              product_id: "prod_5",
              quantity: 1,
              unit_price: 9.99,
              created_at: "2023-05-13T09:15:00Z",
              name: "Screen Protector",
              image:
                "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
            },
          ],
          created_at: "2023-05-13T09:15:00Z",
          updated_at: "2023-05-13T09:15:00Z",
        },
        {
          id: "order_4",
          user_id: "user_2",
          address_id: "addr_2",
          address: mockAddresses[1],
          total_amount: 84.95,
          subtotal: 74.95,
          tax: 5.0,
          shipping_fee: 5.0,
          status: "shipped",
          payment_id: "pay_4",
          payment: {
            id: "pay_4",
            method: "wallet",
            status: "completed",
            amount: 84.95,
            created_at: "2023-05-10T16:20:00Z",
          },
          items: [
            {
              id: "item_6",
              order_id: "order_4",
              product_id: "prod_6",
              quantity: 1,
              unit_price: 49.99,
              created_at: "2023-05-10T16:20:00Z",
              name: "Laptop Backpack",
              image:
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
            },
            {
              id: "item_7",
              order_id: "order_4",
              product_id: "prod_7",
              quantity: 1,
              unit_price: 19.99,
              created_at: "2023-05-10T16:20:00Z",
              name: "Wireless Mouse",
              image:
                "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
            },
          ],
          created_at: "2023-05-10T16:20:00Z",
          updated_at: "2023-05-10T16:20:00Z",
          tracking_number: "SHIP123456789",
        },
        {
          id: "order_5",
          user_id: "user_1",
          address_id: "addr_1",
          address: mockAddresses[0],
          total_amount: 299.99,
          subtotal: 299.99,
          tax: 0,
          shipping_fee: 0,
          status: "delivered",
          payment_id: "pay_5",
          payment: {
            id: "pay_5",
            method: "card",
            status: "completed",
            amount: 299.99,
            transaction_id: "txn_567891234",
            created_at: "2023-05-08T11:10:00Z",
          },
          items: [
            {
              id: "item_8",
              order_id: "order_5",
              product_id: "prod_8",
              quantity: 1,
              unit_price: 299.99,
              created_at: "2023-05-08T11:10:00Z",
              name: "4K Monitor",
              image:
                "https://images.unsplash.com/photo-1546538915-a9e2c8a0c6a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
            },
          ],
          created_at: "2023-05-08T11:10:00Z",
          updated_at: "2023-05-08T11:10:00Z",
          tracking_number: "SHIP987654321",
        },
        {
          id: "order_6",
          user_id: "user_2",
          address_id: "addr_2",
          address: mockAddresses[1],
          total_amount: 149.99,
          subtotal: 149.99,
          tax: 0,
          shipping_fee: 0,
          status: "cancelled",
          payment_id: "pay_6",
          payment: {
            id: "pay_6",
            method: "card",
            status: "refunded",
            amount: 149.99,
            transaction_id: "txn_345678912",
            created_at: "2023-05-05T09:30:00Z",
          },
          items: [
            {
              id: "item_9",
              order_id: "order_6",
              product_id: "prod_9",
              quantity: 1,
              unit_price: 149.99,
              created_at: "2023-05-05T09:30:00Z",
              name: "Smart Watch",
              image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
            },
          ],
          created_at: "2023-05-05T09:30:00Z",
          updated_at: "2023-05-05T09:30:00Z",
        },
        {
          id: "order_7",
          user_id: "user_1",
          address_id: "addr_1",
          address: mockAddresses[0],
          total_amount: 89.99,
          subtotal: 79.99,
          tax: 5.0,
          shipping_fee: 5.0,
          status: "returned",
          payment_id: "pay_7",
          payment: {
            id: "pay_7",
            method: "upi",
            status: "refunded",
            amount: 89.99,
            transaction_id: "txn_789123456",
            created_at: "2023-05-01T14:20:00Z",
          },
          items: [
            {
              id: "item_10",
              order_id: "order_7",
              product_id: "prod_10",
              quantity: 1,
              unit_price: 79.99,
              created_at: "2023-05-01T14:20:00Z",
              name: "Wireless Earbuds",
              image:
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
            },
          ],
          created_at: "2023-05-01T14:20:00Z",
          updated_at: "2023-05-01T14:20:00Z",
          tracking_number: "RETURN123456",
        },
      ];
      resolve(mockOrders);
    }, 800);
  });
};

const mockFetchTrackingInfo = (orderId: string): Promise<TrackingInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockTracking: TrackingInfo = {
        order_id: orderId,
        tracking_number:
          orderId === "order_4" ? "SHIP123456789" : "SHIP987654321",
        carrier: "FedEx",
        estimated_delivery: "2023-05-15T23:59:59Z",
        status: orderId === "order_4" ? "In Transit" : "Delivered",
        history: [
          {
            status: orderId === "order_4" ? "In Transit" : "Delivered",
            location: "New York, NY",
            timestamp:
              orderId === "order_4"
                ? "2023-05-12T14:30:00Z"
                : "2023-05-10T10:15:00Z",
            description:
              orderId === "order_4"
                ? "Package is in transit"
                : "Package has been delivered",
          },
          {
            status: "Shipped",
            location: "Los Angeles, CA",
            timestamp:
              orderId === "order_4"
                ? "2023-05-11T09:45:00Z"
                : "2023-05-09T08:30:00Z",
            description: "Package has left the facility",
          },
          {
            status: "Processing",
            location: "Warehouse",
            timestamp:
              orderId === "order_4"
                ? "2023-05-10T16:20:00Z"
                : "2023-05-08T11:10:00Z",
            description: "Order is being prepared for shipment",
          },
        ],
      };
      resolve(mockTracking);
    }, 500);
  });
};

const mockFetchOrder = async (orderId: string): Promise<Order> => {
  const orders = await mockFetchOrders();
  const foundOrder = orders.find((order) => order.id === orderId);

  if (!foundOrder) {
    throw new Error("Order not found");
  }

  return foundOrder;
};

export default OrderDetailsPage;