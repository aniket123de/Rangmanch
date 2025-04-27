import React, { useContext } from "react";
import { FaVectorSquare } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import styled from 'styled-components';
import BackgroundPattern from "../common/BackgroundPattern";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const Services = () => {
  const { isDark } = useContext(ThemeContext);
  const { currentUser } = useAuth(); // Access current user from AuthContext
  const navigate = useNavigate();

  console.log('Current User:', currentUser);

  const ServiceCard = [
    {
      id: 1,
      title: "Smart Content Creation",
      description:
        "Unlock high-quality blogs, emails, and scripts with custom tone and length. Let AI do the heavy lifting so you can focus on creativity.",
      icon: <FaVectorSquare />,
      link: () => navigate('/content-suggestion'), // Updated to use navigate
      delay: 0.2,
      gradient: {
        start: "#00ff75",
        end: "#3700ff"
      }
    },
    {
      id: 2,
      title: "Audience-Driven Insights",
      description:
        "Our ML-powered analyzer understands your target audience and recommends tone, style, and structure that truly resonates.",
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
      title: "Creator-Brand Marketplace",
      description:
        "Our platform acts as a smart mediator—connecting brands with the perfect creators for their campaigns. Brands can browse, filter, and directly collaborate with content creators for tailored promotions.",
      icon: <BiSolidDollarCircle />,
      link: () => {
        if (!currentUser) {
          navigate('/for-business');
        }
      },
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
      justify-content: space-between;
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
  `;

  const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: auto;

    .button {
      line-height: 1;
      text-decoration: none;
      display: inline-flex;
      border: none;
      cursor: pointer;
      align-items: center;
      gap: 0.75rem;
      background-color: ${props => props.gradientStart};
      color: #fff;
      border-radius: 10rem;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      padding-left: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background-color 0.3s;
    }

    .button__icon-wrapper {
      flex-shrink: 0;
      width: 25px;
      height: 25px;
      position: relative;
      color: ${props => props.gradientStart};
      background-color: #fff;
      border-radius: 50%;
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    .button:hover {
      background-color: #000;
    }

    .button:hover .button__icon-wrapper {
      color: #000;
    }

    .button__icon-svg--copy {
      position: absolute;
      transform: translate(-150%, 150%);
    }

    .button:hover .button__icon-svg:first-child {
      transition: transform 0.3s ease-in-out;
      transform: translate(150%, -150%);
    }

    .button:hover .button__icon-svg--copy {
      transition: transform 0.3s ease-in-out 0.1s;
      transform: translate(0);
    }
  `;

  return (
    <section id="services">
      <BackgroundPattern>
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
                Bring your content dreams to life with personalized AI tools, insightful analytics, and creative flexibility—all in one place.
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
                        <StyledButton gradientStart={card.gradient.start}>
                          <button className="button" onClick={card.link}>
                            <span className="button__icon-wrapper">
                              <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
                                <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                              </svg>
                              <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
                                <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                              </svg>
                            </span>
                            Explore All
                          </button>
                        </StyledButton>
                      </div>
                    </div>
                  </CardWrapper>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundPattern>
    </section>
  );
};

export default Services;
