import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import electronics from "../assets/categories/watch.avif";
import clothes from "../assets/categories/cloths.avif";
import home from "../assets/categories/home.webp";
import sports from "../assets/categories/sports.webp";
import beauty from "../assets/categories/beauty.jpeg";
import stationery from "../assets/categories/stationary.webp";
import toys from "../assets/categories/toys.webp";
import fashion from "../assets/categories/glasses.avif";

function Categories() {
  const categories = [
    {
      name: "Electronics",
      image: electronics,
      slug: "electronics",
    },
    {
      name: "Clothing",
      image: clothes,
      slug: "clothing",
    },
    {
      name: "Home & Garden",
      image: home,
      slug: "home-garden",
    },
    {
      name: "Sports & Outdoors",
      image: sports,
      slug: "sports-outdoors",
    },
    {
      name: "Beauty & Personal Care",
      image: beauty,
      slug: "beauty-personal-care",
    },
    {
      name: "Books & Stationery",
      image: stationery,
      slug: "books-stationery",
    },
    {
      name: "Toys & Games",
      image: toys,
      slug: "toys-games",
    },
    {
      name: "Fashion Accessories",
      image: fashion,
      slug: "fashion-accessories",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our <span className="text-violet-600 border-b-4 border-violet-600 pb-2">Categories</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.slug} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Link to={`/categories/${category.slug}`} className="block">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">Explore</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {category.name}
                  </h2>
                  <div className="flex items-center text-violet-600 font-medium">
                    <span>View Products</span>
                    <BiChevronRight className="ml-1 h-5 w-5" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Categories;
