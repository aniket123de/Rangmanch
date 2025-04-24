import React, { useContext } from "react";
import Brand1 from "../../assets/brand/1.png";
import Brand2 from "../../assets/brand/2.png";
import Brand3 from "../../assets/brand/3.png";
import Brand4 from "../../assets/brand/4.png";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";

const Brands = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="w-full dark:bg-dark-bg transition-colors duration-300">
      <div className="container py-14">
        {/* Heading section */}
        <div className="text-center mb-12">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="text-3xl md:text-4xl font-bold font-serif dark:text-white mb-4"
          >
            Platforms
          </motion.h2>
          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Connect with us across multiple platforms to experience seamless integration and comprehensive solutions
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-between gap-6">
          <motion.div
            variants={SlideLeft(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="relative group"
          >
            <img
              src={Brand1}
              alt="brand"
              className="w-[110px] md:w-[200px] transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            variants={SlideLeft(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="relative group"
          >
            <img
              src={Brand2}
              alt="brand"
              className="w-[110px] md:w-[200px] transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            variants={SlideLeft(0.6)}
            initial="initial"
            whileInView={"animate"}
            className="relative group"
          >
            <img
              src={Brand3}
              alt="brand"
              className="w-[110px] md:w-[200px] transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            variants={SlideLeft(0.8)}
            initial="initial"
            whileInView={"animate"}
            className="relative group"
          >
            <img
              src={Brand4}
              alt="brand"
              className="w-[110px] md:w-[200px] transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
