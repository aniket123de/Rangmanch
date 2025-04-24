import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer, textVariant, zoomIn } from '../animation/motion';
import { FiUsers, FiGlobe, FiTool, FiStar, FiBriefcase, FiAward } from 'react-icons/fi';
import Anik from '../assets/anik.jpg';
import Adrish from '../assets/adrish.jpg';
import Aniket from '../assets/aniket..jpg';

const About = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 pt-20 md:pt-32">
      {/* Animated Hero Section */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white py-24"
      >
        {/* Animated background elements */}
        <motion.div
          variants={zoomIn(0.5, 1)}
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={textVariant(0.2)}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={textVariant(0.3)}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Empowering <span className="text-yellow-400">Creators</span>,<br />
              Elevating <span className="text-pink-400">Brands</span>
            </motion.h1>
            <motion.p
              variants={textVariant(0.4)}
              className="text-xl md:text-2xl mb-8 opacity-90 font-light"
            >
              Where creativity meets opportunity in the digital age
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn('up', 'spring', 0.2, 1)}
            className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-opacity-10 border-white"
          >
            <div className="flex items-center mb-8">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mr-4">
                <FiGlobe className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Our Vision</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              To create a global ecosystem where creators and brands collaborate seamlessly,
              powered by AI-driven insights and human creativity. We're building the future
              of digital collaboration - one connection at a time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '50K+', label: 'Creators', icon: <FiUsers /> },
              { number: '10K+', label: 'Brands', icon: <FiBriefcase /> },
              { number: '1M+', label: 'Collabs', icon: <FiTool /> },
              { number: '98%', label: 'Success Rate', icon: <FiStar /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeIn('up', 'spring', index * 0.1, 1)}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn('up', 'spring', 0.2, 1)}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-1 rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    alt="Team"
                    className="w-full h-64 md:h-96 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">Our Journey</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed">
                    Born from a garage in 2020, we've grown into a global platform serving
                    creators and brands across 50+ countries. Our secret? Relentless focus
                    on user experience and cutting-edge technology.
                  </p>
                  <div className="flex items-center gap-4">
                    <FiAward className="text-2xl text-purple-600 dark:text-purple-400" />
                    <span className="font-medium">Winner of TechCrunch Disrupt 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn('up', 'spring', 0.2, 1)}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-16 text-center dark:text-white">Meet the Team</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  name: 'Anik',
                  role: 'Founder & CEO',
                  image: Anik
                },
                {
                  name: 'Adrish',
                  role: 'Head of Product',
                  image: Adrish
                },
                {
                  name: 'Aniket',
                  role: 'Tech Lead',
                  image: Aniket
                }
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={fadeIn('up', 'spring', index * 0.1, 1)}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-4 border-purple-100 dark:border-purple-900"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 dark:text-white">{member.name}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn('up', 'spring', 0.2, 1)}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Join the Revolution</h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Whether you're a creator with a vision or a brand looking to innovate,
              we've got the tools to make magic happen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/signup"
                className="flex-1 bg-white text-purple-600 px-8 py-5 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-lg text-lg"
              >
                Start Creating →
              </Link>
              <Link
                to="/for-business"
                className="flex-1 border-2 border-white px-8 py-5 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-[1.02] text-lg"
              >
                Partner With Us →
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;