import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../../redux/slices/cartSlice";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/slices/orderSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [showConfirmModal, setShowConfirmModal] = useState({
    show: false,
    item: null,
  });

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity > item.quantity) {
      dispatch(addToCart({ ...item, quantity: newQuantity - item.quantity }));
    } else if (newQuantity < item.quantity) {
      dispatch(
        removeFromCart({ ...item, quantity: item.quantity - newQuantity })
      );
    }
  };

  const handleCheckout = async () => {
    const response = await dispatch(createOrder({total_price: totalAmount, order_items: cartItems}));

    console.log("response cart", response);

    if (response.payload.success) {
      navigate(`/checkout/success`);
      await dispatch(clearCart());
    } else {
      navigate(`/checkout/failed`);
    }
  }

  const removeItem = (item) => {
    dispatch(removeFromCart({ ...item, quantity: item.quantity }));
  };

  const subtotal = totalAmount;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <FaShoppingCart className="mx-auto h-24 w-24 text-violet-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet. Start
              shopping and discover amazing products!
            </p>
            <Link
              to="/products"
              className="bg-violet-600 font-bold text-white px-8 py-4 rounded-full hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 text-lg inline-flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
              Your <span className="text-violet-600">Shopping Cart</span>
            </h1>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 w-full">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-700 border-b pb-4">
                    Cart Items
                  </h2>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center border-b py-4 sm:py-6 last:border-b-0"
                    >
                      <div className="w-1/3 pr-4">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full md:h-24 object-contain rounded-md bg-gray-100 p-2 cursor-pointer"
                          />
                        </Link>
                      </div>
                      <div className="w-2/3 flex flex-wrap">
                        <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                          <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">
                            {item.title}
                          </h3>
                          <p className="text-violet-600 font-semibold">
                            ${item.price?.toFixed(2)}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              className={`p-2 rounded-full transition duration-300 ${
                                item.quantity === 1
                                  ? "bg-gray-100 cursor-not-allowed"
                                  : "bg-violet-100 hover:bg-violet-200"
                              }`}
                              onClick={() =>
                                updateQuantity(item, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              disabled={item.quantity === 1}
                            >
                              <FaMinus
                                className={`h-3 w-3 ${
                                  item.quantity === 1
                                    ? "text-gray-400"
                                    : "text-violet-600"
                                }`}
                              />
                            </button>
                            <div className="w-10 text-center border border-violet-300 rounded-md p-1 bg-white font-semibold text-violet-700 shadow-sm">
                              {item.quantity}
                            </div>
                            <button
                              className="p-2 bg-violet-100 rounded-full hover:bg-violet-200 transition duration-300"
                              onClick={() =>
                                updateQuantity(item, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <FaPlus className="h-3 w-3 text-violet-600" />
                            </button>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-end justify-between">
                          <p className="font-medium text-gray-800 mb-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            className="p-2 text-red-500 hover:text-red-700 transition duration-300 transform hover:scale-110"
                            onClick={() =>
                              setShowConfirmModal({ show: true, item })
                            }
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <FaTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      {showConfirmModal.show &&
                        showConfirmModal.item.id === item.id && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn p-4">
                            <div className="bg-white p-6 rounded-lg shadow-xl animate-scaleIn w-full max-w-sm">
                              <h3 className="text-lg font-semibold mb-4">
                                Confirm Removal
                              </h3>
                              <p>
                                Are you sure you want to remove this item from
                                your cart?
                              </p>
                              <div className="mt-6 flex justify-end space-x-4">
                                <button
                                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
                                  onClick={() =>
                                    setShowConfirmModal({
                                      show: false,
                                      item: null,
                                    })
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                                  onClick={() => {
                                    removeItem(item);
                                    setShowConfirmModal({
                                      show: false,
                                      item: null,
                                    });
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
                      <span>${parseFloat(subtotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${parseFloat(tax).toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg text-gray-800">
                      <span>Total</span>
                      <span>${parseFloat(total).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={handleCheckout} className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-violet-700 transition duration-300 font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
