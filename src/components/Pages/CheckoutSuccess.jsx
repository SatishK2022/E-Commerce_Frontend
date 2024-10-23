import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>
        <p className="text-gray-600 mb-8">
          You will receive an email confirmation shortly with your order details.
        </p>
        <div className="space-y-4">
          <Link
            to="/orders"
            className="block w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition duration-300"
          >
            View My Orders
          </Link>
          <Link
            to="/products"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;