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

function HomePage() {
  useScrollToTop();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

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

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    // In a real app, you'd update your state management solution here
    // For now, we'll just update the local state
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full">
          <div className="container px-4 md:px-6 flex items-center gap-5">
            <div className="w-full lg:w-1/2 flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ">
                  Your ultimate destination for effortless shopping!
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Discover our latest collection of premium products. <br />
                  Shop now and enjoy free shipping on all orders.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/products">
                  <button className="px-6 py-3 rounded-full border-2 border-violet-600 bg-violet-600 text-white font-bold hover:bg-violet-800 hover:border-violet-800 transition-all duration-300 ease-in">
                    Shop Now
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-6 py-3 rounded-full border-2 border-violet-600 font-bold hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-1/2">
              <img src={heroSection} alt="Shopping" />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
              Featured <span className="text-violet-600">Products</span>
            </h1>
            {products.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <CgSpinner className="animate-spin text-violet-600 text-4xl" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                  >
                    <div className="relative p-4 flex-grow flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain max-h-48 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                        {product.title}
                      </h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <BiStar
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating.rate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          ({product.rating.count})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-violet-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center justify-center bg-violet-600 text-white p-2 rounded-full hover:bg-violet-700 transition-colors duration-300"
                        >
                          <CgShoppingCart className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-16 text-center">
              <Link to="/products">
                <button className="px-8 py-3 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all duration-300 ease-in shadow-lg hover:shadow-xl">
                  View All Products
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
              Shop by <span className="text-violet-600">Category</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={category.image}
                    alt={`${category.name} Category`}
                    className="object-cover w-full h-[300px]"
                    width={400}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <button className="px-6 py-2 text-sm rounded-full border-2 border-violet-600 bg-violet-600 hover:border-violet-800 text-white font-bold hover:bg-violet-800 transition-all duration-300 ease-in">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Subscribe to Our Newsletter
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with our latest products and exclusive offers.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex">
                  <input
                    className="max-w-lg flex-1 px-4 py-3 rounded-l-full border-2 border-violet-600 outline-none focus:outline-none transition-all duration-300 ease-in"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="bg-violet-600 text-white px-4 py-3 rounded-r-full border-2 border-violet-600 hover:bg-violet-800 transition-all duration-300 ease-in font-semibold"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
