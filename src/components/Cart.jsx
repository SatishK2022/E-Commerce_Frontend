import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [showConfirmModal, setShowConfirmModal] = useState({ show: false, item: null });

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity > item.quantity) {
      dispatch(addToCart(item));
    } else if (newQuantity < item.quantity) {
      dispatch(removeFromCart(item));
    }
  };

  const removeItem = (item) => {
    for (let i = 0; i < item.quantity; i++) {
      dispatch(removeFromCart(item));
    }
  };

  const subtotal = totalAmount;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
          Your <span className="text-violet-600">Shopping Cart</span>
        </h1>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-violet-600 font-bold text-white px-6 py-3 rounded-full hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-4">
                  Cart Items
                </h2>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b py-6 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-md mr-6 bg-gray-100 p-2"
                    />
                    <div className="flex-grow w-1/3">
                      <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-violet-600 font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-10 w-1/4">
                      <button
                        className={`p-2 rounded-full transition duration-300 ${
                          item.quantity === 1
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-violet-100 hover:bg-violet-200'
                        }`}
                        onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                        aria-label="Decrease quantity"
                        disabled={item.quantity === 1}
                      >
                        <FaMinus className={`h-3 w-3 ${
                          item.quantity === 1 ? 'text-gray-400' : 'text-violet-600'
                        }`} />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item, Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-10 text-center border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <button
                        className="p-2 bg-violet-100 rounded-full hover:bg-violet-200 transition duration-300"
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="h-3 w-3 text-violet-600" />
                      </button>
                    </div>
                    <p className="font-medium text-gray-800 ml-6 w-1/6 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="ml-6 p-2 text-red-500 hover:text-red-700 transition duration-300 w-1/12 transform hover:scale-110"
                      onClick={() => setShowConfirmModal({ show: true, item })}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                    {showConfirmModal.show && showConfirmModal.item.id === item.id && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                        <div className="bg-white p-6 rounded-lg shadow-xl animate-scaleIn">
                          <h3 className="text-lg font-semibold mb-4">Confirm Removal</h3>
                          <p>Are you sure you want to remove this item from your cart?</p>
                          <div className="mt-6 flex justify-end space-x-4">
                            <button
                              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
                              onClick={() => setShowConfirmModal({ show: false, item: null })}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                              onClick={() => {
                                removeItem(item);
                                setShowConfirmModal({ show: false, item: null });
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-violet-700 transition duration-300 font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
