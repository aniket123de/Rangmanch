import React, { useContext } from "react";
import { delay, motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import BackgroundPattern from "../common/BackgroundPattern";

const TestimonialData = [
  {
    id: 1,
    name: "Priya Sharma",
    designation: "Influencer & Content Creator",
    img: "https://i.pravatar.cc/300?img=32",
    text: "Rangmanch helped me land my first paid brand deal! The dashboard is super easy to use, and I loved the support from the team.",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Ananya Gupta",
    designation: "Startup Founder",
    img: "https://i.pravatar.cc/300?img=44",
    text: "We were able to collaborate with three niche creators within 24 hours. The platform feels tailored for quick, smart campaigns.",
    delay: 0.4,
  },
  {
    id: 3,
    name: "Rahul Patel",
    designation: "Brand Strategist",
    img: "https://i.pravatar.cc/300?img=68",
    text: "This is the bridge the creator economy needed. Easy selection, transparent pricing, and real engagement.",
    delay: 0.6,
  },
];

const Testimonial = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <section id="testimonials">
      <BackgroundPattern>
        <div className="w-full dark:bg-dark-bg transition-colors duration-300">
          <div className="py-14">
            {/* heading title */}
            <div className="space-y-4 text-center max-w-[550px] mx-auto mb-8">
              <motion.h1
                variants={SlideUp(0.2)}
                initial="initial"
                whileInView="animate"
                className="text-4xl font-bold font-serif dark:text-white"
              >
                Words from our customers
              </motion.h1>
              <motion.p
                variants={SlideUp(0.4)}
                initial="initial"
                whileInView="animate"
                className="text-gray-500 dark:text-gray-400 text-sm max-w-[350px] mx-auto"
              >
                Real voices from creators and brands that built something impactful together on Rangmanch.
              </motion.p>
            </div>
            {/* testimonial cards */}
            <div className="bg-black dark:bg-gray-900 p-12">
              <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
                {TestimonialData.map((card) => {
                  return (
                    <motion.div
                      variants={SlideLeft(card.delay)}
                      initial="initial"
                      whileInView="animate"
                      key={card.id}
                      className="border-[1px] border-gray-500 dark:border-gray-700 px-5 py-10 text-white group hover:bg-white dark:hover:bg-gray-800 duration-300"
                    >
                      {/* Upper section */}
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={card.img}
                          alt=""
                          className="w-[60px] rounded-full"
                        />
                        <div>
                          <p className="text-sm font-bold group-hover:text-black dark:group-hover:text-white">
                            {card.name}
                          </p>
                          <p className="text-gray-400 text-xs group-hover:text-black dark:group-hover:text-gray-300">
                            {card.designation}
                          </p>
                          <div className="text-xs mt-2">⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      {/* Bottom section */}
                      <div className="mt-5 border-t-2 border-gray-500/40 dark:border-gray-700/40 pt-5">
                        <p className="text-sm text-gray-300 group-hover:text-black dark:group-hover:text-white duration-300">
                          {card.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </BackgroundPattern>
    </section>
  );
};

export default Testimonial;
