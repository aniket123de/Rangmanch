import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import { FaBrain, FaLightbulb, FaMagic, FaRocket, FaPlay } from "react-icons/fa";
import AnimatedButton2 from "../common/AnimatedButton2";
import BackgroundPattern from "../common/BackgroundPattern";
import bannerImage from "../../assets/banner.png";

const Banner = () => {
  const { isDark } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    {
      number: "1000+",
      label: "Content Ideas Generated",
      icon: <FaLightbulb className="text-yellow-400" />
    },
    {
      number: "24/7",
      label: "AI Assistance",
      icon: <FaBrain className="text-purple-500" />
    },
    {
      number: "90%",
      label: "Time Saved",
      icon: <FaRocket className="text-blue-500" />
    }
  ];

  return (
    <BackgroundPattern>
      <div className="w-full dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
        <div className="container py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Text Section */}
            <div className="space-y-8 flex justify-center flex-col xl:max-w-[600px]">
              <motion.div
                variants={SlideUp(0.2)}
                initial="initial"
                whileInView="animate"
                className="space-y-2"
              >
                <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  AI-POWERED CONTENT ASSISTANT
                </h2>
                <h1 className="text-4xl md:text-5xl font-bold dark:text-white leading-tight">
                  Struggling for ideas?{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                    Let AI spark your creativity
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={SlideUp(0.4)}
                initial="initial"
                whileInView="animate"
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
              >
                Discover fresh content ideas tailored just for you — instantly. Whether you're a brand or a creator, 
                our AI helps you brainstorm smarter, faster, and better.
              </motion.p>

              <motion.div
                variants={SlideUp(0.6)}
                initial="initial"
                whileInView="animate"
                className="flex flex-wrap gap-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold dark:text-white">{stat.number}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={SlideUp(0.8)}
                initial="initial"
                whileInView="animate"
              >
                <AnimatedButton2 onClick={() => window.location.href = '/content-suggestion'}>
                  Get AI Content Ideas
                </AnimatedButton2>
              </motion.div>
            </div>

            {/* Video Thumbnail Section */}
            <motion.div
              variants={SlideUp}
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={bannerImage}
                  alt="Rangmanch Banner"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <FaPlay className="text-4xl text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default Banner;