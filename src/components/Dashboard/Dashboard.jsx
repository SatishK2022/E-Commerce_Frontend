import React from "react";

function Dashboard() {
  const orders = [
    {
      id: "#3210",
      status: "Shipped",
      customer: "Olivia Martin",
      product: "Clck Watch Pro",
      amount: "$79.00",
    },
    {
      id: "#3209",
      status: "Processing",
      customer: "Ava Johnson",
      product: "Clck Fitness Band",
      amount: "$39.00",
    },
    {
      id: "#3208",
      status: "Cancelled",
      customer: "Michael Johnson",
      product: "Clck Smart Home Hub",
      amount: "$129.00",
    },
    {
      id: "#3207",
      status: "Shipped",
      customer: "Sarah Brown",
      product: "Clck Wireless Earbuds",
      amount: "$89.00",
    },
    {
      id: "#3206",
      status: "Shipped",
      customer: "James Wilson",
      product: "Clck Smart Scale",
      amount: "$59.00",
    },
  ];

  const stats = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
    { title: "New Customers", value: "+2,350", change: "+180.1%" },
    { title: "Sales", value: "+12,234", change: "+19%" },
    { title: "Active Now", value: "+573", change: "+201" },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {item.title}
            </h3>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {item.value}
            </div>
            <p className="text-sm text-green-600">
              {item.change} from last month
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h3>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 bg-gray-50">Order</th>
                <th className="px-6 py-3 bg-gray-50">Status</th>
                <th className="px-6 py-3 bg-gray-50">Customer</th>
                <th className="px-6 py-3 bg-gray-50">Product</th>
                <th className="px-6 py-3 bg-gray-50 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Shipped"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
