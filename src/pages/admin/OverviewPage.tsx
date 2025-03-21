import { TrendingUp, ShoppingBag, Users, Clock, BarChart } from "lucide-react";
import SalesChart from "../../components/admin/SalesChart";
import RevenueChart from "../../components/admin/RevenueChart";

const OverviewPage = () => {
  const metrics = [
    {
      label: "Total Sales",
      value: "$24,560",
      icon: <TrendingUp size={24} className="text-green-500" />,
    },
    {
      label: "Total Orders",
      value: "1,234",
      icon: <ShoppingBag size={24} className="text-blue-500" />,
    },
    {
      label: "Total Users",
      value: "5,789",
      icon: <Users size={24} className="text-purple-500" />,
    },
    {
      label: "Pending Orders",
      value: "29",
      icon: <Clock size={24} className="text-yellow-500" />,
    },
  ];

  const recentActivities = [
    { id: 1, action: "Order #1001 placed", time: "2 hours ago" },
    { id: 2, action: "User John Doe registered", time: "5 hours ago" },
    { id: 3, action: "Product 'ghee' added", time: "1 day ago" },
  ];

  const pendingOrders = [
    {
      id: "#1023",
      customer: "Alice Johnson",
      amount: "$45.00",
      status: "Pending",
    },
    {
      id: "#1024",
      customer: "Mark Spencer",
      amount: "$120.00",
      status: "Pending",
    },
    { id: "#1025", customer: "Jane Doe", amount: "$85.00", status: "Pending" },
  ];

  return (
    <div className="p-6 pt-20 bg-gray-100 min-h-screen grid gap-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md flex items-center space-x-4"
          >
            {metric.icon}
            <div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BarChart size={28} className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Total Graphical Analysis</h2>
          </div>
          <SalesChart />
        </div>
      </div>

      {/* Recent Activity & Pending Orders Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b text-lg font-semibold">
            Recent Activities
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right">
                      {activity.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b text-lg font-semibold">
            Pending Orders
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.amount}</td>
                    <td className="px-6 py-4 text-yellow-500">
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Total Users Section */}
      <div className="bg-white rounded-lg shadow-md text-center p-6">
        <div className="p-4 border-b text-lg font-semibold">Total Users</div>
        <div className="text-3xl font-bold text-green-600">5,789</div>
      </div>
    </div>
  );
};

export default OverviewPage;
