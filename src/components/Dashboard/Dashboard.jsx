import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../../redux/slices/dashboardSlice";
import { Link } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrderDetails();
  }, [dispatch]);

  const getOrderDetails = async () => {
    const response = await dispatch(getOrders());
    setOrders(response.payload.data);
  }

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
        <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-3 sm:px-4 md:px-6 py-3">Order ID</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3">Status</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3">Products</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      #{order.id}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "pending" ?
                          "bg-gray-100 text-gray-800"
                          : order.status === "Shipped"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    
                    <td className="px-3 sm:px-4 md:px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap items-center gap-2">
                        {order.items.map((item, index) => (
                          <Link
                            key={index}
                            to={`/product/${item.product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1 hover:bg-gray-200 transition duration-200"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-4 h-4 sm:w-6 sm:h-6 object-cover rounded-full mr-1 sm:mr-2"
                            />
                            <span className="text-xs truncate max-w-[80px] sm:max-w-[120px]">{item.product.name}</span>
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      ${order.total_price.toFixed(2)}
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
