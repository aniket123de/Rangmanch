import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressBar = ({ color = '#9d4edd', height = 4 }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);
    // Initial call
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: 'transparent',
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          height: '100%',
          backgroundColor: color,
          transformOrigin: 'left',
          scaleX: scrollProgress / 100,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

export default ScrollProgressBar;