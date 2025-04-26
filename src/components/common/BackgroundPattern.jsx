import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const BackgroundPattern = ({ children }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, ${
              isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
            } 2px, transparent 0)`,
            backgroundSize: '40px 40px',
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundPattern;
