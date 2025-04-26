import React from 'react';
import styled from 'styled-components';

const AnimatedButton2 = ({ children, onClick, className = "" }) => {
  return (
    <StyledWrapper>
      <button className={`cssbuttons-io-button ${className}`} onClick={onClick}>
        <span className="text">{children}</span>
        <div className="icon">
          <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    background: #9d4edd;
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.8em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
    cursor: pointer;
    width: fit-content;
    transform: none !important;
  }

  .cssbuttons-io-button .text {
    display: inline-block;
    transform: none !important;
    white-space: nowrap;
  }

  .cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
    right: 0.3em;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.3em);
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    .cssbuttons-io-button {
      min-width: auto;
      width: fit-content;
    }
  }
`;

export default AnimatedButton2; 