import React, { useState, useEffect, useRef } from "react";
import { BiMenu, BiSearch, BiSolidUser, BiUser, BiX } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import logo2 from "../assets/logo-small.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        showSidebar
      ) {
        setShowSidebar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, sidebarRef, showSidebar]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileModal(false);
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Categories",
      path: "/categories",
    },
  ];

  if (isLoggedIn) {
    navLinks.push({
      name: "My Orders",
      path: "/orders",
    });
  }

  if (!isLoggedIn) {
    navLinks.push(
      {
        name: "About",
        path: "/about",
      },
      {
        name: "Contact",
        path: "/contact",
      }
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b px-4 mx-auto md:px-6 py-2 bg-white">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link className="mr-4 flex items-center space-x-2" to="/">
            <span className="font-bold">
              <img
                src={logo}
                alt="logo"
                className="hidden sm:block w-full h-12 object-contain"
              />
              <img
                src={logo2}
                alt="logo"
                className="block sm:hidden w-full h-8 object-contain"
              />
            </span>
          </Link>
          <button
            className="md:hidden p-2 rounded-full transition-colors duration-300 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-600"
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label="Toggle menu"
          >
            <BiMenu className="h-6 w-6 text-gray-600 hover:text-violet-600" />
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-violet-600 hover:border-b-2 hover:border-violet-600 transition-all duration-100 ease-in-out ${
                activeLink === link.path
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative group">
            <button className="relative p-2 rounded-full transition-colors duration-300 hover:bg-violet-100">
              <CgShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-violet-600" />
              {cartItemsCount >= 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileModal(!showProfileModal)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-600 hover:border-violet-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
              >
                {user && user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-violet-100 flex items-center justify-center">
                    <BiSolidUser className="w-6 h-6 text-violet-600" />
                  </div>
                )}
              </button>
              {showProfileModal && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 border border-gray-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-100"
                    onClick={() => setShowProfileModal(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link to="/login">
                <button className="bg-violet-600 text-white px-4 py-2 rounded-md border-2 border-violet-600 hover:bg-violet-800 transition-all duration-300 ease-in font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="hover:text-white px-4 py-2 border-2 border-violet-600 rounded-md hover:bg-violet-800 transition-all duration-300 ease-in font-semibold">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <BiX className="h-6 w-6" />
          </button>
          <Link
            to="/"
            className="flex items-center mb-8"
            onClick={() => setShowSidebar(false)}
          >
            <img src={logo} alt="logo" className="w-full h-12 object-contain" />
          </Link>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 hover:text-violet-600 transition-all duration-100 ease-in-out ${
                  activeLink === link.path
                    ? "text-violet-600 font-semibold"
                    : ""
                }`}
                onClick={() => setShowSidebar(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {!isLoggedIn && (
            <div className="mt-8 space-y-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setShowSidebar(false)}>
                <button className="w-full bg-violet-600 text-white px-4 py-2 rounded-md border-2 border-violet-600 hover:bg-violet-800 transition-all duration-300 ease-in font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setShowSidebar(false)}>
                <button className="w-full hover:text-white px-4 py-2 border-2 border-violet-600 rounded-md hover:bg-violet-800 transition-all duration-300 ease-in font-semibold">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
