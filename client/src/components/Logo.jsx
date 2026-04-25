import React from 'react';
import logoImg from '../assets/logo.png';

const Logo = ({ className = "h-12", inverted = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImg} 
        alt="Pro Green Life Logo" 
        className={`h-full object-contain ${inverted ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
};

export default Logo;
