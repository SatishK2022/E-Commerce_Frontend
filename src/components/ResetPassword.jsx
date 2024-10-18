import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { LuCheckCircle2 } from "react-icons/lu";

const ResetPassword = () => {
  const [isReset, setIsReset] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useLayoutEffect(() => {
    document.title = "Reset Password";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setIsReset(true);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-600 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">Enter your new password</p>
        </div>
        <div>
          {isReset ? (
            <div
              className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <div className="flex items-center">
                <LuCheckCircle2 className="h-5 w-5 mr-2" />
                <strong className="font-bold">Password Reset Successful</strong>
              </div>
              <span className="block sm:inline mt-1">
                Your password has been reset successfully. You can now login
                with your new password.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-3 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-violet-700 transition-all duration-300 ease-in-out"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
        <div className="mt-6 flex justify-center items-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-gray-600 hover:text-violet-800 transition-colors duration-300 underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-white">
        <p>&copy; 2024 Click Shop. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ResetPassword;
