import React from 'react';

const LeafIcon = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M75 35C75 35 65 25 50 25C35 25 25 35 25 50C25 65 35 75 50 75C65 75 75 65 75 50V35Z" fill="currentColor" />
        <circle cx="50" cy="50" r="10" fill="white" className="opacity-40" />
      </svg>
    </div>
  );
};

export default LeafIcon;
