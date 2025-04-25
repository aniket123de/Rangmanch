import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AnimatedButton = ({ to, children, variant = "outline" }) => {
  const color = variant === "outline" ? "#9d4edd" : "#ffffff";
  const bgColor = variant === "outline" ? "#9d4edd" : "linear-gradient(45deg, #9d4edd, #c77dff)";

  return (
    <StyledWrapper $color={color} $bgColor={bgColor}>
      <Link to={to} className="animated-button">
        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">{children}</span>
        <span className="circle" />
        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 32px;
    border: 4px solid;
    border-color: transparent;
    font-size: 14px;
    background-color: inherit;
    border-radius: 100px;
    font-weight: 600;
    color: ${props => props.$color};
    box-shadow: 0 0 0 2px ${props => props.$color};
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;
  }

  .animated-button svg {
    position: absolute;
    width: 20px;
    fill: ${props => props.$color};
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .arr-1 {
    right: 16px;
  }

  .animated-button .arr-2 {
    left: -25%;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: ${props => props.$bgColor};
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    box-shadow: 0 0 0 12px transparent;
    color: ${props => props.$color === "#ffffff" ? "#ffffff" : "#212121"};
    border-radius: 12px;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }

  .animated-button:hover svg {
    fill: ${props => props.$color === "#ffffff" ? "#ffffff" : "#212121"};
  }

  .animated-button:active {
    scale: 0.95;
    box-shadow: 0 0 0 4px ${props => props.$color};
  }

  .animated-button:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }
`;

export default AnimatedButton; 