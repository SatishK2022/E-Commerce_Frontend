import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-300">
        <div className="text-center">
          <h2 className=" text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium hover:underline transition-all duration-300 ease-in-out"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
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
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium hover:text-violet-600 hover:underline transition-all duration-300 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="w-full bg-violet-600 text-white py-3 rounded-md font-bold capitalize hover:bg-violet-700 transition-all duration-300 ease-in-out">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
