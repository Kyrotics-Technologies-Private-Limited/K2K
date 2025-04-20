import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: number;
  total: number;
  paymentMethod: string;
}

const OrdersManagement: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockOrders: Order[] = [
          {
            id: "1",
            orderNumber: "#ORD-2023-001",
            customer: "John Doe",
            date: "2023-06-15",
            status: "completed",
            items: 3,
            total: 2499,
            paymentMethod: "Credit Card",
            // shippingAddress: "123 Main St, Bangalore, KA 560001",
            // contact: "john.doe@example.com",
            // deliveryDate: "2023-06-18",
          },
          {
            id: "2",
            orderNumber: "#ORD-2023-002",
            customer: "Priya Sharma",
            date: "2023-06-16",
            status: "processing",
            items: 5,
            total: 4299,
            paymentMethod: "UPI",
            // shippingAddress: "45 MG Road, Mumbai, MH 400001",
            // contact: "priya.s@gmail.com",
            // deliveryDate: "2023-06-20",
          },
          {
            id: "3",
            orderNumber: "#ORD-2023-003",
            customer: "Raj Patel",
            date: "2023-06-17",
            status: "pending",
            items: 2,
            total: 1599,
            paymentMethod: "Cash on Delivery",
            // shippingAddress: "78 Cross Rd, Delhi, DL 110001",
            // contact: "9876543210",
            // deliveryDate: null,
          },
          {
            id: "4",
            orderNumber: "#ORD-2023-004",
            customer: "Ananya Gupta",
            date: "2023-06-18",
            status: "cancelled",
            items: 1,
            total: 899,
            paymentMethod: "Net Banking",
            // shippingAddress: "22 Park Street, Kolkata, WB 700016",
            // contact: "ananya.g@example.com",
            // deliveryDate: null,
            // cancellationReason: "Changed mind",
          },
          {
            id: "5",
            orderNumber: "#ORD-2023-005",
            customer: "Vikram Singh",
            date: "2023-06-19",
            status: "completed",
            items: 4,
            total: 3299,
            paymentMethod: "Credit Card",
            // shippingAddress: "33 Hill View, Hyderabad, TS 500032",
            // contact: "vikram.s@example.com",
            // deliveryDate: "2023-06-22",
          },
          {
            id: "6",
            orderNumber: "#ORD-2023-006",
            customer: "Neha Reddy",
            date: "2023-06-20",
            status: "processing",
            items: 7,
            total: 5899,
            paymentMethod: "Wallet",
            // shippingAddress: "12 Residency Rd, Bangalore, KA 560025",
            // contact: "neha.r@gmail.com",
            // deliveryDate: "2023-06-25",
          },
          {
            id: "7",
            orderNumber: "#ORD-2023-007",
            customer: "Amit Joshi",
            date: "2023-06-21",
            status: "pending",
            items: 2,
            total: 1199,
            paymentMethod: "Cash on Delivery",
            // shippingAddress: "56 Temple St, Varanasi, UP 221001",
            // contact: "8765432109",
            // deliveryDate: null,
          },
          {
            id: "8",
            orderNumber: "#ORD-2023-008",
            customer: "Sanya Malhotra",
            date: "2023-06-22",
            status: "completed",
            items: 3,
            total: 2799,
            paymentMethod: "Debit Card",
            // shippingAddress: "90 Beach Rd, Chennai, TN 600005",
            // contact: "sanya.m@example.com",
            // deliveryDate: "2023-06-25",
          },
          {
            id: "9",
            orderNumber: "#ORD-2023-009",
            customer: "Rahul Verma",
            date: "2023-06-23",
            status: "cancelled",
            items: 1,
            total: 699,
            paymentMethod: "UPI",
            
            
          },
          {
            id: "10",
            orderNumber: "#ORD-2023-010",
            customer: "Meera Krishnan",
            date: "2023-06-24",
            status: "processing",
            items: 6,
            total: 4899,
            paymentMethod: "Credit Card",
            //shippingAddress: "67 Lake View, Kochi, KL 682001",
            //contact: "meera.k@example.com",
            //deliveryDate: "2023-06-28",
          },
        ];
        setOrders(mockOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const viewOrderDetails = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and track all customer orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <div className="sm:flex sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center p-12">
            <p className="text-gray-500">
              No orders found matching your criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleSelectOrder(order.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                        />
                        <div>
                          <div
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                            onClick={() => viewOrderDetails(order.id)}
                          >
                            {order.orderNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items} items
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{order.total.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {order.status === "pending" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(order.id, "processing")
                            }
                            className="text-blue-600 hover:text-blue-900"
                            title="Mark as Processing"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                        )}
                        {order.status !== "cancelled" &&
                          order.status !== "completed" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order.id, "cancelled")
                              }
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Order"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          )}
                        <button
                          onClick={() => viewOrderDetails(order.id)}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Details"
                        >
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">{filteredOrders.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;
