import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/userScrollToTop";
import { CgSpinner } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function AllProducts() {
  useScrollToTop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto min-h-screen py-8 px-4 md:px-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
        Our <span className="text-violet-600">Products</span>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CgSpinner className="animate-spin text-violet-600 text-4xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 flex flex-col h-full"
            >
              <div className="h-64 p-4 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-2xl font-bold text-violet-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)} 
                    className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
