import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiHeart, BiSolidStar, BiMinus, BiPlus } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { useParams } from "react-router-dom";
import useScrollToTop from "../../hooks/userScrollToTop";

function SingleProductPage() {
  useScrollToTop();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log("Form submitted:", { ...data, quantity });
    // Handle form submission logic here
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Generate additional images (for demonstration purposes)
  const additionalImages = [
    product.image,
    `${product.image}?v=1`,
    `${product.image}?v=2`,
    `${product.image}?v=3`,
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={additionalImages[activeImage]}
                alt={product.title}
                className="w-full h-96 object-contain object-center p-4"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {additionalImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden shadow-sm ${
                    activeImage === index ? "ring-2 ring-violet-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - view ${index + 1}`}
                    className="w-full h-full object-contain object-center p-2"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <BiSolidStar
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-3 text-sm font-medium text-violet-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-4xl font-bold text-violet-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <div className="flex items-center border-2 border-violet-300 rounded-lg shadow-sm overflow-hidden w-36">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-violet-600 hover:bg-violet-100 focus:outline-none transition-colors duration-200"
                  >
                    <BiMinus className="h-5 w-5" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full text-center border-x-2 border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent py-2 text-lg font-semibold text-violet-700"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-violet-600 hover:bg-violet-100 focus:outline-none transition-colors duration-200"
                  >
                    <BiPlus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-violet-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out"
                >
                  <CgShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </button>
                <button
                  type="button"
                  className="bg-gray-100 py-3 px-8 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out"
                >
                  <BiHeart className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? "border-violet-500 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8 prose prose-violet max-w-none">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "specifications" && (
              <ul className="list-disc pl-5">
                <li>Category: {product.category}</li>
                <li>Material: Premium quality materials</li>
                <li>Care Instructions: Follow label instructions</li>
                <li>Origin: Imported</li>
              </ul>
            )}
            {activeTab === "reviews" && (
              <p>
                Customer reviews will be displayed here. This section can be
                expanded to include individual review cards, ratings breakdown,
                and an option to write a new review.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleProductPage;
