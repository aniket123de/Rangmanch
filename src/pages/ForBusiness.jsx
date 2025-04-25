import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { fadeIn, staggerContainer, slideIn, planetVariants, textVariant } from './motion';

const ForBusiness = () => {
  const { isDark } = useContext(ThemeContext);
// Add this before your ForBusiness component
const services = [
  {
    title: "Brand Storefronts",
    text: "Personalized brand pages to showcase your products"
  },
  {
    title: "Product Listings",
    text: "Seamless catalog upload and management"
  },
  {
    title: "Marketing Campaigns",
    text: "Email, Social, Influencer collaborations"
  },
  {
    title: "Analytics Dashboard",
    text: "Real-time insights on sales & engagement"
  },
  {
    title: "Bulk Orders & B2B Sales",
    text: "Streamlined process for large orders"
  },
  {
    title: "Event Collaborations",
    text: "Pop-ups, live sessions, contests"
  }
];


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-32 pt-40 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={textVariant(0.2)}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={textVariant(0.2)}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Partner with <span className="text-yellow-400">Rangmanch</span>
            </motion.h1>
            <motion.p
              variants={textVariant(0.4)}
              className="text-xl mb-12 opacity-90"
            >
              Empowering brands through meaningful collaborations, curated visibility, and powerful reach.
            </motion.p>
            <motion.div
              variants={textVariant(0.6)}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                to="/contact" 
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 hover:shadow-xl"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <motion.div
          variants={planetVariants('left')}
          className="absolute top-20 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-xl"
        />
        <motion.div
          variants={planetVariants('right')}
          className="absolute bottom-20 -right-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-xl"
        />
      </motion.section>

      {/* Why Partner With Us */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-24"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariant(0.2)}
            className="text-4xl font-bold text-center mb-16 dark:text-white"
          >
            Why Partner With Us
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Audience Reach', text: 'Access 1M+ Gen Z consumers through our platform' },
              { title: 'Niche Focus', text: 'Hyperlocal and culturally rooted platform' },
              { title: 'Brand Visibility', text: 'Homepage features, newsletters, social mentions' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn('up', 'spring', index * 0.2, 1)}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-12 w-12 mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services for Brands */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 bg-gray-100 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariant(0.2)}
            className="text-4xl font-bold text-center mb-16 dark:text-white"
          >
            Services for Brands
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeIn('up', 'spring', index * 0.1, 1)}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-semibold mb-4 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="show"
        className="py-24"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariant(0.2)}
            className="text-4xl font-bold text-center mb-16 dark:text-white"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={item}
                variants={fadeIn('up', 'spring', index * 0.2, 1)}
                className="bg-gray-200 dark:bg-gray-700 h-32 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <span className="text-3xl font-bold text-gray-400">Logo {item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Rest of sections follow similar motion patterns */}

    </div>
  );
};

export default ForBusiness;