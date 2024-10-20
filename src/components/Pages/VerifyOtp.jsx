import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyOTP, forgotPassword } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = useLocation()?.state;

  const onSubmit = async (data) => {
    const { otp } = data;
    const submitData = {
      otp,
      email,
    };

    const response = await dispatch(verifyOTP(submitData));
    console.log(response);
    if (response.payload.success) {
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error(response.payload.message);
    }
  };

  const handleResendOtp = () => {
    dispatch(forgotPassword(email));
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                One-Time Password (OTP)
              </label>
              <input
                id="otp"
                {...register("otp")}
                type="text"
                required
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
