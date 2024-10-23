import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../../redux/slices/orderSlice";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaBox, FaTruck, FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

function MyOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    getOrderDetails();
  }, [dispatch]);

  const getOrderDetails = async () => {
    const response = await dispatch(getOrders());
    console.log("response", response);

    if (response.payload.success) {
      setOrders(response.payload.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <FaBox className="text-yellow-500" />;
      case "Shipped":
        return <FaTruck className="text-blue-500" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaShoppingBag className="text-gray-500" />;
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">My Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <FaShoppingBag className="mx-auto h-16 sm:h-24 w-16 sm:w-24 text-gray-400 mb-4" />
            <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div 
                  className="bg-violet-600 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">Order #{index + 1}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                    {expandedOrders[order.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                {expandedOrders[order.id] && (
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 text-gray-600">
                      <p className="mb-2 sm:mb-0">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                      <p className="font-semibold">Total: ${order.total_price.toFixed(2)}</p>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-4 text-lg">Items:</h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                            <div className="relative w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-6">
                              <Link to={`/product/${item.product_id}`}>
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-full h-full object-contain rounded-md shadow-sm"
                                />
                              </Link>
                              <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {item.quantity}
                              </div>
                            </div>
                            <div className="flex-grow mb-4 sm:mb-0">
                              <p className="font-medium text-lg text-gray-800 mb-1">{item.product_name}</p>
                              <p className="text-sm text-gray-600">
                                Price: <span className="font-semibold">${item.price.toFixed(2)}</span> each
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg text-violet-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">Total for item</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
