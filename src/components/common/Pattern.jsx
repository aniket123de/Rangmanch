import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    height: 100%;
    background-color: #0f172a;
    background-image: linear-gradient(
        45deg,
        rgba(59, 130, 246, 0.08) 25%,
        transparent 25%,
        transparent 75%,
        rgba(59, 130, 246, 0.08) 75%
      ),
      linear-gradient(
        -45deg,
        rgba(59, 130, 246, 0.08) 25%,
        transparent 25%,
        transparent 75%,
        rgba(59, 130, 246, 0.08) 75%
      ),
      linear-gradient(
        45deg,
        transparent 40%,
        rgba(99, 102, 241, 0.1) 40%,
        rgba(99, 102, 241, 0.1) 60%,
        transparent 60%
      ),
      linear-gradient(
        -45deg,
        transparent 40%,
        rgba(99, 102, 241, 0.1) 40%,
        rgba(99, 102, 241, 0.1) 60%,
        transparent 60%
      ),
      radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%);
    background-size:
      60px 60px,
      60px 60px,
      120px 120px,
      120px 120px,
      100% 100%;
    background-position:
      0 0,
      30px 30px,
      0 0,
      60px 60px,
      0 0;
    position: relative;
  }

  .container::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 10px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 10px
      );
    background-size: 20px 20px;
    filter: blur(0.5px);
  }`;

export default Pattern;