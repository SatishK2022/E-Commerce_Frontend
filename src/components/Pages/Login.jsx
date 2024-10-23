import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";
import { FaArrowLeft } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pendingOrders = useSelector((state) => state.cart.cartItems.length > 0);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await dispatch(loginUser(data));

    if (response.payload.success) {
      if (pendingOrders) {
        navigate("/cart");
      } else {
        navigate("/");
      }
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <button
        onClick={handleGoBack}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 bg-white rounded-full shadow-md hover:bg-gray-100 hover:text-violet-600 transition-all duration-300 ease-in-out"
        aria-label="Go back"
      >
        <FaArrowLeft className="h-4 w-4" />
        <span>Go Back</span>
      </button>
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email")}
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
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
                {...register("password")}
                type="password"
                autoComplete="current-password"
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium underline hover:text-violet-600 transition-all duration-300 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-md font-bold capitalize hover:bg-violet-700 transition-all duration-300 ease-in-out"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
