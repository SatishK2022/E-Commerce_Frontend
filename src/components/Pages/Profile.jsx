import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaBirthdayCake,
  FaUserTag,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../redux/slices/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUserProfile(data));
    setIsEditing(false);
  };

  useEffect(() => {
    if (user) {
      setIsEditing(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
          {isEditing ? "Edit" : "Your"} <span className="text-violet-600">Profile</span>
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto border border-gray-300">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
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
                    defaultValue={user?.first_name}
                    id="first_name"
                    required
                    placeholder="John"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
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
                    defaultValue={user?.last_name}
                    required
                    placeholder="Doe"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  {...register("phone_number")}
                  defaultValue={user?.phone_number}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  {...register("date_of_birth")}
                  defaultValue={user?.date_of_birth ? new Date(new Date(user.date_of_birth).getTime() + 86400000).toISOString().split('T')[0] : ''}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center">
                <FaUser className="text-violet-600 mr-4 text-xl" />
                <span className="text-lg font-medium">
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-violet-600 mr-4 text-xl" />
                <span className="text-lg">{user?.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-violet-600 mr-4 text-xl" />
                <span className="text-lg">{user?.phone_number}</span>
              </div>
              <div className="flex items-center">
                <FaUserTag className="text-violet-600 mr-4 text-xl" />
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-md">
                  {user?.role}
                </span>
              </div>
              <div className="flex items-center">
                <FaBirthdayCake className="text-violet-600 mr-4 text-xl" />
                <span className="text-lg">
                  {new Date(user?.date_of_birth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors duration-300"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
