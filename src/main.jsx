import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/Pages/HomePage.jsx";
import Login from "./components/Pages/Login.jsx";
import Register from "./components/Pages/Register.jsx";
import AllProducts from "./components/Product/AllProducts.jsx";
import About from "./components/Pages/About.jsx";
import Contact from "./components/Pages/Contact.jsx";
import Categories from "./components/Pages/Categories.jsx";
import ForgotPassword from "./components/Pages/ForgotPassword.jsx";
import ResetPassword from "./components/Pages/ResetPassword.jsx";
import VerifyOtp from "./components/Pages/VerifyOtp.jsx";
import SingleProductPage from "./components/Product/SingleProductPage.jsx";
import Cart from "./components/Pages/Cart.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";
import NotFound from "./components/Pages/NotFound.jsx";
import Profile from "./components/Pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/Auth/RequireAuth.jsx";

const isLoggedIn = JSON.parse(localStorage.getItem('auth'))?.isLoggedIn || false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Route>
      {!isLoggedIn && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} />
    </Provider>
  </StrictMode>
);