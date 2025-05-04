import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { FaRocket, FaChartLine, FaHandshake, FaRegGem, FaLightbulb, FaBullhorn, FaRegChartBar, FaUsers, FaRegSmile, FaRegClock } from 'react-icons/fa';
import { fadeIn, staggerContainer, slideIn } from './motion';

const ForBusiness = () => {
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Services data with expanded offerings
  const services = [
    { 
      title: "Branded Showcases",
      text: "Create immersive digital storefronts that highlight your products through creator perspectives",
      icon: <FaRegGem className="w-6 h-6"/>,
      color: "from-indigo-600 to-blue-500"
    },
    { 
      title: "Campaign Management",
      text: "End-to-end campaign orchestration with vetted creators aligned to your brand values",
      icon: <FaBullhorn className="w-6 h-6"/>,
      color: "from-purple-600 to-pink-500"
    },
    { 
      title: "Performance Analytics",
      text: "Real-time metrics and insights to measure engagement, conversions and ROI",
      icon: <FaRegChartBar className="w-6 h-6"/>,
      color: "from-blue-500 to-cyan-400"
    },
    { 
      title: "Creator Discovery",
      text: "AI-powered matching with relevant creators across niches, geographies, and audiences",
      icon: <FaLightbulb className="w-6 h-6"/>,
      color: "from-orange-500 to-amber-400"
    }
  ];

  // Case studies with real data
  const caseStudies = [
    {
      category: "Fashion & Lifestyle",
      title: "How ClothCraft achieved 350% ROI with nano-influencers",
      metrics: ["47% engagement rate", "₹1.8M in attributed sales", "128 authentic content pieces"],
      image: "fashion-case-study.jpg",
      gradient: "from-pink-500 to-orange-400"
    },
    {
      category: "Food & Beverage",
      title: "SpiceBlend's recipe for 4x audience growth with creator partnerships",
      metrics: ["215K new followers", "92% positive sentiment", "32% reduction in acquisition costs"],
      image: "food-case-study.jpg",
      gradient: "from-green-500 to-teal-400"
    },
    {
      category: "Technology",
      title: "TechVision's creator-led product launch generated 3x pre-orders",
      metrics: ["2.8M content views", "76K pre-registrations", "Featured in 15 tech publications"],
      image: "tech-case-study.jpg",
      gradient: "from-blue-600 to-violet-500"
    }
  ];

  // Value propositions expanded
  const valueProps = [
    {
      title: "Strategic Creator Matching",
      content: "Our AI algorithm analyzes 50+ data points to match your brand with the perfect creators who share your values and aesthetics",
      icon: <FaHandshake className="w-6 h-6"/>
    },
    {
      title: "Authentic Storytelling",
      content: "Transform advertising into genuine connections through creator-led narratives that resonate with targeted communities",
      icon: <FaUsers className="w-6 h-6"/>
    },
    {
      title: "Measurable Results",
      content: "Track real-time performance with our proprietary analytics dashboard showing engagement, conversions, and sentiment analysis",
      icon: <FaChartLine className="w-6 h-6"/>
    },
    {
      title: "Rapid Execution",
      content: "Launch campaigns in days, not months, with our streamlined workflow and vast network of pre-vetted creators",
      icon: <FaRegClock className="w-6 h-6"/>
    },
    {
      title: "Creative Diversity",
      content: "Access multiple content formats, styles and perspectives through India's largest creator community spanning 200+ niches",
      icon: <FaRegSmile className="w-6 h-6"/>
    },
    {
      title: "Compliance Assurance",
      content: "Rest easy with our built-in disclosure management and regulatory compliance frameworks for influencer marketing",
      icon: <FaRegGem className="w-6 h-6"/>
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
      {/* Hero Section - Enhanced with stronger visuals */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-10"
          >
            <motion.div 
              variants={fadeIn('right', 'spring', 0.2, 1)}
              className="flex-1 max-w-2xl"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm mb-6">
                RANGMANCH FOR BUSINESS
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Where Brands Meet Creative Brilliance
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Rangmanch bridges the gap between <strong>ambitious brands</strong> and <strong>authentic creators</strong>, facilitating partnerships that drive measurable business results.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  to="/contact"
                  className="relative group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Your Campaign <FaRocket className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"/>
                </Link>
                <Link
                  to="/case-studies"
                  className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white font-medium hover:shadow-lg transition-all"
                >
                  Explore Case Studies
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn('left', 'spring', 0.4, 1)}
              className="flex-1 relative"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-auto max-w-md">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  <span>NEW</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 dark:text-white">Creators ready for your brand</h3>
                <div className="space-y-4">
                  {['Fashion & Beauty', 'Tech & Gaming', 'Food & Lifestyle'].map((category, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {1000 * (i+1)}+
                      </div>
                      <div>
                        <div className="font-medium dark:text-white">{category}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Verified creators</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium">
                  Find Your Perfect Match
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Platform Metrics - Enhanced visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="container mx-auto px-4 mt-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100 dark:border-gray-700">
            {[
              { number: '1M+', label: 'Creator Network', icon: <FaUsers className="w-6 h-6 text-purple-500"/> },
              { number: '94%', label: 'Campaign Success', icon: <FaChartLine className="w-6 h-6 text-blue-500"/> },
              { number: '4.9★', label: 'Brand Satisfaction', icon: <FaRegSmile className="w-6 h-6 text-pink-500"/> },
              { number: '200+', label: 'Industries Served', icon: <FaBullhorn className="w-6 h-6 text-indigo-500"/> }
            ].map((metric, i) => (
              <div key={i} className="text-center flex flex-col items-center justify-center">
                <div className="mb-3">
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1">
                  {metric.number}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm mb-4">
              OUR SERVICES
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Comprehensive Creator Collaboration Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From discovery to results measurement, Rangmanch provides end-to-end services for brands seeking authentic creator partnerships
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{service.text}</p>
                <Link to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="mt-6 inline-flex items-center text-purple-600 dark:text-purple-400 font-medium">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm mb-4">
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              The Rangmanch Advantage
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proprietary platform delivers superior results through our unique approach to creator collaborations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Showcase - Enhanced visuals */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm mb-4">
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Remarkable Brand Transformations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how leading brands achieved standout results with Rangmanch creator collaborations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${study.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="text-sm font-medium px-3 py-1 bg-white/20 rounded-full self-start">
                      {study.category}
                    </div>
                    <h3 className="text-xl font-bold mt-auto">{study.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <div className="mb-4 text-gray-800 dark:text-white font-medium">Key Results:</div>
                  <ul className="space-y-2">
                    {study.metrics.map((metric, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Link 
                    to={`/case-studies/${study.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium"
                  >
                    Read Full Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm mb-4">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear what our partners have to say about their Rangmanch experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Rangmanch completely transformed our influencer marketing strategy. The quality of creators and the authenticity of content exceeded our expectations.",
                name: "Priya Shah",
                title: "Chief Marketing Officer",
                company: "StyleBlend Fashion",
                avatar: "avatar-1.jpg" 
              },
              {
                quote: "The ROI we've seen from Rangmanch campaigns has been consistently impressive. Their data-driven approach to creator selection is unmatched in the industry.",
                name: "Rahul Verma",
                title: "Digital Marketing Director",
                company: "TechVision India",
                avatar: "avatar-2.jpg"
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with stronger call to action */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Brand Outreach?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of forward-thinking brands accelerating their growth through authentic creator partnerships on Rangmanch
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
              >
                Schedule a Demo
                <FaRocket className="w-5 h-5"/>
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                View Pricing Plans
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-8">
              {['netflix.svg', 'airbnb.svg', 'spotify.svg', 'myntra.svg', 'zomato.svg', 'nykaa.svg'].map((logo, i) => (
                <div key={i} className="h-12 flex items-center justify-center">
                  <div className="w-24 h-8 bg-white/20 rounded-md"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ForBusiness;