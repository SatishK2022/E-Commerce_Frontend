import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slices/authSlice";
import { FaArrowLeft } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await dispatch(registerUser(data))

    if (response.payload.success) {
      navigate("/login")
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-gray-100">
      <button
        onClick={handleGoBack}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 bg-white rounded-full shadow-md hover:bg-gray-100 hover:text-violet-600 transition-all duration-300 ease-in-out"
        aria-label="Go back"
      >
        <FaArrowLeft className="h-4 w-4" />
        <span>Go Back</span>
      </button>
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-2 md:flex-row">
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  {...register("first_name")}
                  id="first_name"
                  required
                  placeholder="John"
                  className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("last_name")}
                  id="last_name"
                  required
                  placeholder="Doe"
                  className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
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
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                {...register("phone_number")}
                type="phone_number"
                autoComplete="phone_number"
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="+91 1234567890"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth
              </label>
              <input
                id="date_of_birth"
                {...register("date_of_birth")}
                type="date"
                autoComplete="date_of_birth"
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
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
