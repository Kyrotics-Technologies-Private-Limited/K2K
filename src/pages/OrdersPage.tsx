import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Order,
  OrderStatus,
  OrderAddress,
  OrderPayment,
  OrderItem,
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
  confirmed: "bg-green-100 text-green-800",
  processing: "bg-green-100 text-green-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-gray-100 text-gray-800",
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
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
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

const EmptyOrdersState = () => (
  <div className="text-center py-12">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
    <p className="mt-1 text-sm text-gray-500">
      You haven't placed any orders yet.
    </p>
    <div className="mt-6">
      <Link
        to="/products"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Browse Products
      </Link>
    </div>
  </div>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  indexOfFirstOrder,
  indexOfLastOrder,
  ordersLength,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  indexOfFirstOrder: number;
  indexOfLastOrder: number;
  ordersLength: number;
  setCurrentPage: (page: number) => void;
}) => (
  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <div className="flex-1 flex justify-between sm:hidden">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </button>
    </div>
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{indexOfFirstOrder + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastOrder, ordersLength)}
          </span>{" "}
          of <span className="font-medium">{ordersLength}</span> results
        </p>
      </div>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === page
                  ? "z-10 bg-green-50 border-green-500 text-green-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
);

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
          name: "Wireless Headphones",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          variant_name: "Black",
        },
        {
          id: "item_2",
          order_id: "order_1",
          product_id: "prod_2",
          quantity: 2,
          unit_price: 12.99,
          created_at: "2023-05-15T10:30:00Z",
          name: "USB-C Cable",
          image:
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        },
        {
          id: "item_3",
          order_id: "order_2",
          product_id: "prod_3",
          quantity: 1,
          unit_price: 24.99,
          created_at: "2023-05-14T14:45:00Z",
          name: "Smartphone Case",
          image:
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
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

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await mockFetchOrders();
        setOrders(response);
      } catch (err) {
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <EmptyOrdersState />
        ) : (
          <>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <li key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/orders/${order.id}`}
                            className="text-lg font-medium text-green-600 hover:underline"
                          >
                            Order #{order.id.substring(0, 8)}...
                          </Link>
                          <span
                            className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[order.status]
                            }`}
                          >
                            {statusLabels[order.status]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on {formatDate(order.created_at)}
                        </p>
                        <div className="mt-2 flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            ${getOrderTotal(order).toFixed(2)}
                          </span>
                          <span className="mx-1 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {order.items?.length || 0} item
                            {order.items?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <Link
                          to={`/orders/${order.id}`}
                          className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {orders.length > ordersPerPage && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                indexOfFirstOrder={indexOfFirstOrder}
                indexOfLastOrder={indexOfLastOrder}
                ordersLength={orders.length}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserOrdersPage;
