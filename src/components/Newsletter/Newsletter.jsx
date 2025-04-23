import React, { useContext } from "react";
import { delay, motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";

const Newsletter = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="w-full dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-[500px] mx-auto space-y-5 py-14">
        <motion.h1
          variants={SlideUp(0.2)}
          initial="initial"
          whileInView="animate"
          className="text-3xl font-bold font-serif text-center dark:text-white"
        >
          Subscribe to our Newsletter
        </motion.h1>
        <motion.p
          variants={SlideUp(0.4)}
          initial="initial"
          whileInView="animate"
          className="max-w-[300px] mx-auto text-gray-500 dark:text-gray-400 text-sm text-center"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed libero
          doloremque ab eum!
        </motion.p>
        {/* form here */}
        <motion.div
          variants={SlideUp(0.6)}
          initial="initial"
          whileInView="animate"
          className="!mt-10 flex justify-center"
        >
          <input
            type="text"
            placeholder="Enter your email"
            className="px-4 py-4 ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 uppercase transition-colors duration-300">
            Subscribe
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;
