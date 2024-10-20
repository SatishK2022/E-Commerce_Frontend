import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await dispatch(forgotPassword(data));
    console.log(response);
    if (response.payload.success) {
      navigate("/verify-otp", { state: { email: data.email } });
    } else {
      toast.error(response.payload.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-600 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-300">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full flex uppercase justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Send OTP
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-gray-600 underline hover:text-violet-500 transition-all duration-300 ease-in-out"
          >
            Back to Login
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-4 text-center text-xs text-gray-500 w-full">
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

export default ForgotPassword;
