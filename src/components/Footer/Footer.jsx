import React, { useContext } from "react";
import Logo from "../../assets/icon.png";
import { FaPhone } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";
import { motion } from "framer-motion";
import { SlideLeft } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <motion.footer
      variants={SlideLeft(0.2)}
      initial="initial"
      whileInView="animate"
      className="w-full dark:bg-dark-bg transition-colors duration-300"
    >
      <div className="container py-11">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info section */}
          <div className="space-y-4 font-semibold">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="" className="w-6" />
              <p className="text-xl font-semibold dark:text-white">Rangmanch</p>
            </div>
            <p className="dark:text-gray-300">Kolkata, West Bengal, India</p>
            <p className="dark:text-gray-300">@ 2025 TCJ All rights reserved</p>
          </div>
          {/* Footer Link */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-4">
              <h1 className="text-xl font-semibold dark:text-white">About us</h1>
              <ul className="text-sm space-y-4">
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Our Story</a>
                </li>
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">The Vision</a>
                </li>
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Team Rangmanch</a>
                </li>
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Careers</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="text-xl font-semibold dark:text-white">Support</h1>
              <ul className="text-sm space-y-4">
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">FAQ's</a>
                </li>
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Help Center</a>
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
                <a href="#" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">+91 123456789</a>
              </li>
              <li className="flex items-center space-x-3">
                <LuMessageSquare className="dark:text-gray-300" />
                <a href="mailto:contact.thecodingjourney@gmail.com" className="dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">Email</a>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom section */}
        <p className="text-center text-sm font-semibold border-t-2 border-gray-200 dark:border-gray-700 pt-5 mt-5 dark:text-gray-300">
          &copy; 2023 TCJ. All rights reserved
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
