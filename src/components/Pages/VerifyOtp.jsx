import React, { useLayoutEffect, useState } from "react";
import { LuCheckCircle2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.title = "Verify OTP";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerified(true);

    navigate("/reset-password");
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-600 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Verify OTP
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Enter the OTP sent to your email
          </p>
        </div>
        <div className="space-y-6">
          {isVerified ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <div className="flex items-center">
                <LuCheckCircle2 className="h-5 w-5 mr-2" />
                <strong className="font-bold">OTP Verified!</strong>
              </div>
              <span className="block sm:inline mt-1">
                Your OTP has been verified. You can now reset your password.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  One-Time Password (OTP)
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-3 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-violet-700 transition-all duration-300 ease-in-out"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            className="text-sm font-semibold text-gray-600 hover:text-violet-800 transition-colors duration-300"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-violet-800 transition-colors duration-300 underline"
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

export default VerifyOtp;
