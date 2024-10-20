import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [isReset, setIsReset] = useState(false);
  const { email } = useLocation()?.state;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const submitData = {
      password,
      email,
    };

    const response = await dispatch(resetPassword(submitData));
    if (response.payload.success) {
      setIsReset(true);
      navigate("/login");
    } else {
      toast.error(response.payload.message);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("password")}
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
                {...register("confirmPassword")}
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
