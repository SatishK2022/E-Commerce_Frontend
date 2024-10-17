import React, { useState } from "react";
import { BiMapPin, BiPhone } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 underline decoration-violet-600 underline-offset-8 pb-4">
          Contact <span className="text-violet-600">Us</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send us a message
              </h2>
              <div className="mt-4">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">
                      Thank you for your message!
                    </h2>
                    <p className="text-gray-600">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSubmitted(true);
                    }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Your name"
                        />
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
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="you@example.com"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Your subject"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Your message here..."
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full bg-violet-600 text-white py-3 rounded-md font-bold capitalize hover:bg-violet-700 transition-all duration-300 ease-in-out"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Contact Information
                </h2>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <BsMailbox className="h-6 w-6 text-primary mr-2" />
                  <span className="text-gray-700">support@ourstore.com</span>
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
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Our Location
                </h2>
              </div>
              <div className="mt-4">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98658668459471!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794000000!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
