import React from "react";
import { motion } from "framer-motion";
import styled from 'styled-components';

const HeroWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'dark' 
      ? `radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.15) 0%, rgba(0, 0, 0, 0) 70%),
         radial-gradient(circle at 0% 0%, rgba(199, 125, 255, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
         radial-gradient(circle at 100% 100%, rgba(255, 158, 0, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`
      : `radial-gradient(circle at 50% 50%, rgba(157, 78, 221, 0.15) 0%, rgba(255, 255, 255, 0) 70%),
         radial-gradient(circle at 0% 0%, rgba(199, 125, 255, 0.15) 0%, rgba(255, 255, 255, 0) 50%),
         radial-gradient(circle at 100% 100%, rgba(255, 158, 0, 0.15) 0%, rgba(255, 255, 255, 0) 50%)`
    };
  }

  .pattern-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => props.theme === 'dark'
      ? `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
         linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
         linear-gradient(45deg, rgba(157, 78, 221, 0.07) 1px, transparent 1px),
         linear-gradient(-45deg, rgba(199, 125, 255, 0.07) 1px, transparent 1px)`
      : `linear-gradient(rgba(157, 78, 221, 0.07) 1px, transparent 1px),
         linear-gradient(90deg, rgba(157, 78, 221, 0.07) 1px, transparent 1px),
         linear-gradient(45deg, rgba(157, 78, 221, 0.05) 1px, transparent 1px),
         linear-gradient(-45deg, rgba(199, 125, 255, 0.05) 1px, transparent 1px)`
    };
    background-size: 50px 50px, 50px 50px, 100px 100px, 100px 100px;
    mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 80%);
  }

  .floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    background: ${props => props.theme === 'dark'
      ? 'rgba(157, 78, 221, 0.15)'
      : 'rgba(157, 78, 221, 0.15)'
    };
    filter: blur(50px);
  }

  .dots-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => props.theme === 'dark'
      ? `radial-gradient(rgba(255, 255, 255, 0.17) 1px, transparent 1px)`
      : `radial-gradient(rgba(157, 78, 221, 0.15) 1px, transparent 1px)`
    };
    background-size: 20px 20px;
    mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 70%);
  }
`;

const Hero = () => {
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <HeroWrapper theme={isDark ? 'dark' : 'light'} className="min-h-screen flex items-center justify-center w-full dark:bg-dark-bg pt-20 md:pt-0">
      <div className="pattern-grid" />
      <div className="dots-pattern" />
      <div className="floating-shapes">
        <motion.div
          className="shape"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '300px',
            height: '300px',
            left: '10%',
            top: '20%',
          }}
        />
        <motion.div
          className="shape"
          animate={{
            x: [0, -70, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '400px',
            height: '400px',
            right: '15%',
            bottom: '10%',
          }}
        />
      </div>
      <div className="container mx-auto px-4 -mt-25 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[15rem] font-bold text-center running-gradient font-['Lufga'] leading-tight"
        >
          Rangmanch
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row items-center gap-8 px-4"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 flex-1 text-center md:text-left mb-6 md:mb-0 relative z-10">
            Welcome to Rangmanch, where creativity meets performance. We are dedicated to bringing your artistic vision to life through innovative solutions and cutting-edge technology.
          </p>
          
          <div className="relative inline-flex items-center justify-center gap-4 group w-full md:w-auto">
            <a 
              role="button" 
              className="group relative inline-flex items-center justify-center text-base rounded-xl bg-slate-800 px-6 sm:px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-purple-500/30 w-full md:w-auto" 
              title="payment" 
              href="#services"
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
    </HeroWrapper>
  );
};

export default Hero;
