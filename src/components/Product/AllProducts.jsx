import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/userScrollToTop";
import { CgSpinner } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { FaSearch, FaChevronDown } from "react-icons/fa";

function AllProducts() {
  useScrollToTop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter((product) => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating.rate - a.rating.rate;
      return 0;
    });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="relative container mx-auto min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
        Our <span className="text-violet-600">Products</span>
      </h1>
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      {showFilters && (
        <div className="sticky top-16 z-10 flex flex-col sm:flex-row gap-4 mb-8 bg-white rounded-lg shadow-md p-4 sm:p-5 border border-gray-300">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-[180px] px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CgSpinner className="animate-spin text-violet-600 text-4xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 flex flex-col h-full border border-gray-300 hover:shadow-lg hover:border-violet-300"
            >
              <div className="h-48 sm:h-56 p-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 truncate">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-xl sm:text-2xl font-bold text-violet-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-violet-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-violet-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 text-sm sm:text-base"
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
