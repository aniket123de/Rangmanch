import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-dark-bg pt-20 md:pt-0">
      <div className="container mx-auto px-4 -mt-25">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[14rem] font-bold text-center running-gradient font-['Lufga'] leading-tight"
        >
          Rangmanch
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row items-center gap-8 px-4"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 flex-1 text-center md:text-left mb-6 md:mb-0">
            Welcome to Rangmanch, where creativity meets performance. We are dedicated to bringing your artistic vision to life through innovative solutions and cutting-edge technology.
          </p>
          
          <div className="relative inline-flex items-center justify-center gap-4 group w-full md:w-auto">
            <a 
              role="button" 
              className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-400 px-6 sm:px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-purple-500/30 w-full md:w-auto" 
              title="payment" 
              href="#"
            >
              Get Started For Free
              <svg 
                aria-hidden="true" 
                viewBox="0 0 10 10" 
                height={10} 
                width={10} 
                fill="none" 
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              >
                <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
                <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
