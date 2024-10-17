import React from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import paymentMethods from "../assets/payment-methods.jpg";

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 text-white px-4 md:px-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About Us</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:underline">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <BsTwitterX className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <BsInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 Click Shop. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 rounded-md">
            <img
              src={paymentMethods}
              alt="Payment Methods"
              className="h-8"
              width={120}
              height={30}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
