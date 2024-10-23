import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrders, updateOrderStatus } from "../../redux/slices/dashboardSlice";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    getOrderDetails();
  }, [dispatch]);

  const getOrderDetails = async () => {
    const response = await dispatch(getOrders());
    setOrders(response.payload.data);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const response = await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    if (response.payload) {
      getOrderDetails();
    }
  };

  const filteredOrders = orders.filter(order => 
    (filterStatus === "All" || order.status === filterStatus) &&
    (
      order.items.some(item => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Orders</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex space-x-4">
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Shipped">Shipped</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              <FaFilter />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto px-2 sm:px-4 md:px-6 pb-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-3 sm:px-4 md:px-6 py-3">Order ID</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3">Status</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3">Products</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-right">Total Amount</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
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
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        className="border rounded-lg px-1 sm:px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      >
                        <option defaultValue value="pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Processing">Processing</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
