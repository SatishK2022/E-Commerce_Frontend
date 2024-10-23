import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

function CheckoutFailed() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout Failed</h1>
        <p className="text-gray-600 mb-8">
          We're sorry, but there was an issue processing your payment. Your order has not been placed.
        </p>
        <p className="text-gray-600 mb-8">
          Please check your payment details and try again, or contact our support team if the problem persists.
        </p>
        <div className="space-y-4">
          <Link
            to="/cart"
            className="block w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition duration-300"
          >
            Return to Cart
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

export default CheckoutFailed;