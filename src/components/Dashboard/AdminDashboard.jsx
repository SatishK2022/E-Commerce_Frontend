import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaBell } from 'react-icons/fa';
import { FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import logo from "../../assets/logo.jpg";
import { MdNotificationsNone } from "react-icons/md";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileModal]);

  const navLinks = [
    { icon: FiGrid, label: "Dashboard", path: "/" },
    { icon: FiShoppingCart, label: "Orders", path: "/orders" },
    { icon: BsBoxSeam, label: "Products", path: "/products" },
    { icon: TbUsersGroup, label: "Customers", path: "/customers" },
    { icon: HiOutlineCog6Tooth, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`shadow-lg bg-white ${
          sidebarCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <img src={logo} alt="logo" className="w-full h-10 object-contain" />
          )}
          <button
            className="h-10 w-10 p-2 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <nav className="p-4 font-semibold">
          {navLinks.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`w-full flex items-center p-3 rounded-md hover:bg-gray-100 mb-2 transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-violet-100 text-violet-600"
                  : "text-gray-700"
              }`}
            >
              <item.icon className={`h-5 w-5 ${sidebarCollapsed ? "mr-0" : "mr-3"}`} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-colors duration-200">
                <MdNotificationsNone className="h-6 w-6 text-gray-600" />
              </button>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileModal(!showProfileModal)}
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-full transition-colors duration-200"
                >
                  <FiUser className="h-8 w-8 text-gray-600 p-1 rounded-full border-2 border-violet-400" />
                </button>
                {showProfileModal && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 transition-colors duration-200"
                      onClick={() => setShowProfileModal(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
