import React, { useContext } from "react";
import { FaVectorSquare } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import styled from 'styled-components';

const ServiceCard = [
  {
    id: 1,
    title: "Luxury Facilities",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur",
    icon: <FaVectorSquare />,
    link: "#",
    delay: 0.2,
    gradient: {
      start: "#00ff75",
      end: "#3700ff"
    }
  },
  {
    id: 2,
    title: "Quality Products",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur",
    icon: <FaPenToSquare />,
    link: "#",
    delay: 0.4,
    gradient: {
      start: "#ff9e00",
      end: "#ff0080"
    }
  },
  {
    id: 3,
    title: "Affordable Price",
    description:
      "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    icon: <BiSolidDollarCircle />,
    link: "#",
    delay: 0.6,
    gradient: {
      start: "#9d4edd",
      end: "#c77dff"
    }
  },
];

const CardWrapper = styled.div`
  .card {
    width: 100%;
    height: 320px;
    background-image: ${props => `linear-gradient(163deg, ${props.gradientStart} 0%, ${props.gradientEnd} 100%)`};
    border-radius: 20px;
    transition: all 0.3s;
  }

  .card2 {
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
    border-radius: 20px;
    transition: all 0.2s;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 16px;
    border: ${props => props.theme === 'dark' ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'};
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }

  .card:hover {
    box-shadow: ${props => `0px 0px 30px 1px ${props.gradientStart}50`};
  }

  .icon-wrapper {
    font-size: 2.5rem;
    color: ${props => props.gradientStart};
    margin-bottom: auto;
    transition: all 0.3s ease;
  }

  .heading {
    font-size: 24px;
    text-transform: capitalize;
    font-weight: 700;
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
    transition: all 0.3s ease;
  }

  .description {
    font-size: 14px;
    color: ${props => props.theme === 'dark' ? '#cccccc' : '#666666'};
    line-height: 1.5;
    transition: all 0.3s ease;
  }

  .learn-more {
    color: ${props => props.gradientStart};
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .learn-more:hover {
    color: ${props => props.gradientEnd};
  }
`;

const Services = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="w-full dark:bg-dark-bg transition-colors duration-300">
      <div className="container py-20">
        {/* heading title */}
        <div className="space-y-2 text-center max-w-[350px] mx-auto mb-12">
          <motion.h1
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-3xl font-bold font-serif dark:text-white"
          >
            What we provide
          </motion.h1>
          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            Bring your dream home to life with one-on-one design help & hand
            picked products
          </motion.p>
        </div>
        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ServiceCard.map((card) => (
            <motion.div
              variants={SlideUp(card.delay)}
              initial="initial"
              whileInView={"animate"}
              key={card.id}
            >
              <CardWrapper 
                theme={isDark ? 'dark' : 'light'}
                gradientStart={card.gradient.start}
                gradientEnd={card.gradient.end}
              >
                <div className="card">
                  <div className="card2">
                    <div className="icon-wrapper">
                      {card.icon}
                    </div>
                    <h3 className="heading">{card.title}</h3>
                    <p className="description">{card.description}</p>
                    <a href={card.link} className="learn-more">
                      Learn More
                    </a>
                  </div>
                </div>
              </CardWrapper>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
