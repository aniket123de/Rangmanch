import React, { useContext } from "react";
import Logo from "../../assets/icon.png";
import { FaPhone, FaSun, FaMoon, FaUserShield, FaLock } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";
import { ThemeContext } from "../../context/ThemeContext";
import StyledSwitch from "../Navbar/Switch";

const Footer = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className="w-full dark:bg-dark-bg transition-colors duration-300">
      <div className="container py-11">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info section */}
          <div className="space-y-4 font-semibold">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="" className="w-6" />
              <p className="text-xl font-semibold dark:text-white">Rangmanch</p>
            </div>
            <p className="dark:text-gray-300">Kolkata, West Bengal, India</p>
            <p className="dark:text-gray-300">@ ERROR503 . All rights reserved</p>
          </div>
          {/* Footer Link */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-4">
              <h1 className="text-xl font-semibold dark:text-white">About us</h1>
              <ul className="text-sm space-y-4">
                <li>
                  <a href="/about" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Our Story</a>
                </li>
                <li>
                  <a href="/about" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">The Vision</a>
                </li>
                <li>
                  <a href="/about" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Team Rangmanch</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="text-xl font-semibold dark:text-white">Support</h1>
              <ul className="text-sm space-y-4">
                <li>
                  <a href="/faq" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">FAQ's</a>
                </li>
                <li>
                  <a href="/tnc" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/PP" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="/help" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Help Center</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact section */}
          <div className="space-y-4">
            <h1 className="text-xl font-semibold dark:text-white">Contact us</h1>
            <ul className="text-base font-semibold space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhone className="dark:text-gray-300" />
                <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">+91 9038903850</a>
              </li>
              <li className="flex items-center space-x-3">
                <LuMessageSquare className="dark:text-gray-300" />
                <a href="mailto:contact.thecodingjourney@gmail.com" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Email</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Theme toggle section */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center space-x-4">
            <a 
              href="/admin" 
              className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FaUserShield className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold">Admin Portal</span>
              <FaLock className="w-3 h-3 opacity-60" />
            </a>
          </div>
          <StyledSwitch isChecked={isDark} onChange={toggleTheme} />
        </div>

        {/* bottom section */}
        <p className="text-center text-sm font-semibold border-t-2 border-gray-200 dark:border-gray-700 pt-5 mt-5 dark:text-gray-300">
          &copy; 2025 ERROR503 . All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
