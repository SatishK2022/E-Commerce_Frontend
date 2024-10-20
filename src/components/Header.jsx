import React, { useState, useEffect, useRef } from "react";
import { BiMenu, BiSearch, BiSolidUser, BiUser } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileModal(false);
  };

  const navLinks = [
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b px-4 mx-auto md:px-6 py-2 bg-white">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-10 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block ">
              <img src={logo} alt="logo" className="w-full h-12" />
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-semibold">
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
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <BiMenu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-5 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative flex items-center justify-center">
              <BiSearch className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="pl-10 sm:w-[300px] md:w-[200px] lg:w-[300px] py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>
          <Link to="/cart" className="relative group">
            <button size="icon" variant="ghost" className="relative p-2 rounded-full transition-colors duration-300 hover:bg-violet-100">
              <CgShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-violet-600" />
              {cartItemsCount > 0 && (
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
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
