import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaChartPie, FaComments, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import BackgroundPattern from '../components/common/BackgroundPattern';
import AnimatedButton2 from '../components/common/AnimatedButton2';

const SentimentAnalysis = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement backend API call here
    // For now, we'll simulate a response
    setTimeout(() => {
      setResults({
        overallSentiment: 'positive',
        sentimentScore: 78,
        comments: [
          { text: "Love this post! ❤️", sentiment: "positive", author: "user1" },
          { text: "Not bad", sentiment: "neutral", author: "user2" },
          { text: "Could be better", sentiment: "negative", author: "user3" },
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

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
      <div className="min-h-screen w-full dark:bg-dark-bg transition-colors duration-300 pt-32 pb-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header with gradient text */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Instagram Sentiment Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto">
                Discover how people feel about your Instagram posts through comprehensive comment analysis
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-100 dark:border-gray-700">
              {/* URL Input Form with enhanced styling */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500 focus-within:bg-white dark:focus-within:bg-gray-700">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                    <FaInstagram className="text-2xl text-white" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter Instagram post URL"
                    className="flex-1 p-3 bg-transparent border-none outline-none dark:text-white text-lg"
                    required
                  />
                </div>
                <AnimatedButton2 type="submit" disabled={isLoading} className="w-full py-4 text-lg font-medium">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Analyzing comments...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Analyze Sentiment</span>
                    </div>
                  )}
                </AnimatedButton2>
              </form>

              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-6"
                >
                  {/* Stats Cards with enhanced gradients */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30 shadow-lg shadow-purple-500/5"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg">
                          <FaChartPie className="text-white text-xl" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                          Overall Sentiment
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                        {getSentimentIcon(results.overallSentiment)}
                        <div className="flex flex-col">
                          <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            {results.sentimentScore}%
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {results.overallSentiment.charAt(0).toUpperCase() + results.overallSentiment.slice(1)} sentiment
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30 shadow-lg shadow-blue-500/5"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                          <FaComments className="text-white text-xl" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                          Comments Analyzed
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                          {results.comments.length}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Total comments processed
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Comments Analysis */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-6">
                      Comment Analysis
                    </h3>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {results.comments.map((comment, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.01, x: 4 }}
                          transition={{ delay: index * 0.1 }}
                          className={`
                            rounded-xl p-5 shadow-md border
                            ${comment.sentiment === 'positive' 
                              ? 'bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-100 dark:border-green-900/30' 
                              : comment.sentiment === 'neutral'
                                ? 'bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/10 border-yellow-100 dark:border-yellow-900/30'
                                : 'bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border-red-100 dark:border-red-900/30'
                            }
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`
                              p-3 rounded-full
                              ${comment.sentiment === 'positive' 
                                ? 'bg-green-500/10 text-green-500' 
                                : comment.sentiment === 'neutral'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-red-500/10 text-red-500'
                              }
                            `}>
                              {getSentimentIcon(comment.sentiment)}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200 font-medium">
                                {comment.text}
                              </p>
                              <div className="flex items-center mt-2">
                                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold">
                                  {comment.author.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                  {comment.author}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              Get valuable insights into how your audience reacts to your Instagram content
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default SentimentAnalysis;