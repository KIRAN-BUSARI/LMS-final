import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <footer className="py-6 bg-gray-900 text-white text-center sm:text-left">
      <div className="container mx-auto px-4">
        {/* Copyright section */}
        <div className="sm:flex sm:justify-between">


          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-semibold">© {year} Your Company Name. All rights reserved.</p>
          </div>

          {/* Social media icons */}
          <div className="flex justify-center sm:justify-end items-center mt-4 sm:mt-0">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-3xl sm:text-4xl mx-2 hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-3xl sm:text-4xl mx-2 hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-3xl sm:text-4xl mx-2 hover:text-blue-400 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-3xl sm:text-4xl mx-2 hover:text-blue-700 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
