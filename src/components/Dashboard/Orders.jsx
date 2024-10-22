import React from "react";

function Orders() {
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

  return (
    <div className="flex justify-center flex-col ">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 py-4">
        Orders
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto mx-5">
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
  );
}

export default Orders;
