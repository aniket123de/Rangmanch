import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSmile, FaMeh, FaFrown, FaChartPie, FaComments, FaMagic, FaHeart, FaUserFriends } from "react-icons/fa";
import AnimatedButton2 from "../common/AnimatedButton2";
import BackgroundPattern from "../common/BackgroundPattern";

const Banner2 = () => {
  const { isDark } = useContext(ThemeContext);

  const mockComments = [
    { text: "This product changed how I work! Love it!", sentiment: "positive", author: "Sarah M.", time: "2 hours ago" },
    { text: "Decent features but needs improvement", sentiment: "neutral", author: "John D.", time: "1 day ago" },
    { text: "Could be better, not worth the price", sentiment: "negative", author: "Mike R.", time: "3 days ago" },
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <FaSmile className="text-green-500 text-xl" />;
      case "neutral":
        return <FaMeh className="text-yellow-500 text-xl" />;
      case "negative":
        return <FaFrown className="text-red-500 text-xl" />;
      default:
        return null;
    }
  };

  return (
    <BackgroundPattern>
      <div className="w-full dark:bg-dark-bg transition-colors duration-300">
        <div className="container py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Visual Section - Now on Left */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <FaHeart className="text-purple-500 text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold dark:text-white">Sentiment Score</h3>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">78%</span>
                      <span className="text-green-500 text-sm mb-1">↑ 12%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FaUserFriends className="text-blue-500 text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold dark:text-white">Audience</h3>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">1.2K</span>
                      <span className="text-green-500 text-sm mb-1">Active</span>
                    </div>
                  </div>
                </div>

                {/* Comments Section with Enhanced Design */}
                <div className="space-y-4">
                  {mockComments.map((comment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/50 dark:to-transparent rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getSentimentIcon(comment.sentiment)}</div>
                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.text}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{comment.author}</span>
                            <span className="text-gray-400 dark:text-gray-500">{comment.time}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -right-4 -top-4 w-20 h-20 bg-purple-500/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -left-4 -bottom-4 w-24 h-24 bg-pink-500/10 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Text Section - Now on Right */}
            <div className="space-y-6 flex justify-center flex-col xl:max-w-[500px]">
              <motion.div
                variants={SlideUp(0.2)}
                initial="initial"
                whileInView="animate"
                className="space-y-2"
              >
                <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  AI-POWERED SENTIMENT ANALYSIS
                </h2>
                <h1 className="text-4xl font-bold dark:text-white leading-tight">
                  Understand What Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                    Audience Really Feels
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={SlideUp(0.4)}
                initial="initial"
                whileInView="animate"
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
              >
                Transform audience feedback into actionable insights. Analyze comments, reviews, 
                and social media reactions to build stronger connections and create content that resonates.
              </motion.p>

              <motion.div
                variants={SlideUp(0.6)}
                initial="initial"
                whileInView="animate"
                className="flex justify-start"
              >
                <AnimatedButton2 onClick={() => window.location.href = '/sentiment-analysis'}>
                  Analyze Audience Sentiment
                </AnimatedButton2>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default Banner2;
