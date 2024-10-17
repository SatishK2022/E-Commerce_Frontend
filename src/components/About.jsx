import React from "react";
import { BiMapPin, BiPhone } from "react-icons/bi";
import { BsInstagram, BsMailbox, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import person1 from '../assets/contact/person-1.avif'
import person2 from '../assets/contact/person-2.avif'
import person3 from '../assets/contact/person-3.avif'
import person4 from '../assets/contact/person-4.avif'

function About() {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Founder & CEO",
      image: person1,
    },
    {
      name: "John Smith",
      role: "CTO",
      image: person2,
    },
    {
      name: "Alice Johnson",
      role: "Head of Design",
      image: person3,
    },
    {
      name: "Bob Williams",
      role: "Customer Service Manager",
      image: person4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
            About <span className="text-violet-600">Click Shop</span>
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4">
              Founded in 2010, Click Shop began with a simple mission: to
              provide high-quality products at affordable prices. What started
              as a small online shop has grown into a thriving e-commerce
              platform, serving customers worldwide.
            </p>
            <p className="text-gray-700 mb-4">
              We believe in the power of excellent customer service, sustainable
              practices, and continuous innovation. Our team works tirelessly to
              curate a selection of products that not only meet but exceed our
              customers' expectations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-700">
                  We are committed to offering only the highest quality products
                  to our customers.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-gray-700">
                  We strive to minimize our environmental impact through
                  eco-friendly practices.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-700">
                  Our customers are at the heart of everything we do. Your
                  satisfaction is our top priority.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4 object-cover h-40 w-40"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <BsMailbox className="h-6 w-6 text-primary mr-2" />
                <span className="text-gray-700">support@clickshop.com</span>
              </div>
              <div className="flex items-center">
                <BiPhone className="h-6 w-6 text-primary mr-2" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <BiMapPin className="h-6 w-6 text-primary mr-2" />
                <span className="text-gray-700">
                  123 E-commerce St, Online City, 12345
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Connect With Us
            </h2>
            <div className="flex space-x-4">
              <button variant="outline" size="icon">
                <FaFacebook className="h-4 w-4" />
              </button>
              <button variant="outline" size="icon">
                <BsTwitterX className="h-4 w-4" />
              </button>
              <button variant="outline" size="icon">
                <BsInstagram className="h-4 w-4" />
              </button>
              <button variant="outline" size="icon">
                <LiaLinkedin className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default About;
