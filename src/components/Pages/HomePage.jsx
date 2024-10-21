import { CgShoppingCart, CgSpinner } from "react-icons/cg";
import heroSection from "../../assets/hero-section.png";
import { useState, useEffect } from "react";
import { BiHeart, BiStar } from "react-icons/bi";
import axios from "axios";
import camera from "../../assets/products/camera.jpeg";
import glasses from "../../assets/products/glasses.avif";
import clothes from "../../assets/products/cloths.avif";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/userScrollToTop";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

function HomePage() {
  useScrollToTop();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  }

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  }

  const closeQuickView = () => {
    setSelectedProduct(null);
  }

  const categories = [
    {
      name: "Electronics",
      image: camera,
      description:
        "Discover the latest in electronics with our wide range of products.",
      link: "/electronics",
    },
    {
      name: "Clothing",
      image: clothes,
      description:
        "Explore our collection of stylish and comfortable clothing.",
      link: "/clothing",
    },
    {
      name: "Fashion",
      image: glasses,
      description:
        "Discover the latest trends in fashion with our stylish collection.",
      link: "/fashion",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-8 md:pt-16 lg:py-0">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-12">
              <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Your ultimate destination for effortless shopping!
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">
                    Discover our latest collection of premium products. 
                    Shop now and enjoy free shipping on all orders.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/products" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 rounded-full border-2 border-violet-600 bg-violet-600 text-white font-bold hover:bg-violet-800 hover:border-violet-800 transition-all duration-300 ease-in">
                      Shop Now
                    </button>
                  </Link>
                  <Link to="/about" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 rounded-full border-2 border-violet-600 font-bold hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                <img src={heroSection} alt="Shopping" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 md:mb-12 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
              Featured <span className="text-violet-600">Products</span>
            </h1>
            {products.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <CgSpinner className="animate-spin text-violet-600 text-4xl" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                  >
                    <Link to={`/product/${product.id}`} className="relative p-4 flex-grow flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-32 sm:h-40 md:h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickView(product);
                          }}
                          className="bg-white text-gray-800 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full font-semibold transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                        >
                          Quick View
                        </button>
                      </div>
                    </Link>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 truncate">
                        {product.title}
                      </h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <BiStar
                            key={i}
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              i < Math.floor(product.rating.rate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                          />
                        ))}
                        <span className="ml-2 text-xs sm:text-sm text-gray-600">
                          ({product.rating.count})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-violet-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="flex items-center justify-center bg-violet-600 text-white p-1 sm:p-2 md:p-3 rounded-full hover:bg-violet-700 transition-colors duration-300"
                        >
                          <CgShoppingCart className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 p-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 sm:mt-12 md:mt-16 text-center">
              <Link to="/products">
                <button className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all duration-300 ease-in shadow-lg hover:shadow-xl">
                  View All Products
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 md:mb-12 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
              Shop by <span className="text-violet-600">Category</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={category.image}
                    alt={`${category.name} Category`}
                    className="object-cover w-full h-48 sm:h-64 md:h-72 lg:h-80"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <button className="px-4 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border-2 border-violet-600 bg-violet-600 hover:border-violet-800 text-white font-bold hover:bg-violet-800 transition-all duration-300 ease-in">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Subscribe to Our Newsletter
                </h2>
                <p className="mx-auto max-w-[600px] text-sm sm:text-base md:text-lg text-gray-500">
                  Stay updated with our latest products and exclusive offers.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex flex-col sm:flex-row">
                  <input
                    className="w-full sm:max-w-lg flex-1 px-4 py-2 sm:py-3 rounded-full sm:rounded-l-full sm:rounded-r-none border-2 border-violet-600 outline-none focus:outline-none transition-all duration-300 ease-in mb-2 sm:mb-0"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-violet-600 text-white px-4 py-2 sm:py-3 rounded-full sm:rounded-l-none sm:rounded-r-full border-2 border-violet-600 hover:bg-violet-800 transition-all duration-300 ease-in font-semibold"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <button onClick={closeQuickView} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-auto object-contain" />
              </div>
              <div className="md:w-1/2 md:pl-4">
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <p className="text-2xl font-bold text-violet-600 mb-4">${selectedProduct.price.toFixed(2)}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <BiStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(selectedProduct.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedProduct.rating.count} reviews)
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleAddToCart(e, selectedProduct)}
                    className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${selectedProduct.id}`}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
