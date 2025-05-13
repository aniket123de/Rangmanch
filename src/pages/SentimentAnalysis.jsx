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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold dark:text-white mb-4">
                Instagram Post Sentiment Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Analyze the sentiment of comments on any Instagram post
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4">
                  <FaInstagram className="text-2xl text-pink-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter Instagram post URL"
                    className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent outline-none"
                    required
                  />
                </div>
                <AnimatedButton2 type="submit" disabled={isLoading}>
                  {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
                </AnimatedButton2>
              </form>

              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaChartPie className="text-purple-500 text-2xl" />
                        <h3 className="text-xl font-semibold dark:text-white">Overall Sentiment</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        {getSentimentIcon(results.overallSentiment)}
                        <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                          {results.sentimentScore}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaComments className="text-blue-500 text-2xl" />
                        <h3 className="text-xl font-semibold dark:text-white">Comments Analyzed</h3>
                      </div>
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {results.comments.length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold dark:text-white">Comment Analysis</h3>
                    {results.comments.map((comment, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/50 dark:to-transparent rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getSentimentIcon(comment.sentiment)}</div>
                          <div className="flex-1">
                            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              - {comment.author}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default SentimentAnalysis; 