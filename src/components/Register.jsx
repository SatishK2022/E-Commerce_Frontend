import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-300">
        <div className="text-center">
          <h2 className=" text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium hover:underline transition-all duration-300 ease-in-out"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-2 md:flex-row">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <label
                        htmlFor="firstname"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        required
                        placeholder="John"
                        className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-violet-600"
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <label
                        htmlFor="lastname"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        required
                        placeholder="Doe"
                        className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-violet-600"
                    />
                </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-violet-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-violet-600"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="phone"
                autoComplete="phone"
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-violet-600"
                placeholder="+91 1234567890"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
                <label
                    htmlFor="dateofbirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Date of Birth
                </label>
                <input
                    id="dateofbirth"
                    name="dateofbirth"
                    type="date"
                    autoComplete="dateofbirth"
                    required
                    className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-violet-600"
                />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-md font-bold capitalize hover:bg-violet-700 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
